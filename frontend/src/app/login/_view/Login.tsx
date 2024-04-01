import Image from "next/image";
import React from "react";
import NextIcon from "@/assets/brand.svg";
import Form from "../_ui/Form";
import { Link } from "@nextui-org/react";


function Login() {
    
    return (
        <>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Image
                    className="mx-auto h-10 w-auto"
                    src={NextIcon}
                    width={48}
                    height={40}
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Acceder a tu cuenta de ahorros
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Form/>

                <p className="mt-10 text-center text-sm text-gray-500">
                    ¿Quieres abrir una cuenta bancaria? &nbsp;
                    <Link
                        href="/register"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        Registrate
                    </Link>
                </p>
            </div>
        </>
    );
}

export default Login;
