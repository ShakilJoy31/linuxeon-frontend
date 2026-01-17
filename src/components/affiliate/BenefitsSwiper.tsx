"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import BenefitsCard from "./Benifit";

const StackedCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  
  const cards = [
    { 
      id: 1, 
      title: "Sales Performance",
      buttonColor: "bg-purple-500",
      gradientFrom: "from-cyan-400",
      gradientTo: "to-blue-600",
      lineColor: "#00BFFF",
      data: Array.from({ length: 30 }, (_, i) => ({
        name: i,
        value: Math.floor(Math.random() * 100),
      }))
    },
    { 
      id: 2, 
      title: "User Growth",
      buttonColor: "bg-green-500",
      gradientFrom: "from-emerald-400",
      gradientTo: "to-teal-600",
      lineColor: "#10B981",
      data: Array.from({ length: 30 }, (_, i) => ({
        name: i,
        value: Math.floor(Math.random() * 150),
      }))
    },
    { 
      id: 3, 
      title: "Revenue Stats",
      buttonColor: "bg-amber-500",
      gradientFrom: "from-amber-400",
      gradientTo: "to-orange-600",
      lineColor: "#F59E0B",
      data: Array.from({ length: 30 }, (_, i) => ({
        name: i,
        value: Math.floor(Math.random() * 200),
      }))
    },
    { 
      id: 4, 
      title: "Engagement",
      buttonColor: "bg-red-500",
      gradientFrom: "from-pink-400",
      gradientTo: "to-rose-600",
      lineColor: "#EF4444",
      data: Array.from({ length: 30 }, (_, i) => ({
        name: i,
        value: Math.floor(Math.random() * 80),
      }))
    },
    { 
      id: 5, 
      title: "Conversion Rate",
      buttonColor: "bg-indigo-500",
      gradientFrom: "from-violet-400",
      gradientTo: "to-indigo-600",
      lineColor: "#6366F1",
      data: Array.from({ length: 30 }, (_, i) => ({
        name: i,
        value: Math.floor(Math.random() * 50),
      }))
    },
    { 
      id: 6, 
      title: "Customer Satisfaction",
      buttonColor: "bg-blue-500",
      gradientFrom: "from-sky-400",
      gradientTo: "to-blue-600",
      lineColor: "#3B82F6",
      data: Array.from({ length: 30 }, (_, i) => ({
        name: i,
        value: Math.floor(Math.random() * 100),
      }))
    },
  ];

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  useEffect(() => {
    // Set up auto-rotation every 5 seconds
    const interval = setInterval(() => {
      nextCard();
    }, 5000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (!isHovering) return;
      
      e.preventDefault();
      if (e.deltaY > 0) {
        nextCard();
      } else if (e.deltaY < 0) {
        prevCard();
      }
    };

    // Touch event handlers for mobile devices
    const handleTouchStart = (e: TouchEvent) => {
      // Prevent default to stop page scrolling when interacting with cards
      e.preventDefault();
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
      
      // Add a class to body to prevent scrolling
      document.body.classList.add('overflow-hidden');
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Prevent default to stop page scrolling when interacting with cards
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!container) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      
      const deltaY = touchEndY - touchStartY.current;
      const deltaX = touchEndX - touchStartX.current;
      
      // Only respond to vertical swipes (more than horizontal)
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 20) {
        if (deltaY > 0) {
          // Swipe down - go to previous card
          prevCard();
        } else {
          // Swipe up - go to next card
          nextCard();
        }
      }
      
      // Remove the class to re-enable scrolling
      setTimeout(() => {
        document.body.classList.remove('overflow-hidden');
      }, 100);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      
      // Ensure we remove the class when component unmounts
      document.body.classList.remove('overflow-hidden');
    };
  }, [isHovering]);

  return (
    <div 
      className="relative md:h-[305px] md:w-[408px] aspect-[305/308] w-full block mx-auto"
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative h-full w-full">
        <AnimatePresence>
          {cards.map((card, index) => {
            // Calculate position in stack
            const position = (index - currentIndex + cards.length) % cards.length;
            const isActive = position === 0;
            const isHidden = position > 2;

            // Calculate vertical offset - each card behind is 20px higher
            const yOffset = position * -55;

            return (
              <motion.div
                key={card.id}
                className={`absolute inset-0 rounded-2xl shadow-md flex items-center justify-center text-xl font-bold`}
                style={{
                  zIndex: cards.length - position,
                  cursor: isHovering ? 'pointer' : 'auto',
                }}
                initial={false}
                animate={{
                  y: yOffset,
                  scale: 1 - (position * 0.05), // Slightly smaller as they go back
                  opacity: isHidden ? 0 : 1, // Slightly more transparent as they go back
                  transformOrigin: 'bottom center',
                }}
                whileHover={{
                  y: isActive ? yOffset : yOffset - 10, // Lift slightly on hover
                  scale: isActive ? 1 - (position * 0.05) : 1 - (position * 0.05) + 0.05,
                  transition: { duration: 0.2 }
                }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
                onClick={() => {
                  if (!isActive) {
                    nextCard();
                  }
                }}
              >
                <BenefitsCard 
                  title={card.title}
                  buttonColor={card.buttonColor}
                  gradientFrom={card.gradientFrom}
                  gradientTo={card.gradientTo}
                  data={card.data}
                  lineColor={card.lineColor}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="text-center text-white text-[16px] pt-6">
        Get <span className="font-semibold">rewarded</span> for{" "}
        <span className="font-semibold">spreading creativity</span>
      </div>

      {/* Progress Bars */}
      <div className="flex justify-center gap-1 mt-4">
        {cards.map((_, i) => (
          <div
            key={i}
            className="w-[10px] h-[40px]"
            style={{
              backgroundColor: i === currentIndex ? "#1776BB" : "#E7E7E7",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default StackedCards;