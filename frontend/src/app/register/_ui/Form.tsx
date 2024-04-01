'use client'
import React, { useState } from "react";
import type { RegisterRecord } from "../_types/register";
import toast from 'react-hot-toast';
import { ENV } from "@/configs/enviroments"
import { headers } from "@/configs/headers";

/* IMPORTACION DE HOOKS */
import { useMemory } from "@/context/MemoryContext";
import { useRouter } from "next/navigation";

function Form() {

    const [loading, setLoading] = useState(false);
    const { setUser, setAccessToken } = useMemory();
    const router = useRouter();

    const register = async (e: React.FormEvent<HTMLFormElement>) => {
        /* PREVENIR EL EVENTO ORIGINAL DE SUBMIT */
        e.preventDefault();
        setLoading(true);

        /* CREAR LOS OBJETOS DE ACCESO A LOS CAMPOS DEL FORMULARIO */
        const form = new FormData(e.target as HTMLFormElement);
        const input = Object.fromEntries(form) as unknown as RegisterRecord;

        /* SI NO TIENEN INFORMACIÓN NO ACEPTE */
        if(!input.name || !input.email || !input.password || !input.cc)
            return;  

        const response = await fetch(`${ENV.api.auth}/register`, { method: 'POST', headers, body: JSON.stringify(input) })

        if(!response.ok){
            const error = await response.json()            
            toast.error('Error: ' + error.message, { duration:2500, icon: "⛔"} );
            setLoading(false);
            return;            
        }

        const { access_token, user} = await response.json();        
        setUser(user)
        setAccessToken(access_token);
        window.localStorage.setItem("token", access_token);
        setLoading(false);
        router.replace("/dashboard");
    }

    return (
        <form className="space-y-6" autoComplete="off" onSubmit={register}>
            <div>
                <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Nombre
                </label>
                <div className="mt-2">
                    <input
                        id="name"
                        name="name"
                        type="text"  
                        placeholder="Nombre"
                        autoComplete="off"                        
                        required
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <label
                    htmlFor="cc"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Documento de identidad
                </label>
                <div className="mt-2">
                    <input
                        id="cc"
                        name="cc"
                        type="text"  
                        autoComplete="off"     
                        placeholder="0123456789..."
                        onInput={(event:React.ChangeEvent<HTMLInputElement>) => {event.target.value = event.target.value.replace(/[^0-9.]/g, "")}}
                        required
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>            

            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Email address
                </label>
                <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email@dominio.com"
                        autoCorrect="off"
                        autoComplete="off"
                        required
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Password
                    </label>
                </div>
                <div className="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="*****"
                        autoComplete="false"
                        required
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:hover:bg-indigo-600 ${loading && 'button-loading'}`}
                    disabled={loading}
                >
                    Sign in
                </button>
            </div>
        </form>
    );
}

export default Form;
