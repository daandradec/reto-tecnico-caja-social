'use client'
import React from 'react'
import Link from 'next/link'
import {Button} from "@nextui-org/react";

function error() {
  return (
    <div className='flex flex-col gap-3 items-center justify-center h-full'>
        <p className='text-4xl font-bold'>ERROR</p>

        <p className='text-slate-500'>Parece que ha ocurrido un error en el servidor, regresa al home o recarga la página </p>
        
        <Link href="/">
            <Button>
                Home &#10150;
            </Button>
        </Link>
    </div>
  )
}

export default error