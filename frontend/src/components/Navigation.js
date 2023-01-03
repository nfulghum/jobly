import React from 'react';
import { Link } from 'react-router-dom';


const Navigation = () => {
    return (
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/companies'>Companies</Link></li>
            <li><Link to='/jobs'>Jobs</Link></li>
            <li><Link to='/profile'>Profile</Link></li>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>Signup</Link></li>
        </ul>



    )
}

export default Navigation