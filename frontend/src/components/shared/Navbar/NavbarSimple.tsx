import React from 'react'
import {Button} from "@nextui-org/react";
import { BiHomeAlt2 } from "react-icons/bi";
import Link from 'next/link';
import Brand from "../Brand/Brand";

function NavbarSimple() {
  return (
    <nav className='fixed top-0 w-full'>
        <div className='flex items-center px-3 py-4 2xl:px-20'>
        <Brand/>

            <Link href="/">
                <Button endContent={<BiHomeAlt2  className="size-6 stroke-white text-white"/>} className='bg-indigo-600 text-white'>
                    Home                
                </Button>   
            </Link>         
        </div>
    </nav>
  )
}

export default NavbarSimple