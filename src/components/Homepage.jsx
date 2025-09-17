import Chi from "../assets/chi.jpg";

export default function Homepage() {
  return (
    <div className="w-full">
      <div className="relative w-full">
        {/* background image */}
        <img
          src="/jobfinding.png"
          alt="jobfinding picture"
          className="w-full h-[500px] object-cover opacity-80"
        />

        {/* overlay content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl font-bold text-black mb-4">
            Let's find the job
          </h1>
          <p className="text-lg text-black max-w-2xl mb-6">
            Don’t just search—discover your dream job.
          </p>
          <button
            className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg 
          transform transition duration-200 
           hover:bg-blue-600 hover:scale-105"
          >
            Get the post
          </button>
        </div>
      </div>

      {/* About us section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">About Us</h2>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
            At EasyJob, we are dedicated to connecting job seekers with their
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* Member 1 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow flex flex-col items-center text-center 
                transform transition-all duration-300 hover:scale-103 hover:shadow-xl">
              <img
                src={Chi}
                alt="Chi"
                className="w-32 h-32 rounded-full object-cover mb-4 shadow-md 
               transition-transform duration-500 hover:rotate-3 hover:scale-110"
              />
              <h3 className="text-2xl font-semibold mb-2">Sommany Suvannalath</h3>
              <p className="text-gray-600">Frontend Developer</p>
            </div>
            {/* Member 2 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow flex flex-col items-center text-center 
                transform transition-all duration-300 hover:scale-103 hover:shadow-xl">
              <img
                src={Chi}
                alt="Chi"
                className="w-32 h-32 rounded-full object-cover mb-4 shadow-md 
               transition-transform duration-500 hover:rotate-3 hover:scale-110"
              />
              <h3 className="text-2xl font-semibold mb-2">Sommany Suvannalath</h3>
              <p className="text-gray-600">Frontend Developer</p>
            </div>
            {/* Member 3 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow flex flex-col items-center text-center 
                transform transition-all duration-300 hover:scale-103 hover:shadow-xl">
              <img
                src={Chi}
                alt="Chi"
                className="w-32 h-32 rounded-full object-cover mb-4 shadow-md 
               transition-transform duration-500 hover:rotate-3 hover:scale-110"
              />
              <h3 className="text-2xl font-semibold mb-2">Sommany Suvannalath</h3>
              <p className="text-gray-600">Frontend Developer</p>
            </div>
            {/* Member 4 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow flex flex-col items-center text-center 
                transform transition-all duration-300 hover:scale-103 hover:shadow-xl">
              <img
                src={Chi}
                alt="Chi"
                className="w-32 h-32 rounded-full object-cover mb-4 shadow-md 
               transition-transform duration-500 hover:rotate-3 hover:scale-110"
              />
              <h3 className="text-2xl font-semibold mb-2">Sommany Suvannalath</h3>
              <p className="text-gray-600">Frontend Developer</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
