import React from 'react'
import ContactDetails from '../components/Auth/contactDetails'
import ContactUsForm from '../components/common/ContactUsForm'

const ContactUs = () => {
  return (
    <div className="flex w-full">
      <ContactDetails />

      <div className="flex flex-col w-[70%] m-7 border border-richblack-600 pb-5 pl-4">
        <h2 className="text-white font-bold mt-4">
          Got an Idea? We have got the Skills.
        </h2>

        <h3 className="text-white font-bold">
          Let's team up
        </h3>

        <p className="mt-1.5 text-richblack-500 text-sm">
          Tell us more about yourself and what you have got in mind.
        </p>

        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactUs