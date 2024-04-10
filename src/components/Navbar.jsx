import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-green-950 text-white'>
            <div className='flex justify-between px-10 h-[50px] items-center'>
                <div className='logo text-2xl font-bold'>
                    <span className='text-green-500'>&lt;</span>
                    <span>Pass</span>
                    <span className='text-green-500'>Pro/&gt;</span>
                </div>
                {/* <ul className='flex gap-6'>
                    <a href="#" className='hover:font-bold'>
                        <li>Home</li>
                    </a><a href="#" className='hover:font-bold'>
                        <li>About</li>
                    </a><a href="#" className='hover:font-bold'>
                        <li>Contact</li>
                    </a>
                </ul> */}
                <div>
                    <a href="https://github.com/shrey4369" target='_blank'>
                        <button className='flex justify-between items-center'>
                            <img className='invert w-10 p-1' src="/icons/github-mark.svg" alt="" />
                            <img className='w-20 invert' src="/icons/GitHub_Logo.png" alt="" />
                        </button>
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
