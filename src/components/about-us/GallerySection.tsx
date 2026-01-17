"use client";
import Image from "next/image";
import galleryImage from '../../../public/company-image/6078100480669191492_121.jpg'
import galleryImage2 from '../../../public/company-image/6078100480669191493_121.jpg'
import galleryImage3 from '../../../public/company-image/6078100480669191494_121.jpg'
import galleryImage4 from '../../../public/company-image/6078100480669191496_121.jpg'
import galleryImage5 from '../../../public/company-image/6078100480669191492_121.jpg'

export default function GallerySection() {
  return (
    <section className="w-full bg-white dark:bg-black py-8 sm:py-12 md:py-16 px-4 md:px-0 ">
      <div className="">
        {/* Heading */}
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12">
          Gallery
        </h2>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {/* Image 1 - Shows in different positions based on screen size */}
          <div className="relative h-48 sm:h-64 lg:h-44 row-span-1 lg:col-span-1">
            <Image
              src={galleryImage4}
              alt="Gallery Image 1"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
            />
          </div>

          {/* Image 2 - Taller on mobile, normal on desktop */}
          <div className="relative h-64 sm:h-48 lg:h-64 row-span-1 lg:col-span-1">
            <Image
              src={galleryImage5}
              alt="Gallery Image 2"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
            />
          </div>

          {/* Image 3 */}
          <div className="relative h-48 row-span-1 lg:col-span-1">
            <Image
              src={galleryImage2}
              alt="Gallery Image 3"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
            />
          </div>

          {/* Image 4 - Largest image in the grid */}
          <div className="relative h-72 sm:h-64 lg:h-72 row-span-1 sm:col-span-2 lg:col-span-1">
            <Image
              src={galleryImage3}
              alt="Gallery Image 4"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 20vw"
            />
          </div>

          {/* Image 5 */}
          <div className="relative h-60 sm:h-48 lg:h-60 row-span-1 lg:col-span-1">
            <Image
              src={galleryImage}
              alt="Gallery Image 5"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}