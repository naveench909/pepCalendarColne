import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className="error">
      <h1 className="section-heading">oops! it's a dead end</h1>
      <Link to ="/" >back home</Link>
    </div>
  )
}

export default Error