import Image from "next/image";
import React from "react";
import NextIcon from "@/assets/brand.svg";
import Form from "../_ui/Form";
import { Link } from "@nextui-org/react";


function Register() {
    
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
                    Crea tu cuenta de ahorros con el Banco Challenge
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Form/>

                <p className="mt-10 text-center text-sm text-gray-500">
                    ¿Ya tienes una cuenta? &nbsp;
                    <Link
                        href="/login"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        Ingresa
                    </Link>
                </p>
            </div>
        </>
    );
}

export default Register;
