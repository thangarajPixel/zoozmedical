import React from 'react'

export default function Footer() {
  return (
   <footer>
   
<div className="container">
<a href='#' className="logo">
<img src={require('./Assets/logo.png')}/>
</a>

<ul className='social_links'>
    <li>
        <a aria-label=""  href='#'><img src={require('./Assets/facebook.webp')}/></a>
    </li>
    <li>
        <a aria-label=""  href='#'><img src={require('./Assets/twitter.webp')}/></a>
    </li>
    <li>
        <a aria-label=""  href='#'><img src={require('./Assets/instagram-icon.webp')}/></a>
    </li>
    <li>
        <a aria-label=""  href='#'><img src={require('./Assets/Linked-in.webp')}/></a>
    </li>
</ul>

<p>© 2024 ZOOZ MEDICAL.</p>

</div>

   </footer>
  )
}
