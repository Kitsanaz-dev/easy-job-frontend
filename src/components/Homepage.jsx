export default function Homepage() {
  return (
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
  );
}
