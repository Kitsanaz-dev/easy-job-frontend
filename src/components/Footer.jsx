import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center border-b border-gray-700 pb-6 mb-6">
          {/* Logo / Name */}
          <div className="flex justify-center md:justify-start">
            <span className="text-3xl font-extrabold text-blue-400 tracking-wide">
              EasyJob
            </span>
          </div>

          {/* Links */}
          <nav className="flex justify-center space-x-8 font-medium">
            <a href="/homepage" className="hover:text-blue-400 transition-colors duration-300">
              Home
            </a>
            <a href="/about" className="hover:text-blue-400 transition-colors duration-300">
              About
            </a>
            <a href="/jobs" className="hover:text-blue-400 transition-colors duration-300">
              Jobs
            </a>
            <a href="/contact" className="hover:text-blue-400 transition-colors duration-300">
              Contact
            </a>
          </nav>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end space-x-4 text-lg">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-500 transition-all duration-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-400 transition-all duration-300"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 transition-all duration-300"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} EasyJob. All rights reserved.</p>
          <p className="mt-3 md:mt-0">
            Made by <span className="text-blue-400">EasyJob Team</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
