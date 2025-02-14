import React from 'react'
import Header from './Header'
import Banner from './Banner'
import Slide from './Slide'
import Features from './Features'
import Steps from './Steps'
import Resume from './Resume'
import Review from './Review'
import Blog from './Blog'
import Footer from './Footer'

export default function Home() {
  return (
    <div>
        <Header/>  
      <Banner/>
      <Slide/>
      <Features/>
      <Steps/>
      <Resume/>
      <Review/>
      <Blog/>
      <Footer/>
    </div>
  )
}
