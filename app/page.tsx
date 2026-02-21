import React from 'react'
import HomeHero from './components/HomeHero'
import HomeLoading from './components/HomeLoading'

const page = () => {
  return (
    <div>
      <HomeLoading />
      <HomeHero />
    </div>
  )
}

export default page