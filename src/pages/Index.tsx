
import Navigation from "@/components/Navigation";
import ImageSlider from "@/components/ImageSlider";
import Gallery from "@/components/Gallery";
import Events from "@/components/Events";
import Execom from "@/components/Execom";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <section id="home">
        <ImageSlider />
      </section>
      <Gallery />
      <Events />
      <Execom />
      <About />
      <Footer />
    </div>
  );
};

export default Index;
