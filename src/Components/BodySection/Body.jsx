import React, { useState, useEffect } from "react";
 
 
 
const p1 = "https://res.cloudinary.com/dau59mvx0/image/upload/p2_ticvbk.jpg";
const p2 = " https://res.cloudinary.com/dau59mvx0/image/upload/p8_welxok.jpg"
const p3 = "https://res.cloudinary.com/dau59mvx0/image/upload/k1_eekkob.jpg"
const p4 = "https://res.cloudinary.com/dau59mvx0/image/upload/o2_mvggsp.jpg"
const arro = "https://res.cloudinary.com/dau59mvx0/image/upload/arr_qk0tbl.png"
  
import { IoIosArrowRoundForward } from "react-icons/io";
import '../BodySection/Body.css'
import { Link } from "react-router-dom";
function Home() {
  const slides = [
    {
      img: p1,
      semiTitle: "New Arrivals",
      mainTitle: "Fill your desk full of medicines and happiness.",
      priceText: "Starts from",
      price: "6700.00 LKR",
      btnText: "Shop now"
    },
    {
      img: p2,
      semiTitle: "Special Offer",
      mainTitle: "Keep your family healthy with our best medicines.",
      priceText: "Starts from",
      price: "5500.00 LKR",
      btnText: "Buy now"
    },
    {
      img: p3,
      semiTitle: "Best Sellers",
      mainTitle: "The most trusted products for your daily needs.",
      priceText: "Starts from",
      price: "7500.00 LKR",
      btnText: "Order now"
    },
     {
      img: p4,
      semiTitle: "Latest Products",
      mainTitle: "Secured ayurvedic products from us.",
      priceText: "Starts from",
      price: "2700.00 LKR",
      btnText: "Try now"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) =>
          prev === slides.length - 1 ? 0 : prev + 1
        );
        setFade(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="main-content">
      <div className="inner-content">

        {/* CARD 1 - SLIDER */}
        <div
          className={`  card1 ${fade ? "fade-in" : "fade-out"}`}
          style={{
            backgroundImage: `url(${slides[currentIndex].img})`
          }}
        >
          <div className="semi-title">
            <p>{slides[currentIndex].semiTitle}</p>
          </div>
          <div className="main-title">
            <h1>{slides[currentIndex].mainTitle}</h1>
          </div>
          <div className="paragrapj">
            <p>{slides[currentIndex].priceText}</p>
            <h3>{slides[currentIndex].price}</h3>
          </div>
          <div className="btn">
            <button>{slides[currentIndex].btnText}</button>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="  card2">
           <div className="arrow">
          <img src={arro} className="iop"></img>
           </div>
          <div className="main-title">
            <h1><span className="sp"> 40% </span>off for Ayurvedic Wellness.</h1>
          </div>
          <div className="btns">
              <Link to="/" className="link">more </Link>
               <IoIosArrowRoundForward />
          </div>
        </div>

        {/* CARD 3 */}
        <div className="  card3">
          <div className="semi-title">
            <p>Trusted delivering in SriLanka</p>
            <p className="number">500+</p>
          </div>
          <div className="main-title">
              <button className="learn">Learn more </button>
              
          </div>
           
        </div>

      </div>
    </div>
  );
}

export default Home;
