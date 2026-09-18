import React from 'react'
import ContactUsForm from '../common/ContactUsForm'
const ContactFoamSection = () => {
  return (
    
<div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-8 text-center sm:px-6 lg:py-12">

  <h1 className="text-3xl font-bold text-richblack-5 sm:text-4xl lg:text-5xl">
    Get in Touch
  </h1>

  <p className="mt-3 max-w-xl text-sm leading-6 text-richblack-300 sm:text-base">
    We'd love to hear from you. Please fill out this form and we'll get back
    to you as soon as possible.
  </p>

  <div className="mt-8 w-full">
    <ContactUsForm />
  </div>

</div>


  )
}

export default ContactFoamSection
