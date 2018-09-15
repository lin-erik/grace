import React from 'react'
import { Parallax } from 'react-parallax'
import AOS from 'aos'

import Navbar from './Navbar.jsx'

AOS.init({
  duration: 800
})

let Splash = props => {
  return (
    <div className="splash">
      <Navbar />
      
      <Parallax
        bgImage={
          'http://images.ctfassets.net/cvlcgjxo5px5/3twRR067LywU8UWQse4Y2E/37f4c7dda59b7094723773ce33136048/HP1_2x.jpg'
        }
        strength={700}
      >
        <div className="imageBox" data-aos="fade">
          <div
            className="imageText"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.7)'
            }}
          >
            Meet Grace: Your own personal fashion assistant.
          </div>
        </div>
      </Parallax>
      <Parallax
        bgImage={
          'https://simages.ericdress.com/Upload/Image/2017/11/watermark/016851aa-26f9-4416-aed9-55fa01daa4bb.jpg'
        }
        strength={700}
      >
        <div className="imageBox">
          <div className="imageText" data-aos="fade">
            Grace helps you find fashion that fits you.
          </div>
        </div>
      </Parallax>
    </div>
  )
}

export default Splash
