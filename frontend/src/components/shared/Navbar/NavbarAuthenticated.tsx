import React from "react";
import { BiCaretDown } from "react-icons/bi";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import Brand from "../Brand/Brand";

/* IMPORTACION DE HOOKS */
import { useMemory } from "@/context/MemoryContext";
import { useRouter } from "next/navigation";

function NavbarAuthenticated() {
    const { user, setAccessToken, setUser } = useMemory();
    const router = useRouter();

    const logout = () => {
        setUser(null);
        setAccessToken(null);
        window.localStorage.removeItem("token");
        router.replace("/login");
    }

    return (
        <nav className="w-full border border-gray-200">
            <div className="flex items-center px-3 py-4 2xl:px-20">
                <Brand/>

                <Dropdown>
                    <DropdownTrigger>
                        <div className="flex items-center gap-2 border boder-[#CDD7E1] rounded-xl py-2 px-4 hover:bg-[#F0F4F8] hover:cursor-pointer">
                            Bienvenido {user?.name} <BiCaretDown/>
                        </div>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="action" onAction={() => {logout()}}>
                        <DropdownItem key="logout">Cerrar sesion</DropdownItem>
                    </DropdownMenu>
                </Dropdown>

            </div>
        </nav>
    );
}

export default NavbarAuthenticated;
