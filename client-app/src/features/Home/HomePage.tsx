import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <div>
          <h1>This is my homepage</h1> 
          <h3><Link to='/activities'>Activities</Link></h3>  
        </div>
   )
}
export default HomePage
