import React, { useState } from 'react';

const CustomerReviews = () => {
  const [activeTab, setActiveTab] = useState('reviews');

  const reviews = [
    {
      name: 'Emily Selman',
      date: 'July 16, 2021',
      rating: 5,
      comment:
        "This icon pack is just what I need for my latest project. There's an icon for just about anything I could ever need. Love the playful look!",
      avatarUrl: 'https://via.placeholder.com/40/64B5F6/FFFFFF?Text=ES',
    },
    {
      name: 'Hector Gibbons',
      date: 'July 12, 2021',
      rating: 5,
      comment:
        "Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so it's a steal at this price.",
      avatarUrl: 'https://via.placeholder.com/40/81C784/FFFFFF?Text=HG',
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={`star-${i}`}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill={i < rating ? 'currentColor' : 'none'}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.049 2.928c.39-.703 1.295-.703 1.685 0l2.106 4.287 4.725.687c.27.039.513.189.637.412.124.223.163.475.114.718l-3.404 3.31 1.002 4.607c.044.211.02.423-.067.61-.087.187-.24.342-.422.461l-4.165 2.155-.792.412c-.076.04-.168.062-.26.062-.091 0-.184-.022-.26-.062l-.792-.412-4.165-2.155c-.182-.119-.335-.274-.422-.461-.087-.187-.11-.399-.067-.61l1.002-4.607-3.404-3.31c-.049-.243-.009-.495.114-.718.124-.223.367-.373.637-.412l4.725-.687 2.106-4.287z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="bg-white rounded-md shadow-sm p-6">
      <div className="border-b border-gray-200 pb-4">
        <ul className="flex space-x-4 text-sm font-medium text-gray-500">
          <li
            onClick={() => setActiveTab('reviews')}
            className={`py-2 cursor-pointer ${
              activeTab === 'reviews'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'hover:text-indigo-600'
            }`}
          >
            Customer Reviews
          </li>
          <li
            onClick={() => setActiveTab('faq')}
            className={`py-2 cursor-pointer ${
              activeTab === 'faq'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'hover:text-indigo-600'
            }`}
          >
            FAQ
          </li>
          <li
            onClick={() => setActiveTab('license')}
            className={`py-2 cursor-pointer ${
              activeTab === 'license'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'hover:text-indigo-600'
            }`}
          >
            License
          </li>
        </ul>
      </div>

      <div className="mt-6 space-y-6">
        {activeTab === 'reviews' && (
          <>
            {reviews.map((review, index) => (
              <div key={index} className="py-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src={review.avatarUrl}
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">{review.name}</h4>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                </div>
                <div className="mt-2">{renderStars(review.rating)}</div>
                <p className="mt-2 text-sm text-gray-700">{review.comment}</p>
              </div>
            ))}
          </>
        )}

        {activeTab === 'faq' && (
          <div className="text-sm text-gray-700">
            <h3 className="font-semibold mb-2">Frequently Asked Questions</h3>
            <ul className="list-disc list-inside">
              <li>Q: Is this icon pack compatible with React?</li>
              <li>A: Yes, all icons are SVGs and easy to integrate.</li>
              <li>Q: Can I use these icons commercially?</li>
              <li>A: Absolutely! Just make sure to check the license terms.</li>
            </ul>
          </div>
        )}

        {activeTab === 'license' && (
          <div className="text-sm text-gray-700">
            <h3 className="font-semibold mb-2">License Information</h3>
            <p>
              This product is licensed under the MIT License. You are free to use, modify, and
              distribute it in personal or commercial projects.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerReviews;
