import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "./Header";
import Slider from "react-slick";
import Footer from "./Footer";
import Mobilemenu from "./Mobilemenu";
import DownloadForm from "./DownloadForm";
import axios from "axios";

export default function Home() {
  const [showMenu, setShowMenu] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [productname, setProductname] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [brochure, setBrochure] = useState("");

  const [layer, setLayer] = useState(false);

  const nameRef = useRef(null);
  const productRef = useRef(null);
  const mobileNumberRef = useRef(null);
  const emailRef = useRef(null);
  const locationRef = useRef(null);
  const messageRef = useRef(null);
  const [error, setError] = useState("");

  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  const GotoEnquiry = (product) => {
    console.log(product);
    if (productRef.current) {
      productRef.current.value = product;
    }
  };
  const SubmitEnquiry = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const name = nameRef.current.value.trim();
    const product = productRef.current.value;
    const mobileNumber = mobileNumberRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const location = locationRef.current.value.trim();
    const message = messageRef.current.value.trim();

    // Validate form inputs
    if (!name || !product || !mobileNumber || !email || !location || !message) {
      setError("Please fill in all fields.");
      setSubmitting(false);
      return;
    }

    const scriptURL =
      "https://script.google.com/macros/s/AKfycbyPUpk6o6N_q3XrJgJ-713FhnJdfY9BpREHcwsZu4JcvBSlEOKLlWtzFIEC87Ik6Ogleg/exec";
    const form = document.getElementById("contact-form");

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: new FormData(form),
      });
    } catch (error) {
      console.error("Error!", error.message);
      setError(
        "Thank You for your enquiry.<br>Your form had been submitted successfully!"
      );
      setSubmitting(false);
    }

    nameRef.current.value = "";
    productRef.current.value = "";
    mobileNumberRef.current.value = "";
    emailRef.current.value = "";
    locationRef.current.value = "";
    messageRef.current.value = "";

    setTimeout(() => {
      setError("");
    }, 4000);
  };

  const DownloadBrochure = (e) => {
    document.body.style.overflowY = "hidden";
    console.log(e);
    setProductname(e);
    if (e === "Argon-V") {
      setBrochure("https://www.zoozmedical.com/argon-v.pdf");
    } else if (e === "Argon-S") {
      setBrochure("https://www.zoozmedical.com/argon-s.pdf");
    } else {
      setBrochure("https://www.zoozmedical.com/neon.pdf");
    }
    console.log(brochure);

    setShowDownload(!showDownload);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const applyGsapAnimation = () => {
      if (window.innerWidth > 1200) {
        let Product = gsap.timeline({
          scrollTrigger: {
            trigger: ".products",
            start: "top 100px",
            end: "+=1500px",
            pin: true,
            pinSpacing: true,
            scrub: 1,
          },
        });

        Product.to(".products .product_1", {
          scale: 0.9,
          duration: 1,
          transformOrigin: "top center",
        });

        Product.to(
          ".products .product_2",
          {
            translateY: "2%",
            transformOrigin: "top center",
            scale: 0.935,
            duration: 1,
          },
          "-=0.5"
        );

        Product.to(
          ".products .product_3",
          {
            translateY: "4%",
            scale: 0.975,
            transformOrigin: "top center",
            duration: 1,
          },
          "-=0.5"
        );

        Product.to(
          ".products .product_4",
          {
            translateY: "6%",
            transformOrigin: "top center",
            duration: 1,
          },
          "-=0.5"
        );
      }
    };

    applyGsapAnimation();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div>
      {/* {layer?<div className="empty"></div>:""} */}

      {showDownload ? (
        <DownloadForm
          productname={productname}
          brochure={brochure}
          showDownload={showDownload}
          setShowDownload={setShowDownload}
        ></DownloadForm>
      ) : (
        ""
      )}

      <Header menu={showMenu} setmenu={setShowMenu}></Header>

      {/* hero section start*/}

      <section className="hero_banner">
        <Slider {...settings}>
          <div className="container">
            <div className="content" data-aos="fade-right">
              <div className="heading">
                Syringe Pump
                <br />
                <span>INDIA</span>
              </div>
              <p>
                Designed to deliver medication efficiently, the ARGON-S syringe
                pump includes a large quick-to-read display along with intuitive
                keys, an alarm beacon, and a lucid user interface.
              </p>
            </div>

            <div className="image" data-aos="fade-left">
              <img
                alt="zooz"
                className="z_layer"
                src={require("./Assets/z_layer.webp")}
              />

              <img
                alt="zooz"
                className="m1"
                data-aos="fade-left"
                src={require("./Assets/argon-s-img.webp")}
              />

              <img
                alt="zooz"
                className="made"
                src={require("./Assets/made _in_india.webp")}
              />
            </div>
          </div>

          <div className="container">
            <div className="content" data-aos="fade-right">
              <div className="heading">
                Indusion Pump
                <br />
                <span>ARGON-V</span>
              </div>
              <p>
                Designed to deliver medication efficiently, the ARGON-V Infusion
                pump includes a large quick-to-read display along with intuitive
                keys, an alarm beacon, and a lucid user interface.
              </p>
            </div>

            <div className="image" data-aos="fade-left">
              <img
                alt="zooz"
                className="z_layer"
                src={require("./Assets/z_layer.webp")}
              />

              <img
                alt="zooz"
                className="m2"
                data-aos="fade-right"
                src={require("./Assets/argon-v-img.webp")}
              />
              <img
                alt="zooz"
                className="made"
                src={require("./Assets/made _in_india.webp")}
              />
            </div>
          </div>

          <div className="container">
            <div className="content" data-aos="fade-right">
              <div className="heading">
                {/* Power to infuse at 
              your fingertips
                <br /> */}
                <span>NEON-S</span>
              </div>
              <p>
                Discover infusion therapy redefined for precision and comfort.
                Our advanced techniques ensure each treatment is meticulously
                tailored, blending cutting-edge technology with a patient-first
                approach.
              </p>
            </div>

            <div className="image" data-aos="fade-left">
              <img
                alt="zooz"
                className="z_layer"
                src={require("./Assets/z_layer.webp")}
              />
              <img
                alt="zooz"
                className="m1"
                data-aos="fade-left"
                src={require("./Assets/neon-s-img.webp")}
              />

              <img
                alt="zooz"
                className="made"
                src={require("./Assets/made _in_india.webp")}
              />
            </div>
          </div>

          <div className="container">
            <div className="content" data-aos="fade-right">
              <div className="heading">
                {/* Power to infuse at 
              your fingertips                <br /> */}
                <span>NEON-V</span>
              </div>
              <p>
                Discover infusion therapy redefined for precision and comfort.
                Our advanced techniques ensure each treatment is meticulously
                tailored, blending cutting-edge technology with a patient-first
                approach.
              </p>
            </div>

            <div className="image" data-aos="fade-left">
              <img
                alt="zooz"
                className="z_layer"
                src={require("./Assets/z_layer.webp")}
              />
              <img
                alt="zooz"
                className="m1"
                data-aos="fade-left"
                src={require("./Assets/neon-v-img.webp")}
              />

              <img
                alt="zooz"
                className="made"
                src={require("./Assets/made _in_india.webp")}
              />
            </div>
          </div>
        </Slider>
      </section>

      {/* hero section end*/}

      {/* about section start*/}
      <div id="about"></div>
      <section className="about pad">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-12 content" data-aos="fade-right">
              <h1 className="heading">About ZOOZ</h1>
              <img alt="zooz" src={require("./Assets/made_premium.webp")} />
              <p>
                ZOOZ Medical was started in 2022 to manufacture medical
                equipments at a lower price point to compete with inferior
                chinese infiltration and ever growing imports in the Indian
                medical equipment market.
              </p>
            </div>

            <div className="col-lg-7 col-md-12 image" data-aos="fade-left">
              <img alt="zooz" src={require("./Assets/about-img.webp")} />
            </div>
          </div>
        </div>
      </section>

      {/* about section end*/}

      {/* value section start*/}

      <section className="pad our_values">
        <div className="heading_section">
          <h2 className="heading">Our values</h2>
          <p>
            We at ZOOZ firmly believe that no one can grow in any industry or
            any walk of life unless they respect and appreciate what each
            individual have contributed there.
          </p>
        </div>

        <div className="row split">
          <div className="col-lg-6 col-md-12" data-aos="fade-right">
            <img
              alt="zooz"
              className="full_img"
              src={require("./Assets/value_img.webp")}
              width="100%"
            />
          </div>
          <div className="col-lg-5 col-md-12 _cards" data-aos="fade-left">
            <div className="_cards1 single_card_col">
              <div className="_card" data-aos="fade-left" data-aos-delay="1000">
                <img alt="zooz" src={require("./Assets/card1.webp")} />
                <p>Respect Indian Culture and Traditions</p>
              </div>
              <div className="_card" data-aos="fade-left" data-aos-delay="1200">
                <img alt="zooz" src={require("./Assets/card2.webp")} />
                <p>
                  Respect the dedication of great doctors who have saved 1000s
                  of lives
                </p>
              </div>
              <div className="_card" data-aos="fade-left" data-aos-delay="1300">
                <img alt="zooz" src={require("./Assets/card3.webp")} />
                <p>Respect the love and care given to patients by nurses</p>
              </div>
              <div id="products"></div>
            </div>
            <div className="_cards2 single_card_col">
              <div className="_card" data-aos="fade-left" data-aos-delay="1400">
                <img alt="zooz" src={require("./Assets/card4.webp")} />
                <p>
                  Respect the medical industry distributors, dealers,
                  freelancers and biomedical engineers for the services
                </p>
              </div>
              <div className="_card" data-aos="fade-left" data-aos-delay="1500">
                <img alt="zooz" src={require("./Assets/card5.webp")} />
                <p>
                  Lastly Respect the Indian manufacturers who have dedicated
                  their life to manufacture products for indian medical industry{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* value section end*/}

      {/* mission vision start */}
      <section className="about pad_bottom mis_vis">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-12 content" data-aos="fade-right">
              <div className="heading">Mission </div>
              <p>
                To serve as the No.1 choice for syringe and volumetric pumps for
                newly growing Bharat by supplying at a comforting price point
                for developing hospital.
              </p>
              <div className="heading">Vision </div>
              <p>
                To be an inspiring Indian medical equipment manufacturing
                company creating a self-reliant india.
              </p>
            </div>

            <div className="col-lg-7 col-md-12 image" data-aos="fade-left">
              <img alt="zooz" src={require("./Assets/mis_vis.webp")} />
            </div>
          </div>
        </div>
      </section>
      {/* mission vision end */}

      {/* product section start*/}
      <section className="products pad_bottom">
        <div className="heading_section">
          <h3 className="heading">Our range of Products</h3>
          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
          </p> */}
        </div>
        <div className="container">
          <div className="_cards col-lg-10 col-md-12 col-12 m-auto">
            <div className="row align-items-center product_1">
              <div className="col-lg-5 col-md-5 col-12 content">
                <div className="product_name">Argon-S</div>
                <p>
                  With the ARGON-S syringe pump, the labyrinthine procedures in
                  infusion therapy technology remain a thing of the past. No
                  longer our nurses need to fret with complex operations. Set
                  your flow and let ARGON take care of the rest
                </p>
                <div className="buttons">
                  <a
                    aria-label=""
                    href="#enquire"
                    onClick={() => GotoEnquiry("Argon-S")}
                    className="product_enquiry"
                  >
                    Enquire Now
                  </a>
                  <button
                    onClick={() => DownloadBrochure("Argon-S")}
                    className="product_brochure"
                  >
                    <img src={require("./Assets/btn_arrow.webp")} />
                    Download Brochure
                  </button>
                </div>
              </div>
              <div className="col-lg-5 col-md-6 col-12 image">
                <img alt="zooz" src={require("./Assets/product_1.webp")} />
              </div>
            </div>

            <div className="row align-items-center product_2">
              <div className="col-lg-5 col-md-5 col-12 content">
                <div className="product_name">Argon-V</div>
                <p>
                  With the ARGON-V Infusion pump, the labyrinthine procedures in
                  infusion therapy technology remain a thing of the past. No
                  longer our nurses need to fret with complex operations. Set
                  your flow and let ARGON-V take care of the rest.
                </p>
                <div className="buttons">
                  <a
                    aria-label=""
                    onClick={() => GotoEnquiry("Argon-V")}
                    href="#enquire"
                    className="product_enquiry"
                  >
                    Enquire Now
                  </a>
                  <button
                    onClick={() => DownloadBrochure("Argon-V")}
                    className="product_brochure"
                  >
                    <img src={require("./Assets/btn_arrow.webp")} />
                    Download Brochure
                  </button>
                </div>
              </div>
              <div className="col-lg-5 col-md-6 col-12 image">
                <img alt="zooz" src={require("./Assets/product_2.webp")} />
              </div>
            </div>

            <div className="row align-items-center product_3">
              <div className="col-lg-5 col-md-5 col-12 content">
                <div className="product_name">Neon-S</div>
                <p className="coming_soon">Coming Soon</p>
                <div className="buttons">
                  <a
                    aria-label=""
                    onClick={() => GotoEnquiry("Neon-S")}
                    href="#enquire"
                    className="product_enquiry"
                  >
                    Enquire Now
                  </a>
                  <button
                    onClick={() => DownloadBrochure("Neon-S")}
                    className="product_brochure"
                  >
                    <img src={require("./Assets/btn_arrow.webp")} />
                    Download Brochure
                  </button>
                </div>
              </div>
              <div className="col-lg-5 col-md-6 col-12 image">
                <img alt="zooz" src={require("./Assets/neon-s.webp")} />
              </div>
            </div>

            <div className="row align-items-center product_4">
              <div className="col-lg-5 col-md-5 col-12 content">
                <div className="product_name">Neon-V</div>
                <p className="coming_soon">Coming Soon</p>
                <div className="buttons">
                  <a
                    aria-label=""
                    onClick={() => GotoEnquiry("Neon-V")}
                    href="#enquire"
                    className="product_enquiry"
                  >
                    Enquire Now
                  </a>
                  <button
                    onClick={() => DownloadBrochure("Neon-V")}
                    className="product_brochure"
                  >
                    <img src={require("./Assets/btn_arrow.webp")} />
                    Download Brochure
                  </button>
                </div>
              </div>
              <div className="col-lg-5 col-md-6 col-12 image">
                <img alt="zooz" src={require("./Assets/neon-v.webp")} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* product section end*/}

      {/* client section start */}
      <section className="pad clients our_values">
        <div className="row split">
          <div className="col-lg-6 col-md-12" data-aos="fade-right">
            <div className="heading_section">
              <span>Testimonial</span>
              <h4 className="heading">Here it from our client</h4>
              <p>
                Here's what our clients are saying about their experience with
                us{" "}
              </p>
            </div>
            <img
              alt="zooz"
              className="full_img"
              src={require("./Assets/client_img.webp")}
              width="100%"
            />
          </div>
          <div className="col-lg-5 col-md-12 _cards" data-aos="fade-left">
            <div className="_cards1 single_card_col">
              <div className="_card" data-aos="fade-left" data-aos-delay="100">
                <img alt="zooz" src={require("./Assets/test_comma.webp")} />
                <p>
                  We’ve been using the ARGON-V Infusion Pump for six months, and
                  its easy-to-read display and intuitive interface have made
                  medication delivery much smoother. The alarm feature ensures
                  patient safety, and its reliability has surpassed our
                  expectations.
                </p>
                <div className="test_details">
                  <div className="image">
                    <img alt="zooz" src={require("./Assets/test_user.webp")} />
                  </div>
                  <div className="content">
                    <p className="name">Dr. Rajesh Menon,</p>
                    <p className="detail">Chief Medical Officer</p>
                  </div>
                </div>
              </div>
              <div className="_card" data-aos="fade-left" data-aos-delay="200">
                <img alt="zooz" src={require("./Assets/test_comma.webp")} />
                <p>
                  NEON-V Infusion Pump का इस्तेमाल करना हमारी इन्फ्यूजन
                  ट्रीटमेंट्स को काफी बेहतर बना देता है। इसकी प्रिसाइस
                  टेक्नोलॉजी और पेशेंट-सेंट्रिक डिजाइन दोनों ही एक्यूरेसी और
                  आराम सुनिश्चित करते हैं। इसका ईज़ी-टू-यूज़ इंटरफ़ेस और
                  एडवांस्ड फीचर्स इसे हमारे डेली प्रोसेस का एक आवश्यक हिस्सा
                  बनाते हैं।
                </p>
                <div className="test_details">
                  <div className="image">
                    <img alt="zooz" src={require("./Assets/test_user.webp")} />
                  </div>
                  <div className="content">
                    <p className="name">Dr. Sanjay Verma,</p>
                    <p className="detail">Senior Physician</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="_cards2 single_card_col">
              <div className="_card" data-aos="fade-left" data-aos-delay="300">
                <img alt="zooz" src={require("./Assets/test_comma.webp")} />
                <p>
                  The NEON-S Infusion Pump has transformed our approach to
                  infusion therapy. Its precision and patient-focused design
                  make treatments smoother and more comfortable. The advanced
                  technology allows us to provide individualised care, enhancing
                  patient safety and satisfaction. It's a valuable addition to
                  our clinic.{" "}
                </p>
                <div className="test_details">
                  <div className="image">
                    <img alt="zooz" src={require("./Assets/test_user.webp")} />
                  </div>
                  <div className="content">
                    <p className="name">Dr. Anitha,</p>
                    <p className="detail">Medical Director</p>
                  </div>
                </div>
              </div>
              {/* <div className="_card" data-aos="fade-left" data-aos-delay="400">
                <img alt="zooz" src={require("./Assets/test_comma.webp")} />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                </p>
                <div className="test_details">
                  <div className="image">
                    <img alt="zooz" src={require("./Assets/test_user.webp")} />
                  </div>
                  <div className="content">
                    <p className="name">Selina gosh</p>
                    <p className="detail">
                      Designation, <br />
                      Company name
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* client section end */}

      {/* contact section start */}
      <div id="enquire"></div>

      <section className="products contact pad" data-aos="fade-up">
        <div className="heading_section">
          <span>Contact us</span>
          <h3 className="heading">Enquire Now</h3>
          <p>
            We'd love to hear from you! Fill out the form below, and our team
            will get back to you as soon as possible.{" "}
          </p>
        </div>
        <div className="container">
          <div className="col-lg-10 m-auto col-md-12 col-12">
            <form id="contact-form" onSubmit={SubmitEnquiry}>
              <input type="text" placeholder="Name" name="Name" ref={nameRef} />
              <span id="product-options-label" className="visually-hidden">
                Select a product option
              </span>

              <select
                ref={productRef}
                aria-label="Select a Product"
                name="Product"
              >
                <option value="" disabled selected>
                  Select product
                </option>
                <option value="Argon-V">Argon-V</option>
                <option value="Argon-S">Argon-S</option>
                <option value="Neon-S">Neon-S</option>
                <option value="Neon-V">Neon-V</option>
              </select>

              <input
                type="tel"
                placeholder="Mobile number"
                ref={mobileNumberRef}
                name="Number"
                maxLength={10}
                pattern="[0-9]{10}"
                title="Mobile number must be 10 digits"
              />

              <input
                type="email"
                placeholder="Email address"
                ref={emailRef}
                name="Email"
              />
              <input
                type="text"
                placeholder="Location"
                ref={locationRef}
                name="Location"
              />
              <input
                type="text"
                placeholder="Message"
                ref={messageRef}
                name="Message"
              />
              {error && (
                <p
                  className="error"
                  dangerouslySetInnerHTML={{ __html: error }}
                ></p>
              )}
              <button type="submit">
                {submitting ? "Submitting" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </section>
      {/* contact section end */}

      <Footer></Footer>
    </div>
  );
}
