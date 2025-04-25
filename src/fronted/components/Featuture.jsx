import React from 'react'
import { Calendar, ShoppingBag, Gift, RefreshCcw } from "lucide-react";

const features = [
    {
      icon: <Calendar size={40} className="text-gray-500 mx-auto" />,
      title: "Book An Appointment",
      description: "At imperdiet dui accumsan sit amet nulla risus est ultricies quis."
    },
    {
      icon: <ShoppingBag size={40} className="text-gray-500 mx-auto" />,
      title: "Pick Up In Store",
      description: "At imperdiet dui accumsan sit amet nulla risus est ultricies quis."
    },
    {
      icon: <Gift size={40} className="text-gray-500 mx-auto" />,
      title: "Special Packaging",
      description: "At imperdiet dui accumsan sit amet nulla risus est ultricies quis."
    },
    {
      icon: <RefreshCcw size={40} className="text-gray-500 mx-auto" />,
      title: "Free Global Returns",
      description: "At imperdiet dui accumsan sit amet nulla risus est ultricies quis."
    }
  ];

const Featuture = () => {
  return (
    <>
    <section className="bg-gray-100 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {features.map((feature, index) => (
          <div key={index} className="p-4">
            {feature.icon}
            <h3 className="text-lg font-semibold mt-4">{feature.title}</h3>
            <p className="text-gray-500 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
    </>
  )
}

export default Featuture