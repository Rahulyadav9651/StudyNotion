import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import knowYour from  "../../assets/Images/Know_your_progress.png"
import compare_with from "../../assets/Images/Compare_with_others.png"
import plan_Your from "../../assets/Images/Plan_your_lessons.png"


const LearningLanguageSection = () => {
  return (
    <div className='mt-[100px]'>
      
<div className='flex flex-col gap-5  justify-center items-center '>
<div className='text-4xl font-semibold'>Your Swiss Knife for <HighlightText text={"learning any language"}/> </div>

<div className='text-center text-richblack-500 mx-auto text-base font-medium w-[70%] '>Using spin making learning multiple language easy.with 20+ language realistics voice-over progeress tracking, custom schedule and more.</div>

</div>

<div className='flex flex-row items-center justify-center mt-5'>
<img src={knowYour} alt='kno_your' className='object-contain -mr-42'/>
<img src={compare_with} alt='kno_your' className='object-contain'/>
<img src={plan_Your} alt='kno_your' className='object-contain -ml-32'/>


</div>
<div className='w-fit ml-[45%]'>
<CTAButton active={true} linkto={"/signup"}><p>Learn more</p></CTAButton>

</div>

    </div>
  )
}

export default LearningLanguageSection
