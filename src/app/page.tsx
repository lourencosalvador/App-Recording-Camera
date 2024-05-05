"use client"
import CameraRecorder from '@/components/camera'
import Image from 'next/image'


const HomePage = () => {
  

  return (
    <div className='w-screen h-screen bg-zinc-950 text-slate-200 font-xl flex justify-center items-center'>
      <div>
        <CameraRecorder />
        <h1>Lore</h1>
      </div>
    </div>
  )
}

export default HomePage