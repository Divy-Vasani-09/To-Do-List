import React from 'react'

export default function Navbar() {
  return (
    <nav className='flex justify-between bg-violet-700 text-white py-2'>
      <div className="logo">
        <span className='font-bold text-xl mx-9'>iTask</span>
      </div>
      <ul className="flex gap-8 mx-9">
        <li className='curser-pointer hover:font-bold transition-none duration-100'>Home</li>
        <li className='curser-pointer hover:font-bold transition-none duration-100'>Your Task</li>
      </ul>
      
    </nav>
  )
}
