import Chi from "../assets/chi.jpg";

const team = [
  {
    name: "Sommany Suvannalath",
    role: "Frontend Developer",
    img: Chi,
  },
  {
    name: "Phonesavanh Sounakhen",
    role: "Backend Developer",
    img: Chi,
  },
  {
    name: "Chanthone Phimmasone",
    role: "UI/UX Designer",
    img: Chi,
  },
  {
    name: "Souphaphone Vongxay",
    role: "Project Manager",
    img: Chi,
  },
];

export default function Aboutus() {
  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">About Us</h2>
        <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
          At EasyJob, we are dedicated to connecting job seekers with their
          dream opportunities and helping companies find the right talent.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow flex flex-col items-center text-center 
              transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover mb-4 shadow-md 
               transition-transform duration-500 hover:rotate-3 hover:scale-110"
              />
              <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
