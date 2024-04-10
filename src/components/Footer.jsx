import React from 'react'

const Footer = () => {
    return (
        <div className='fixed bottom-0 bg-green-950 w-full text-white text-center flex justify-center items-center gap-5 py-1'>
            <div className='logo font-bold max-[768px]:text-xs'>
                <span className='text-green-500'>&lt;</span>
                <span>Pass</span>
                <span className='text-green-500'>Pro/&gt;</span>
            </div>
            <div className='text-xs max-[768px]:text-[8px]'>Copyright &copy; 2024 PassPro</div>
        </div>
    )
}

export default Footer
