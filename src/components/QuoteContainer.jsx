import React from 'react'
import "./component.css"

const QuoteContainer = ({quoteText}) => {
  return (
    <div className="container-fluid ">
      <div className="quote">
        <p className="title qt">Quote of the Day</p>
        <p className=''>"{quoteText}"</p>
      </div>
    </div>
  )
}

export default QuoteContainer
