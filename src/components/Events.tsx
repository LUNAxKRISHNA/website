
const events = [
  {
    title: "Annual Conference 2024",
    date: "June 15-17, 2024",
    description: "Join us for our flagship event featuring industry leaders and innovative discussions.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
  },
  {
    title: "Tech Workshop Series",
    date: "Monthly",
    description: "Hands-on workshops covering the latest technologies and best practices.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
  },
  {
    title: "Innovation Summit",
    date: "September 5, 2024",
    description: "A day-long summit focused on emerging technologies and future trends.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
  },
];

const Events = () => {
  return (
    <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.title}
              className="group relative overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={`${event.image}?auto=format&fit=crop&w=800&q=80`}
                  alt={event.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-primary font-medium mb-3">{event.date}</p>
                <p className="text-gray-600">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
