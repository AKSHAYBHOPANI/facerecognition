import React from 'react';
import Tilt from 'react-tilt';
import "./Logo.css";
import logo from './logo.PNG'
const Logo = () => {
    return (
        <div className='ma2 mt0'>
        <Tilt className="Tilt br4 shadow-2" options={{ max : 55 }} style={{ height: 100, width: 100 }} >
        <div className="Tilt-inner"><img alt='logo' src={logo}></img> </div>
        </Tilt>
        </div>
    )
}

export default Logo;
