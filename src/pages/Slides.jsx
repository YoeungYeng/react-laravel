import React from 'react'
import Footer from '../component/Footer'
import NavBar from '../component/NavBar'
import Show from '../slides/Show'
import SideLefe from '../component/SideLefe'

const Slides = () => {
  return (
    <>
    {/* side lefe */}
    <SideLefe />
    {/* layout */}
    <div className="sm:ml-64 h-screen  ">
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
            <Show />
          </div>
          

          {/* footer */}
          <Footer />
        </div>
      </div>
    
    </>
  )
}

export default Slides