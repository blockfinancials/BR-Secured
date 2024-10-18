import React, { useState, useEffect } from 'react';

const cards = [
  { id: 1, currency: 'NGN', imageUrl: '/api/placeholder/440/269' },
  { id: 2, currency: 'BTC', imageUrl: '/api/placeholder/440/269' },
  { id: 3, currency: 'ETH', imageUrl: '/api/placeholder/440/269' },
  { id: 4, currency: 'USDT', imageUrl: '/api/placeholder/440/269' },
];

const CascadingCards = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-96 overflow-hidden">
      {cards.map((card, index) => (
        <div
          key={card.id}
          className={`absolute w-full max-w-[440px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out`}
          style={{
            zIndex: index === activeIndex ? cards.length : cards.length - index,
            opacity: index === activeIndex ? 1 : 0.5,
            transform: `translate(-50%, -50%) scale(${index === activeIndex ? 1 : 0.8})`,
          }}
        >
          <img
            src={card.imageUrl}
            alt={card.currency}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default CascadingCards;