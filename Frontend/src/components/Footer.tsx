import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Line 1: Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} skilln. All rights reserved.
            </p>
          </div>

          {/* Line 2: Privacy, Terms, Contact */}
          <div className="flex justify-center md:justify-start space-x-6">
            <Link
              to="/privacy-policy"
              className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
            >
              Terms of Service
            </Link>
            <Link
              to="/contact"
              className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
            >
              Contact
            </Link>
          </div>

          {/* Line 3: Social Icons */}
          <div className="flex justify-center md:justify-start space-x-4">
            {/* GitHub */}
            <a
              href="https://github.com/ravikant-diwakar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 0C5.372 0 0 5.373 0 12a12 12 0 008.205 11.387c.6.113.82-.258.82-.577v-2.18c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.729.083-.729 1.205.086 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.42-1.305.762-1.605-2.665-.304-5.467-1.334-5.467-5.933 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 016 0c2.29-1.552 3.296-1.23 3.296-1.23.654 1.652.243 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.626-5.48 5.922.431.372.816 1.103.816 2.222v3.293c0 .322.218.694.825.576A12.004 12.004 0 0024 12c0-6.627-5.373-12-12-12z"
                />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/ravikantdiwakar/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zM8 8h3.6v2.6h.1c.5-1 1.75-2 3.6-2 3.9 0 4.6 2.6 4.6 6V24h-4v-7.2c0-1.7-.03-3.9-2.4-3.9s-2.8 1.9-2.8 3.8V24h-4V8z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
