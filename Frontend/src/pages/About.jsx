import React from 'react'
import HighlightText from '../components/Homepage/HighlightText'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/Auth/Quote'
import FoundingStory from "../assets/Images/FoundingStory.png"
import Stats from './Stats'
import LearningGrid from './LearningGrid'
import ContactFoamSection from '../components/Auth/ContactFoamSection'
import Footer from "../components/common/Footer"



const About = () => {
  return (
    <div className='mx-auto mt-[100px] text-white w-11/12 max-w-maxContent'>
      {/* <section1/> */}

<section className='py-12 md:py-20'>
<div className='space-y-8 md:space-y-12'>
<header className='space-y-4 md:space-y-6'>
  <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold leading-tight'>
    Driving Innovation in Online Education for a <HighlightText text={"Brighter Future"}/>
  </h1>
  <p className='text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl'>
    Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
  </p>
</header>

<div className='flex gap-3 md:gap-6 flex-col sm:flex-row items-center justify-center'>
  <img src={BannerImage1} alt="About Us 1" className='w-full sm:w-1/3 h-auto rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 object-cover'/>
  <img src={BannerImage2} alt="About Us 2" className='w-full sm:w-1/3 h-auto rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 object-cover'/>
  <img src={BannerImage3} alt="About Us 3" className='w-full sm:w-1/3 h-auto rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 object-cover'/>
</div>

</div>

</section>

 {/* <section2/> */}

<section className='py-12 md:py-20 border-t border-gray-700'>
<div className='flex justify-center'>
<Quote/>
</div>
</section>

 {/* <section3/> */}

<section className='py-12 md:py-20 border-t border-gray-700'>
<div className='flex flex-col gap-12 md:gap-16'>

<div className='flex flex-col lg:flex-row gap-8 md:gap-12 items-center'>
<div className='flex-1 space-y-4 md:space-y-6'>
    <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold'>Our Founding Story</h1>
    <p className='text-sm md:text-base text-gray-300 leading-relaxed'>
      Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
    </p>
    
    <p className='text-sm md:text-base text-gray-300 leading-relaxed'>
      As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed the education should not be confined to the walls of a classroom or restricted by geographical boundaries.
    </p>
</div>

<div className='flex-1 w-full'>
    <img src={FoundingStory} alt="Founding Story" className='w-full h-auto rounded-lg shadow-lg object-cover'/>
</div>

</div>

{/* bottom section */}
<div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'>

{/* Vision box */}
<div className='bg-gradient-to-br from-gray-800 to-gray-900 p-6 md:p-8 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 shadow-lg hover:shadow-2xl'>
  <h2 className='text-xl md:text-2xl font-bold mb-4 md:mb-6'>Our Vision</h2>
  <p className='text-sm md:text-base text-gray-300 leading-relaxed'>
    With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
  </p>
</div>

{/* Mission box */}
<div className='bg-gradient-to-br from-gray-800 to-gray-900 p-6 md:p-8 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 shadow-lg hover:shadow-2xl'>
  <h2 className='text-xl md:text-2xl font-bold mb-4 md:mb-6'>Our Mission</h2>
  <p className='text-sm md:text-base text-gray-300 leading-relaxed'>
    Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
  </p>
</div>

</div>

</div>

</section>

 {/* <section4/> */}

<Stats/>

{/* {section 5} */}
<section className='mx-auto flex flex-col items-center justify-center gap-8 md:gap-12 mb-[100px] md:mb-[150px] py-12 md:py-20'>

    <LearningGrid/>
    <ContactFoamSection/>
</section>

<section>
<div className='text-center text-2xl font-bold mb-5'>Reviews from learners</div>

</section>

<Footer/>
    </div>
  )
}

export default About