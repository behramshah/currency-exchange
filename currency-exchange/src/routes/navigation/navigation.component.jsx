import React from 'react';
import './navigation.styles.css';
import { Outlet, Link } from 'react-router-dom';


export default function Navigation() {
  return (
    <>
    <div className='navigation'>
    <div className='nav-links-container'>
            <Link className='nav-link' to='/'>Home</Link>      
            <Link className='nav-link' to='/converter'>Converter</Link>      
            <Link className='nav-link' to='/rates'>Rates</Link>      
        </div>
    </div>        
        <Outlet/>
    </>
  );
};
