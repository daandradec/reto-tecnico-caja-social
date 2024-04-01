import Link from 'next/link'
import React from 'react'
import Home from './_view/Home'

function page() {
  return (
    <div className='flex flex-col gap-3'>
        <div>
            <Home/>
        </div>
    </div>
  )
}

export default page