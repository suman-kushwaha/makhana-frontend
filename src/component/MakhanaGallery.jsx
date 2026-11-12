import { useEffect, useState } from "react";

const galleryImages = [
  "/gallery/photo1.jpeg",
  "/gallery/photo2.jpeg",
  "/gallery/photo3.jpeg",
  "/gallery/photo4.jpeg",
  "/gallery/photo5.jpeg",
  "/gallery/photo6.jpeg",
  "/gallery/photo7.jpeg",
  "/gallery/photo8.jpeg",
  
];

export default function MakhanaGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setActiveIndex((current) =>
      (current + 1) % galleryImages.length
    );
  };

  const prevSlide = () => {
    setActiveIndex((current) =>
      (current - 1 + galleryImages.length) % galleryImages.length
    );
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((current) =>
        (current + 1) % galleryImages.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      className="bg-[#faf8f3] py-16 md:py-24 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-5">

        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-[#b58a45] uppercase tracking-[4px] text-xs font-semibold mb-3">
            The Veenuts Collection
          </p>

          <h2 className="text-3xl md:text-5xl font-semibold text-[#183b56]">
            Quality You Can See
          </h2>

          <p className="text-gray-500 text-sm md:text-base mt-4 max-w-xl mx-auto">
            A closer look at the quality and variety of our premium makhana.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-5xl mx-auto">

          <div className="relative bg-white border border-[#e9e2d5] rounded-2xl shadow-sm overflow-hidden">

            <div className="h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center p-4 md:p-8">

              <img
                src={galleryImages[activeIndex]}
                alt="Premium Veenuts makhana"
                className="w-full h-full object-contain transition-opacity duration-500"
              />

            </div>

          </div>

          {/* Previous Button */}
          <button
            onClick={prevSlide}
            aria-label="Previous image"
            className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg text-[#183b56] hover:bg-[#183b56] hover:text-white transition flex items-center justify-center text-2xl"
          >
            &#8249;
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            aria-label="Next image"
            className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg text-[#183b56] hover:bg-[#183b56] hover:text-white transition flex items-center justify-center text-2xl"
          >
            &#8250;
          </button>

        </div>

        {/* Dots */}
        <div className="flex justify-center items-center gap-2 mt-7">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to image ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-8 bg-[#b58a45]"
                  : "w-2 bg-[#c9c2b5] hover:bg-[#183b56]"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}