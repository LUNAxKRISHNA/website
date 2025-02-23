
const About = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">About Us</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80"
              alt="About Us"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-6">Our Story</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We are a passionate community dedicated to fostering innovation and excellence in technology. 
              Our journey began with a simple idea: to create a space where professionals could come together, 
              share knowledge, and push the boundaries of what's possible.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Today, we continue to grow and evolve, always staying true to our core values of collaboration, 
              innovation, and continuous learning. Our members come from diverse backgrounds, bringing unique 
              perspectives and expertise to our community.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary mb-2">500+</p>
                <p className="text-sm text-gray-600">Members</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary mb-2">50+</p>
                <p className="text-sm text-gray-600">Events</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary mb-2">10+</p>
                <p className="text-sm text-gray-600">Years</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
