"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";

interface HowItWorksCardProps {
    images: StaticImageData[];
}

const HowItWorksCard = ({ images }: HowItWorksCardProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const touchStartY = useRef(0);
    const touchStartX = useRef(0);

    const nextCard = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevCard = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
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
            className="relative md:h-[305px] md:w-[408px] aspect-[285/308] w-full block mx-auto"
            ref={containerRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className="relative h-full w-full">
                <AnimatePresence>
                    {images.map((image, index) => {
                        // Calculate position in stack
                        const position = (index - currentIndex + images.length) % images.length;
                        const isActive = position === 0;
                        const isHidden = position > 3;

                        // Calculate vertical offset - each card behind is 20px higher
                        const yOffset = position * -35;

                        return (
                            <motion.div
                                key={index}
                                className={`absolute inset-0 rounded-2xl shadow-md flex items-center justify-center text-xl font-bold`}
                                style={{
                                    zIndex: images.length - position,
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
                                <div className="relative flex justify-center ">
                                    <div className="relative bg-black w-[345px] md:w-[445px] lg:w-[545px] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl h-[200px] sm:h-[280px] md:h-[328px] z-40">
                                        <Image
                                            src={image}
                                            alt="How it works"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

        </div>
    );
};

export default HowItWorksCard;