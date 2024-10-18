import React from 'react'
import { Outlet, Link } from "react-router-dom";


export default function Navigation() {
  return (
    <nav>
    <ul>
      <li>
        {/* <Link to="/">Home</Link> */}
        <a href='#'>Home</a>

      </li>
      <li>
        {/* <Link to="#about">About Us</Link> */}
        <a href='#about'>About Us</a>
      </li>
      <li>
        {/* <Link to="/">Products</Link> */}
        <a href='#products'>Products</a>

      </li>
      <li>
        {/* <Link to="/">Enquire Now</Link> */}
        <a href='#enquire'>Enquire Now</a>

      </li>
    </ul>
  </nav>
  )
}
