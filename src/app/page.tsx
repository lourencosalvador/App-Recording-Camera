"use client"
import CameraRecorder from '@/components/camera'
import Image from 'next/image'
import { useEffect } from 'react'

const HomePage = () => {
  

  return (
    <div className='w-screen h-screen bg-zinc-950 text-slate-200 font-xl flex justify-center items-center'>
      <div>
        <CameraRecorder />
        <button >Ver location</button>
      </div>
    </div>
  )
}

export default HomePage