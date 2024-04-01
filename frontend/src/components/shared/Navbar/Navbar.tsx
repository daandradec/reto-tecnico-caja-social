import React from "react";
import Brand from "../Brand/Brand";
import { Button } from "@nextui-org/react";
import { BiKey } from "react-icons/bi";
import { BiIdCard } from "react-icons/bi";
import Link from "next/link";

function Navbar() {
    return (
        <div className="flex items-center justify-between px-3 py-4 2xl:px-20 border border-gray-200">
            <Brand />

            <div className="flex justify-end gap-4 2xl:flex-1">
                <Link href="/login">
                    <Button
                        endContent={
                            <BiKey className="size-6 stroke-white text-white" />
                        }
                        className="bg-indigo-600 text-white"
                    >
                        Ingreso
                    </Button>
                </Link>

                <Link href="/register">
                    <Button
                        endContent={
                            <BiIdCard className="size-6 stroke-white text-white" />
                        }
                        className="bg-indigo-600 text-white"
                    >
                        Registro
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
