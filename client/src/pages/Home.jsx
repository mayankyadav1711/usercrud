import React from 'react';
import Sidebar from '../components/sidebar';

export const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 ml-64">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-500 text-white rounded p-4 flex items-center">
            <span className="material-icons mr-2">school</span>
            <div>
              <h2 className="text-xl font-semibold">243</h2>
              <p className="text-sm">Students</p>
            </div>
          </div>
          <div className="bg-pink-500 text-white rounded p-4 flex items-center">
            <span className="material-icons mr-2">menu_book</span>
            <div>
              <h2 className="text-xl font-semibold">13</h2>
              <p className="text-sm">Course</p>
            </div>
          </div>
          <div className="bg-yellow-500 text-white rounded p-4 flex items-center">
            <span className="material-icons mr-2">attach_money</span>
            <div>
              <h2 className="text-xl font-semibold">INR 556,000</h2>
              <p className="text-sm">Payments</p>
            </div>
          </div>
          <div className="bg-orange-500 text-white rounded p-4 flex items-center">
            <span className="material-icons mr-2">person</span>
            <div>
              <h2 className="text-xl font-semibold">3</h2>
              <p className="text-sm">Users</p>
            </div>
          </div>
        </div>
        {/* Add more content sections here */}
      </div>
    </div>
  );
};