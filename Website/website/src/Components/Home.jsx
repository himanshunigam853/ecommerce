import React from 'react'
import Header from './Header'
import Slider from './Slider'
import Product from './Product'
import './Mobile.css'
import Testimonial from './Testimonial'
import Footer from './Footer'
import Offer from './Offer'
// import Slider from "./Slider";

const Home = () => {
  return (
    <div>
      <Header/>
      <Slider/>
      <Product/>
      {/* <Testimonial/> */}
      <Offer/>
      <Footer/>
    </div>
  )
}

export default Home
