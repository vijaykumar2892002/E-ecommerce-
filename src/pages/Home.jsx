import React, { useState } from 'react'

import Announcement from '../components/Announcement'
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import PopUp from '../components/PopUp'
import TestimonialsSlider from '../components/TestimonialsSlider'
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Register from './Register.jsx'
// import Login from './Login.jsx'

const Home = () => {
  const [isOpen, setIsOpen] = useState(true);

  const openPopUp = () => {
    setIsOpen(true);
  };

  const closePopUp = () => {
    setIsOpen(false);
  };
  const fakeTestimonials = [
    {
      name: "John Smith",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula nulla nec nisl mattis, vel ultricies tortor faucibus.",
    },
    {
      name: "Alice Johnson",
      message: "Integer at eros vestibulum, vestibulum augue eget, commodo nunc. Ut ullamcorper justo sit amet interdum fermentum.",
    },
    {
      name: "Emily Davis",
      message: "Vivamus auctor libero sit amet justo rutrum, sit amet suscipit ex malesuada. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    },
    {
      name: "Michael Brown",
      message: "Fusce dapibus purus nec tellus dignissim tempus. Curabitur in libero quis libero feugiat tristique.",
    },
    {
      name: "Sophia Martinez",
      message: "Nullam et urna eget turpis volutpat rhoncus. Aenean sit amet magna nec risus aliquam volutpat.",
    },
  ];
  

  return (
    <div>
      <Announcement/>
     
      <Slider />
      <Categories/>
      <Products/>
     
      <Newsletter/>
      <Footer/>
      <PopUp isOpen={isOpen} onClose={closePopUp}>
        <h2>Welcome to our store</h2>
      </PopUp>
    </div>
  );
};

export default Home;

