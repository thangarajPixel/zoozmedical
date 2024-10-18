
import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import axios from "axios";


export default function DownloadForm({productname, brochure, showDownload, setShowDownload }) {
  const formRef = useRef(null);
  const nameref = useRef(null);
  const numberref = useRef(null);
  const emailref = useRef(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replysent,setReplysent] = useState(false)

  const ClosePopup = () => {
    document.body.style.overflowY = 'unset';
    setShowDownload(!showDownload);
  };

  const thankyou=()=>{
    setReplysent(false)
    ClosePopup()
  }

  const sendAutoReply = (formData, brochure) => {
    console.log(brochure)
    emailjs.send(
      'service_d7gbuua', 
      'template_5nbccpr', 
      {
        user_name: formData.name,
        user_email: formData.email,
        brochure_link: brochure, 
      },
      '_gPkLNJylqapfnXqg' 
    )
    .then(() => {
      console.log('Auto-response sent to user!');
      setReplysent(true)
    }, (error) => {
      console.error('Failed to send auto-response', error.text);
      setError('Please try again later');

    }).finally(() => {
      setIsSubmitting(false); 
    });;
  };

  const DownloadSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError('');

  


    const name = nameref.current.value.trim();
    const number = numberref.current.value;
    const email = emailref.current.value.trim();

    

    if (!name || !number || !email) {
      setError('Please fill in all fields.');
      return;
    }


    const ProductScriptUrl = 'https://script.google.com/macros/s/AKfycbyV9XzeRsigEsCRqO8aBng-RzXwFVNkHNVmLUjsG9tPVyUUjPUMhi6TFnX7zAajnxH6/exec';
    const form = document.getElementById('product-form');
  
    try {
      const response = await fetch(ProductScriptUrl, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: new FormData(form),
      });
  
    
    } catch (error) {
      console.error('Error!', error.message); 
      setError("Thank You for your enquiry.<br>Your form had been submitted successfully!");
    } 


    const formData = { name, number, email };
    console.log(formData);
    console.log(brochure)

    setIsSubmitting(true);

    emailjs.sendForm(
      'service_d7gbuua', 
      'template_m74esf9', 
      formRef.current, 
      '_gPkLNJylqapfnXqg' 
    )
    .then(() => {
      console.log('Form data sent to your email!');
      sendAutoReply(formData, brochure);
    })
    .catch((error) => {
      console.error('Failed to send email', error.text);
      setError('Failed to send email. Please try again later.');
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };
  

  return (
    <div className='download_brochure'>

{replysent?
<div className='thankyou'>
<h4>Thank you for submitting.</h4>
<h6>The brochure has been sent to your email address.<br/>
Please check your email.</h6>

<button onClick={thankyou}>Ok</button>
</div>
:
      <div className="download_form">
        <button onClick={ClosePopup} className="popup_close_btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h6>Download Brochure for <span>{productname}</span></h6>
        <p>Please fill in the details to download</p>

        <form id="product-form" ref={formRef} onSubmit={DownloadSubmit}> 
          <input type='text' placeholder='Enter Name' name='user_name' ref={nameref} required />
          <input type='tel' placeholder='Enter Mobile Number' name='user_number' ref={numberref} required />
          <input type='email' placeholder='Enter Email Address' name='user_email' ref={emailref} required />
          <input type='hidden' name={productname}/>

          {error && (
  <p className="error" dangerouslySetInnerHTML={{ __html: error }}></p>
)}
          <button 
    type='submit' 
    disabled={isSubmitting} 
    style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
>
    {isSubmitting ? "Submitting..." : "Download Brochure"}
</button>
        </form>
      </div>
}



    </div>
  );
}
