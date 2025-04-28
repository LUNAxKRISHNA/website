
import React, { useState, useEffect, useRef } from "react";
import { Image } from "lucide-react";

interface GalleryItem {
  src: string;
  alt: string;
  category?: string;
}

const images = import.meta.glob("/public/Gallery/*/*.{jpg,jpeg,png,webp,gif,JPG,HEIC}");

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = Object.keys(images).map((path) => {
        const parts = path.split("/");
        const filename = parts.pop() || "image";
        const category = parts.pop() || "General";

        return {
          src: path.replace("/public", ""),
          alt: filename.replace(/\.(jpg|jpeg|png|webp|gif)$/i, "").replace(/[-_]/g, " "),
          category,
        };
      });

      setGalleryItems(loadedImages);
      setVisibleItems(new Array(loadedImages.length).fill(false).map((_, i) => i < 4));
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!galleryRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setVisibleItems(galleryItems.map(() => true));
          }, 100);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: "100px", threshold: 0.1 }
    );

    observer.observe(galleryRef.current);
    return () => observer.disconnect();
  }, [galleryItems]);

  const categories = ["All", ...new Set(galleryItems.map(item => item.category))];
  const filteredItems = selectedCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen py-16 mt-16">
      <div className="container mx-auto px-4" ref={galleryRef}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Our Gallery
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore our collection of memorable moments and achievements
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary text-white shadow-lg scale-105"
                    : "bg-accent hover:bg-accent/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className={`break-inside-avoid group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 ${
                visibleItems[index] ? "opacity-100" : "opacity-0"
              }`}
              style={{
                transition: `opacity 0.5s ease-in-out ${index * 0.1}s`,
              }}
            >
              {visibleItems[index] ? (
                <div className="relative">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    loading={index < 4 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <p className="text-sm font-medium mb-1">{item.category}</p>
                      <p className="text-xs opacity-80">{item.alt}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative aspect-square bg-gray-100 animate-pulse">
                  <Image className="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
