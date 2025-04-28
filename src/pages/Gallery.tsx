
import React, { useState, useEffect, useRef } from "react";
import { Image, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const [layout, setLayout] = useState<"grid" | "mosaic" | "cascade">("mosaic");
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

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
      setVisibleItems(Array(loadedImages.length).fill(false));
    };

    loadImages();
    
    // Show initial reveal animation
    setTimeout(() => {
      setIsRevealed(true);
    }, 300);
  }, []);

  useEffect(() => {
    if (!galleryRef.current) return;

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Start revealing images as they enter viewport
            animateVisibleImages();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(galleryRef.current);
    return () => observer.disconnect();
  }, [galleryItems]);
  
  // Function to animate images with staggered effect
  const animateVisibleImages = () => {
    galleryItems.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => {
          const newVisible = [...prev];
          newVisible[index] = true;
          return newVisible;
        });
      }, index * 100); // Stagger the animations
    });
  };

  // Handle scroll animations for scroll-triggered reveals
  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight * 0.8;
    const items = document.querySelectorAll('.gallery-item');
    
    items.forEach((item) => {
      const itemTop = (item as HTMLElement).offsetTop;
      if (scrollPosition > itemTop) {
        item.classList.add('show');
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const categories = ["All", ...new Set(galleryItems.map(item => item.category))];
  const filteredItems = selectedCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const getLayoutClass = () => {
    switch(layout) {
      case "grid":
        return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4";
      case "mosaic":
        return "columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4";
      case "cascade":
        return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-max gap-4";
      default:
        return "columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4";
    }
  };

  return (
    <motion.div 
      className="min-h-screen py-16 mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="container mx-auto px-4" 
        ref={galleryRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Our Gallery
          </motion.h1>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Explore our collection of memorable moments and achievements
          </motion.p>
          
          <div className="mb-6 flex justify-center space-x-4">
            {["grid", "mosaic", "cascade"].map((layoutOption) => (
              <button
                key={layoutOption}
                onClick={() => setLayout(layoutOption as "grid" | "mosaic" | "cascade")}
                className={`px-3 py-1 rounded-md text-xs transition-all duration-200 ${
                  layout === layoutOption
                    ? "bg-primary text-white"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                {layoutOption.charAt(0).toUpperCase() + layoutOption.slice(1)}
              </button>
            ))}
          </div>
          
          <ScrollArea className="max-h-16 overflow-x-auto mb-8">
            <motion.div 
              className="flex flex-wrap justify-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-primary text-white shadow-lg scale-105"
                      : "bg-accent hover:bg-accent/80"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          </ScrollArea>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex justify-center mb-8"
          >
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-muted-foreground"
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>

        {/* Gallery Layout */}
        <div className={getLayoutClass()}>
          {filteredItems.map((item, index) => (
            <motion.div
              key={index}
              className={`gallery-item break-inside-avoid group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 opacity-0`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: visibleItems[index] ? 1 : 0,
                y: visibleItems[index] ? 0 : 20,
              }}
              transition={{
                duration: 0.5,
                delay: index % 5 * 0.1, // Staggered animation based on column position
              }}
              style={{
                transformOrigin: index % 2 === 0 ? "left" : "right",
              }}
            >
              {visibleItems[index] ? (
                <div className="relative">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className={`w-full object-cover transform transition-transform duration-500 group-hover:scale-105 ${
                      layout === "cascade" ? "aspect-[" + (0.8 + (index % 3) * 0.3) + "]" : ""
                    }`}
                    loading={index < 8 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
                    <div className="p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-sm font-medium mb-1">{item.category}</p>
                      <p className="text-xs opacity-80">{item.alt}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`relative bg-gray-100 animate-pulse ${
                  layout === "cascade" ? "aspect-[" + (0.8 + (index % 3) * 0.3) + "]" : "aspect-square"
                }`}>
                  <Image className="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-300" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-muted-foreground">No images found in this category</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Gallery;
