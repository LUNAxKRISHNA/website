
const members = [
  {
    name: "Alex Johnson",
    role: "President",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
  },
  {
    name: "Sarah Chen",
    role: "Vice President",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
  },
  {
    name: "David Kim",
    role: "Secretary",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
  },
  {
    name: "Emily Rodriguez",
    role: "Treasurer",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
  },
];

const Execom = () => {
  return (
    <section id="execom" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Executive Committee</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member) => (
            <div
              key={member.name}
              className="group relative overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={`${member.image}?auto=format&fit=crop&w=400&h=400&q=80`}
                  alt={member.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Execom;
