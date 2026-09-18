import React from 'react'

const Stat= [
    {count:"5k",label:"Active Students"},
    {count:"10+", label:"Mentors"},
    {count:"200+", label:"Course"},
    {count:"50+", label:"Awards"},
]



const Stats = () => {
  return (
    <section className='py-12 md:py-20 border-t border-gray-700'>
<div className='w-full'>
<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8'>

{
    Stat.map((data, index)=>{
        return (
            <div 
              key={index} 
              className='bg-gradient-to-br from-gray-800 to-gray-900 p-6 md:p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 flex flex-col items-center justify-center text-center space-y-3'
            > 
                <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
                  {data.count}
                </h1>
                <h2 className='text-base md:text-lg text-gray-300 font-semibold tracking-wide'>
                    {data.label}
                </h2>
            </div>
        )
    })
}

</div>

</div>

    </section>
  )
}

export default Stats