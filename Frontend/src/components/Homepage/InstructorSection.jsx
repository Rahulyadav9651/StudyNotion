import React from 'react'
import inst from "../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import { FaArrowAltCircleRight } from "react-icons/fa";


const InstructorSection = () => {
  return (
    <div className='mt-5 mb-32'>
      <div className='flex flex-row gap-20 items-center'>
<div className='w-[50%]'>
<img src={inst} alt='inst' className='shadow-white'/>
</div>
<div className='w-[50%] flex flex-col'>
    <p  className='text-4xl font-semibold w-[50%]'>Become an <HighlightText text={"Instructor"}/></p>
<p className='font-medium text-[16px] w-[80%] text-richblack-300'>Instructor from around the world tech millions of students on studyNotion.We provide the tools and skills to teach what you love.</p>
<div className='w-fit mt-6'>
<CTAButton active={true} linkto={"/signup"}>

<div className='flex flex-row gap-2 items-center'>Start learning Today <FaArrowAltCircleRight/> </div>

</CTAButton>
</div>
</div>



      </div>


    </div>
  )
}

export default InstructorSection
