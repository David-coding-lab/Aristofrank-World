"use client"
import Link from 'next/link'

function CTASection() {
  return (
    <div className='bg-accent gap-4 h-[50vh] mt-50 flex flex-col justify-center text-center'>
        <h1 className="font-body text-5xl font-bold text-[#001]" style={{fontFamily: 'var(--font-open-sans)'}}>Ready to Forge Your Brand’s Legacy?</h1>
        <h4 className="text-lg text-[#6B5B0F] font-body">Let’s collaborate to create a visual identity that stands the test of time, Reach out to start the conversation.</h4>

        <Link
          href='/home'
          className='flex justify-center items-center bg-[#393628] self-center rounded-[8px] mt-5 text-secondary w-50 h-12'
        >
          Inquire Now
        </Link>
    </div>
  )
}

export default CTASection