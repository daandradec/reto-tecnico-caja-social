import React from 'react'
import Link from 'next/link'
import {Button} from "@nextui-org/react";

function NotFound() {
  return (
    <div className='flex flex-col gap-3 items-center justify-center h-full'>
        <p className='text-4xl font-bold'>404</p>

        <p className='text-slate-500'>Lo sentimos, esta pagina no fue encontrada, regresar al Home </p>
        
        <Link href="/">
            <Button>
                Home &#10150;
            </Button>
        </Link>
    </div>
  )
}

export default NotFound