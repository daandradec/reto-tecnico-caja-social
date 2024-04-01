import Navbar from '@/components/shared/Navbar/Navbar';
import React from 'react'

function layout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <>
        <Navbar/>
        <main>
            {children}
        </main>
    </>
  )
}

export default layout