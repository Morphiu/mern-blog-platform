import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiHome, FiEdit, FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-primary-600">Blog Platform</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center text-gray-700 hover:text-primary-600">
              <FiHome className="mr-1" />
              Home
            </Link>
            
            {user ? (
              <>
                <Link to="/create" className="flex items-center text-gray-700 hover:text-primary-600">
                  <FiEdit className="mr-1" />
                  New Post
                </Link>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center text-gray-700 hover:text-red-600"
                >
                  <FiLogOut className="mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 