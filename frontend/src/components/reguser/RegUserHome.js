import React, { useState, useEffect } from "react";
import Topbar from "./Topbar";
import Header from "./Header";
import HeroSection from "./HeroSection";
import ServiceSection from "./ServiceSection";
import Story from "./Story";
import Event from "./Event";
import Feedback from "./Feedback";
import Foods from "./Foods";
import Reservation from "./Reservation";
import PhotoGallery from "./photoGallery";
import Testimonial from "./Testimonial";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import { IoChevronUp } from "react-icons/io5";



import heroSlider1 from "../assets/images/res-2.jpg";
import heroSlider2 from "../assets/images/res-1.jpg";
import heroSlider3 from "../assets/images/res-3.jpg";



const slides = [
  {
    imgSrc: heroSlider1,
    subtitle: (
      <p className="label-2 section-subtitle slider-reveal">
        Traditional & Hygienic
      </p>
    ),
    title: (
      <h1 className="display-1 hero-title slider-reveal">
        Love for Delicious Food
      </h1>
    ),
    text: (
      <p className="body-2 hero-text slider-reveal">
        Come with family & feel the joy of mouthwatering food.
      </p>
    ),
  },
  {
    imgSrc: heroSlider3,
    subtitle: (
      <p className="label-2 section-subtitle slider-reveal">
        Fresh & Delightful
      </p>
    ),
    title: (
      <h1 className="display-1 hero-title slider-reveal">
        The Joy of Great Food
      </h1>
    ),
    text: (
      <p className="body-2 hero-text slider-reveal">
        Join us for a memorable meal where happy customers savor every bite.
      </p>
    ),
  },
  {
    imgSrc: heroSlider2,
    subtitle: (
      <p className="label-2 section-subtitle slider-reveal">Elegant & Cozy</p>
    ),
    title: (
      <h1 className="display-1 hero-title slider-reveal">
        Dine in Delight
      </h1>
    ),
    text: (
      <p className="body-2 hero-text slider-reveal">
        Step into a warm ambiance & enjoy an unforgettable dining experience.
      </p>
    ),
  },
];

function UserHome() {
  const location = useLocation();
  const email = location.state?.email;

  const [activeSlide, setActiveSlide] = useState(0);
  const [isTopbarVisible, setIsTopbarVisible] = useState(true);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setIsTopbarVisible(scrollY <= 50);
    setIsHeaderVisible(scrollY <= 50);

    const menuSection = document.getElementById("menus");
    if (menuSection && menuSection.offsetTop <= scrollY) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
 
      <div className="container">
        <Topbar isTopbarVisible={isTopbarVisible} />
        <Header isHeaderVisible={isHeaderVisible} role="user" />
        <HeroSection
          slides={slides}
          activeSlide={activeSlide}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
        />
        <div id="menus">
          <Foods />
        </div>
        <div id="reservation">
          <Reservation email={email} />
        </div>
        <div id="story">
          <Story />
        </div>
        <div id="services">
          <ServiceSection />
        </div>
        <div id="gallery">
          <PhotoGallery />
        </div>
        <Event />
        <Testimonial />
        <Feedback email={email} />
        <Footer email={email} />
  
        {showBackToTop && (
          <a href="#top" className="back-top-btn active" aria-label="Back to top">
            <IoChevronUp aria-hidden="true" />
          </a>
        )}
      </div>
 
  );
}

export default UserHome;
