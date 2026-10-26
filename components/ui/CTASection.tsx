"use client"
import Link from 'next/link'

function CTASection() {
  return (
    <div className='mt-16 flex min-h-[50vh] flex-col justify-center gap-4 bg-accent px-4 py-12 text-center sm:mt-24 sm:px-6 sm:py-16 lg:mt-32 lg:px-8 lg:py-20'>
        <h2 className="mx-auto max-w-4xl text-3xl font-bold leading-tight text-[#001] sm:text-4xl lg:text-5xl" style={{fontFamily: 'var(--font-open-sans)'}}>Ready to Forge Your Brand’s Legacy?</h2>
        <p className="mx-auto max-w-2xl text-base text-[#6B5B0F] sm:text-lg lg:text-xl">Let’s collaborate to create a visual identity that stands the test of time, Reach out to start the conversation.</p>

        <Link
          href='/home'
          className='mt-5 flex min-h-[44px] w-full max-w-xs items-center justify-center self-center rounded-[8px] bg-[#393628] px-8 text-secondary sm:w-auto'
        >
          Inquire Now
        </Link>
    </div>
  )
}

export default CTASection