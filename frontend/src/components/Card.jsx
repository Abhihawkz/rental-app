import React from 'react';

const Card = ({ name, image, description, price, available }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-101 cursor-pointer ">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
        <p className="text-lg font-bold text-gray-900 mt-4">Rs {price}</p>
        <span
          className={`inline-block mt-2 px-4 py-1 rounded-full text-white ${
            available ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {available ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>
    </div>
  );
};

export default Card;
