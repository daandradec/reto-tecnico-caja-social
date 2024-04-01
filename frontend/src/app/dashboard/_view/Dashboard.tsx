import { useState } from "react";
import NavbarAuthenticated from "@/components/shared/Navbar/NavbarAuthenticated";
import {Card, CardHeader, CardBody, Divider, CardFooter, Button} from "@nextui-org/react";
import { TfiReload } from "react-icons/tfi";
import { RxCheck } from "react-icons/rx";
import { ImCross } from "react-icons/im";
import toast from 'react-hot-toast';
import { ENV } from "@/configs/enviroments"
import { headers } from "@/configs/headers";

import type { User } from "@/types/global";

/* IMPORTACION DE HOOKS */
import { useMemory } from "@/context/MemoryContext";


function Dashboard() {
    const { user, accessToken, setUser, setAccessToken} = useMemory();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(user?.name);
    const [cc, setCC] = useState(user?.cc);    
    const [inVal, setInVal] = useState("0");
    const [outVal, setOutVal] = useState("0");

    const refreshName = () => {        
        setName(user?.name);
    }
    const refreshCC = () => {        
        setCC(user?.cc);
    }
    const detectChanges = () => {        
        if(user)
            return user.name !== name || user.cc !== cc || inVal !== "" &&  inVal !== "0" || outVal !== "" && outVal !== "0";
        return false;
    }

    const updateUser = async () => {
        setLoading(true);        

        if(!name){
            refreshName();
            setLoading(false);
            toast.error('Nombre no puede ser vacio', { duration:2500, icon: "⛔"} );
            return;
        }

        if(!cc){
            refreshCC();
            setLoading(false);
            toast.error('Cedula no puede ser vacio', { duration:2500, icon: "⛔"} );
            return;
        }
        const input = { name, cc }
        const response = await fetch(`${ENV.api.users}/${user?._id}`, { method: 'PUT', headers: {...headers, Authorization: `Bearer ${accessToken}`}, body: JSON.stringify(input) })

        if(!response.ok){
            const error = await response.json()            
            toast.error('Error: ' + error.message, { duration:2500, icon: "⛔"} );
            setLoading(false);
            return;
        }

        const moneyIn = Number(inVal);
        const moneyOut = Number(outVal);
        const balance = Number(user?.savingAccount.money);
        const money = Math.max(balance + moneyIn - moneyOut, 0); 
        
        const inputMoney = { money }
        const responseMoney = await fetch(`${ENV.api.savingaccounts}/${user?.savingAccount._id}`, { method: 'PUT', headers: {...headers, Authorization: `Bearer ${accessToken}`}, body: JSON.stringify(inputMoney) });

        if(!responseMoney.ok){
            const error = await responseMoney.json()            
            toast.error('Error: ' + error.message, { duration:2500, icon: "⛔"} );
        }else{
            setInVal("0");
            setOutVal("0");
            setUser({...user, ...input, savingAccount: {...user?.savingAccount, money}} as User);        
            toast.success("Actualizado correctamente", { duration: 2500, icon: "✅" })
        }

        setLoading(false);
    }

    const deleteUser = async () => {
        if(confirm("¿Desea eliminar su cuenta de ahorros?")){
            const response = await fetch(`${ENV.api.users}/${user?._id}`, { method: 'DELETE', headers: {...headers, Authorization: `Bearer ${accessToken}`} })

            if(!response.ok){
                const error = await response.json()            
                toast.error('Error: ' + error.message, { duration:2500, icon: "⛔"} );
            }else{            
                setAccessToken(null);
                setUser(null);
                window.localStorage.removeItem("token");
            }
        }
    }

    return (
        <>
            <NavbarAuthenticated/>

            <main className="bg-[rgb(243,244,246)] min-h-full pt-16">
                <div className="container px-12">


                    <Card className="w-full">
                        <CardHeader>
                            <div className="flex flex-col gap-3">
                                <p className="font-bold">Información de tu cuenta de ahorros</p>
                                <p className="text-slate-500">Aqui encontraras todos los detalles sobre tu cuenta de ahorros del banco</p>
                            </div>
                        </CardHeader>
                        <Divider/>
                        <CardBody>
                            <div className="flex flex-col gap-0">
                                <div className="flex py-4">
                                    <div className="w-full basis-4/12">
                                        <p className="font-semibold">Nombre completo:</p>
                                    </div>
                                    <div className="flex items-center gap-3 w-full basis-8/12">
                                        <TfiReload onClick={refreshName} className="cursor-pointer"/>
                                        <input type="text" className="w-full md:w-[240px] border px-2" onChange={(e) => setName(e.target.value)} value={name}/>
                                    </div>
                                </div>

                                <Divider/>

                                <div className="flex py-4">
                                    <div className="w-full basis-4/12">
                                        <p className="font-semibold">C.C:</p>
                                    </div>
                                    <div className="flex items-center gap-3 w-full basis-8/12">
                                        <TfiReload onClick={refreshCC} className="cursor-pointer"/>
                                        <input type="text" className="w-full md:w-[240px] border px-2" onChange={(e) => setCC(e.target.value)} value={cc}/>                                        
                                    </div>
                                </div> 

                                <Divider/>

                                <div className="flex py-4">
                                    <div className="w-full basis-4/12">
                                        <p className="font-semibold">Email</p>
                                    </div>
                                    <div className="w-full basis-8/12">
                                        <p className="text-slate-500">{ user?.email }</p>
                                    </div>
                                </div> 

                                <Divider/>

                                <div className="flex py-4">
                                    <div className="w-full basis-4/12">
                                        <p className="font-semibold"># Cuenta</p>
                                    </div>
                                    <div className="w-full basis-8/12">
                                        <p className="text-slate-500">{ user?.savingAccount?.accountNumber }</p>
                                    </div>
                                </div>                                  

                                <Divider/>

                                <div className="flex py-4">
                                    <div className="w-full basis-4/12">
                                        <p className="font-semibold">Fondos</p>
                                    </div>
                                    <div className="w-full basis-8/12">
                                        <p className="text-slate-500">$ { user?.savingAccount?.money } COP</p>
                                    </div>
                                </div>                                                                                                
                            </div>
                            
                        </CardBody>

                        <Divider/>

                        <CardFooter>
                            <Button onClick={updateUser} endContent={<RxCheck  className="size-6 stroke-white text-white"/>} className={`${detectChanges() ? 'border-solid border-4 border-blue-300' : ''} bg-indigo-600 text-white ${loading && 'button-loading'}`} disabled={loading}>
                                Guardar                
                            </Button>  

                            <Button onClick={deleteUser} endContent={<ImCross className="size-2 stroke-white text-white mb-[-3px]"/>} className='bg-red-600 text-white ml-4'>
                                Eliminar Cuenta                
                            </Button>                               
                        </CardFooter>
                    </Card>


                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
                        <Card>
                            <CardHeader className="bg-violet-700 text-white">
                                Consignar ($ COP)
                            </CardHeader>
                            <Divider/>
                            <CardBody className="!p-0">
                                <input type="number" className="w-full h-full px-4 py-3" min="0" onInput={(event:React.ChangeEvent<HTMLInputElement>) => {event.target.value = event.target.value.replace(/[^0-9.]/g, "")}} onChange={(e) => setInVal(e.target.value)} value={inVal}/>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardHeader className="bg-violet-700 text-white">
                                Retirar ($ COP)
                            </CardHeader>
                            <Divider/>
                            <CardBody className="!p-0">
                                <input type="number" className="w-full h-full px-4 py-3" min="0" onInput={(event:React.ChangeEvent<HTMLInputElement>) => {event.target.value = event.target.value.replace(/[^0-9.]/g, "")}} onChange={(e) => setOutVal(e.target.value)} value={outVal}/>
                            </CardBody>
                        </Card>                        
                    </div>
                </div>
            </main>
        </>
    );
    
}

export default Dashboard;
