import React from 'react'
import SideLefe from '../component/SideLefe'
import Footer from '../component/Footer'
import NavBar from '../component/NavBar'
import {default as ShowProduct} from '../products/Show'

const Proudcts = () => {
  return (
    <>
      <SideLefe />
      {/* container */}
      <div class="h-screen  sm:ml-64 "  
      >
        <div class="p-4  rounded-lg dark:border-gray-700">
          <div class=" gap-4 mb-4">
            <div class="rounded-sm bg-gray-50 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                {/* navbar */}
                <NavBar />
              </p>
            </div>
          </div>

         
          <div class="flex items-center justify-center mb-4 rounded-sm " >
            <ShowProduct />
          </div>
          

          {/* footer */}
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Proudcts