import React from 'react'
import Home from './Home'
import Courses from './Courses'
import About from './About'

const Main = () => {
  return (
    <>
        <section id='home'>
            <Home/>
        </section>
        <section id='courses'>
            <Courses/>
        </section>
        <section id='about'>
            <About/>
        </section>
    </>
  )
}

export default Main