import React from 'react'
import SideLefe from '../component/SideLefe'
import Footer from '../component/Footer'
import NavBar from '../component/NavBar'
import Show from '../branches/Show'

const Brand = () => {

  
  
  
  return (
    <>
        <SideLefe />
      {/* container */}
      <div class="-mt-2 sm:ml-64">
        <div class="p-4  rounded-lg dark:border-gray-700">
          <div class=" gap-4 mb-4">
            <div class="rounded-sm bg-gray-50 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                {/* navbar */}
                <NavBar />
              </p>
            </div>
          </div>

         
          <div class="flex items-center justify-center mb-4 rounded-sm bg-gray-50 ">
            <Show />
          </div>
          

          {/* footer */}
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Brand