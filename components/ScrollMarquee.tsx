import Image from 'next/image'
import React from 'react'

const ScrollMarquee = () => {
    return (
        <div className='w-full h-[7vh] bg-primary flex items-center gap-4 py-2 md:py-4 lg:py-6 md:gap-[2vw] lg:gap-[3vw] text-black font-medium '>
            <div className="flex items-center gap-4 md:gap-6">
                <p className='text-xl md:text-4xl lg:text-6xl '>
                    Think Big
                </p>
                <div className="w-10 h-10 md:w-20 md:h-20 flex items-center justify-center ">
                    <Image src="/arrow-br.svg" alt="arrow-br" width={100} height={100} />
                </div>
            </div>
            <div className="flex items-center gap-4 md:gap-6">
                <p className='text-xl md:text-4xl lg:text-6xl '>
                    Start Small
                </p>
                <div className="w-10 h-10 md:w-20 md:h-20 flex items-center justify-center ">
                    <Image src="/arrow-br.svg" alt="arrow-br" width={100} height={100} />
                </div>
            </div>
            <div className="flex items-center gap-4 md:gap-6">
                <p className='text-xl md:text-4xl lg:text-6xl '>
                    Scale Fast
                </p>
                <div className="w-10 h-10 md:w-20 md:h-20 flex items-center justify-center ">
                    <Image src="/arrow-br.svg" alt="arrow-br" width={100} height={100} />
                </div>
            </div>
        </div>
    )
}

export default ScrollMarquee