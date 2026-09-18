import React from 'react'
import logo1 from "../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../assets/Images/TimeLineImage.png"


const timeline=[
    {
        Logo: logo1,
        heading:"Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: logo2,
        heading:"Responsibility",
        Description:"Fully committed to the success company",
    },
    {
        Logo: logo3,
        heading:"Flexibility",
        Description:"Fully committed to the success company",
    },
    {
        Logo: logo4,
        heading:"Solve the Problem",
        Description:"Fully committed to the success company",
    },


]


const TimelineSection = () => {
  return (
    <div>
      <div className='flex flex-row gap-14 items-center'>
<div className='flex flex-col w-[45%] gap-5'>
{
    timeline.map((element, index)=>{
        return (
            <div className='flex flex-row gap-5 key={index}'>
<div className='w-[50px] h-[50px] bg-white flex items-center'>
    <img src={element.Logo}/>
    </div>                
<div>
<h2 className='font-semibold text-[18px]'>{element.heading}</h2>
<p className='text-base '>{element.Description}</p>


</div>
{/* HW DOT LINE */}

                 </div>
        )
    })
}

</div>

<div className="relative">
  <img
    src={timelineImage}
    alt="timelineimage"
    className="object-cover h-fit"
  />

  <div className="absolute bottom-0 left-0 bg-caribbeangreen-700 py-6 flex flex-row text-white uppercase left-[50%] translate-x-[-50%] translate-y-[40%]">
    
    <div className="px-7 flex flex-row gap-5 items-center border-r border-caribbeangreen-300">
      <p className="text-3xl font-bold">10</p>
      <p className="text-caribbeangreen-400 text-sm">
        Years of Experience
      </p>
    </div>

    <div className="flex gap-5 items-center px-7">
      <p className="text-3xl font-bold">250</p>
      <p className="text-caribbeangreen-400 text-sm">
        Type of courses
      </p>
    </div>

  </div>
</div>


      </div>
    </div>
  )
}

export default TimelineSection
