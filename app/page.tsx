'use client'

import React, { useState } from 'react'
import HomeHero from './components/HomeHero'
import HomeLoading from './components/HomeLoading'

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main>
      <HomeLoading onComplete={() => setIsLoading(false)} />
      <HomeHero isLoaded={!isLoading} />
    </main>
  )
}

export default Page