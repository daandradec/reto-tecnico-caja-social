// app/providers.tsx
'use client'

import MemoryProvider from '@/context/MemoryContext';
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'react-hot-toast';

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider className='h-full'>
        <MemoryProvider>
            <Toaster/>
            {children}
        </MemoryProvider>
    </NextUIProvider>
  )
}