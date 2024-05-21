import React from 'react'
import Appbar from '../components/Appbar'
import Searchbar from '../components/Searchbar'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <Appbar />
      <div className='mt-6 flex flex-col items-center'>
        <h3 className='flex justify-center mt-6 text-xl leading-none tracking-tight text-gray-600 md:text-2xl lg:text-3xl'>Welcome to the</h3>
        <h1 className="flex justify-center mt-2 mb-6 text-5xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          NUST <span className="md:block hidden"> <br /> </span>
          <span className='underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600 ml-4'>Preprint Server</span>
        </h1>
        <p className="flex justify-center w-2/3 md:w-full lg:w-full text-center mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Discover the wealth of academic knowledge hosted on the NUST Preprint Server. As the primary repository for research papers and scholarly articles from NUST University's esteemed professors and researchers, our platform offers unprecedented access to cutting-edge discoveries and insights. From groundbreaking studies to innovative findings, explore a diverse array of disciplines and contribute to the advancement of knowledge in your field. Join us in fostering collaboration and sharing ideas as we collectively push the boundaries of academic exploration.</p>
      </div>
      <div className='mt-4'>
        <Searchbar />
      </div>
      <div className='mt-96'>
        <Footer />
      </div>
    </>
  )
}

export default Home