import React from 'react'
import MainCarousel from './MainCarousel'
import ShoppingList from './ShoppingList'
import Footer from '../../components/Footer'

const Home = () => {
  return (
    <div>
      <MainCarousel />
      <ShoppingList />
      <Footer />
    </div>
  )
}

export default Home