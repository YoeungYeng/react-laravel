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
      <div className="h-screen  sm:ml-64 "  
      >
        <div className="p-4  rounded-lg dark:border-gray-700">
          <div className=" gap-4 mb-4">
            <div className="rounded-sm bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                {/* navbar */}
                <NavBar />
              </p>
            </div>
          </div>

         
          <div className="flex items-center justify-center mb-4 rounded-sm " >
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