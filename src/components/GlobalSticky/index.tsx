"use client"

import { Services } from '@/src/lib/icons'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const handleExitClick = () => {
  window.location.href = 'https://www.google.com';
}

const GlobalSticky = () => {
  return (
    <>
      <div className="global_sticky flex lg:block gap-3 fixed lg:top-1/2 lg:-translate-y-1/2 bottom-0 lg:bottom-auto w-full lg:w-auto lg:right-10 bg-color-tertiary px-3 py-6 lg:max-w-20 rounded-t-lg rounded-tr-lg lg:rounded-lg">
        <div className="gethelp lg:mb-4 flex-1 hover:opacity-80">
          <Link href="/access-services" className='text-sm block text-center'>
            <Services />
            <span>Find Services</span>
          </Link>
        </div>
        <div className="exit flex-1 hover:opacity-80">
          <div className="exit-website-btn text-sm block text-center cursor-pointer" onClick={() => handleExitClick()}>
            <Image width={24} height={24} className='m-auto' src="/assets/images/exit-icon.png" alt='Exit icon'></Image>
            <span>Exit</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default GlobalSticky