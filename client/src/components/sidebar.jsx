import React from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';

const menuItems = [
  {
    name: 'Home',
    path: '/',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    ),
  },
  {
    name: 'Course',
    path: '/course',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
      </svg>
    ),
  },
  {
    name: 'Students',
    path: '/students',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
      </svg>
    ),
  },
  {
    name: 'Payment',
    path: '/payment',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
        <path
          fillRule="evenodd"
          d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h3a1 1 0 100-2H9z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: 'Reports',
    path: '/reports',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: 'Logout',
    path: '/logout',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

const Sidebar = () => {
  const location = useLocation();
const navigate = useNavigate();
  const handleLogout = () => {
    console.log("Logout called")
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="bg-[#F2EAE1] text-gray-800 w-64 h-screen p-3 fixed left-0 top-0 flex flex-col items-center">
      <h1 className="text-xl font-bold mb-4">CRUD Operations</h1>
      <img
        src="https://res.cloudinary.com/dzxhn37ae/image/upload/v1714806657/3f23b586-6630-4042-a810-52877b406d0f.jpg"
        alt="Profile"
        className="rounded-full w-40 h-40 mb-2"
      />
      <h2 className="text-lg font-bold mb-1">Mayank Yadav</h2>
      <p className="text-sm mb-4 font-semibold">Admin</p>
      <div className="w-full">
      <ul className="space-y-2 text-sm font-medium">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.name === 'Logout' ? (
                <button
                  onClick={handleLogout}
                  className={`flex items-center p-4 rounded-md  ${
                    location.pathname === item.path
                      ? 'bg-yellow-500 text-black'
                      : 'hover:bg-yellow-400 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </button>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center p-4 rounded-md ${
                    location.pathname === item.path
                      ? 'bg-yellow-500 text-black'
                      : 'hover:bg-yellow-400 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;