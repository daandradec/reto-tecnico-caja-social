import Navbar from '@/components/shared/Navbar/NavbarSimple';
import React from 'react'

function layout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <>        
        <Navbar/>
        <main className='flex flex-col size-full justify-center items-center px-6 py-12 lg:px-8'>
            {children}
        </main>
    </>
  )
}

export default layout