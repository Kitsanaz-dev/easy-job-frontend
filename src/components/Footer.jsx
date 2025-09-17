export default function Footer() {
    return (
      <footer className="bg-gray-900 text-gray-200 py-8 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top section */}
          <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-6 mb-6">
            {/* Logo / Name */}
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-2xl font-bold text-blue-400">EasyJob</span>
            </div>
  
            {/* Links */}
            <div className="flex space-x-6">
              <a href="/" className="hover:text-blue-400 transition">
                Home
              </a>
              <a href="/about" className="hover:text-blue-400 transition">
                About
              </a>
              <a href="/jobs" className="hover:text-blue-400 transition">
                Jobs
              </a>
              <a href="/contact" className="hover:text-blue-400 transition">
                Contact
              </a>
            </div>
          </div>
  
          {/* Bottom section */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © {new Date().getFullYear()} EasyJob. All rights reserved.
            </p>
  
            {/* Social Icons */}
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-400">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-400">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-400">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  