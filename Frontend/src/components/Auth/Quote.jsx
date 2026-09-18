import React from 'react'
import HighlightText from '../Homepage/HighlightText'

const Quote = () => {
  return (
    <div>
we are passionate about revolutionizing the way we learn.Our innovative platform
<HighlightText text={"combine technology"}/>
<span className='text-brown-500'>
{" "}
expertise
</span>
, and community to create an
<span className='text-brown-500'>
    {" "}
    unparalleled educational experience.
</span>
    </div>
  )
}

export default Quote
