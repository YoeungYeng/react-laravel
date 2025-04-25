import React from 'react'
import SideLefe from '../component/SideLefe'
import Footer from '../component/Footer'
import NavBar from '../component/NavBar'
import ShowUser from '../users/ShowUser'


const User = () => {
  return (
    <>
        <SideLefe />
        <div class=" sm:ml-64 h-screen">
        <div class="p-4  rounded-lg dark:border-gray-700">
          <div class=" gap-4 mb-4">
            <div class="rounded-sm bg-gray-50 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                {/* navbar */}
                <NavBar />
              </p>
            </div>
          </div>

         
          <div class="flex items-center justify-center mb-4 rounded-sm">
            <ShowUser />
          </div>
          

          {/* footer */}
          <Footer />
        </div>
      </div>
    </>
  )
}

export default User