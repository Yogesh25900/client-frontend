import React, { useState } from 'react';
import './Dashboard.css';

const  Sidebar = () => {
  // State to manage which dropdown is open
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index); // Toggle dropdown open/close
  };

  return (
    <div>
      <nav className="bg-gray 900 shadow-lg h-screen fixed top-0 left-0 min-w-[250px] py-6 px-4 font-[sans-serif] overflow-auto">
        <ul className="mt-8">
          <li>
            <a href="javascript:void(0)"
              className="text-white-600 hover:text-black transition-all text-sm flex items-center hover:bg-[#efefef] rounded-md px-4 py-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-[18px] h-[18px] mr-4"
                viewBox="0 0 512 512">
                <path d="M197.332 170.668h-160C16.746 170.668 0 153.922 0 133.332v-96C0 16.746 16.746 0 37.332 0h160c20.59 0 37.336 16.746 37.336 37.332v96c0 20.59-16.746 37.336-37.336 37.336zM37.332 32A5.336 5.336 0 0 0 32 37.332v96a5.337 5.337 0 0 0 5.332 5.336h160a5.338 5.338 0 0 0 5.336-5.336v-96A5.337 5.337 0 0 0 197.332 32zm160 480h-160C16.746 512 0 495.254 0 474.668v-224c0-20.59 16.746-37.336 37.332-37.336h160c20.59 0 37.336 16.746 37.336 37.336v224c0 20.586-16.746 37.332-37.336 37.332zm-160-266.668A5.337 5.337 0 0 0 32 250.668v224A5.336 5.336 0 0 0 37.332 480h160a5.337 5.337 0 0 0 5.336-5.332v-224a5.338 5.338 0 0 0-5.336-5.336zM474.668 512h-160c-20.59 0-37.336-16.746-37.336-37.332v-96c0-20.59 16.746-37.336 37.336-37.336h160c20.586 0 37.332 16.746 37.332 37.336v96C512 495.254 495.254 512 474.668 512zm-160-138.668a5.338 5.338 0 0 0-5.336 5.336v96a5.337 5.337 0 0 0 5.336 5.332h160a5.337 5.337 0 0 0 5.332-5.332v-96a5.337 5.337 0 0 0-5.332-5.336zm160-74.664h-160c-20.59 0-37.336-16.746-37.336-37.336v-224C277.332 16.746 294.078 0 314.668 0h160C495.254 0 512 16.746 512 37.332v224c0 20.59-16.746 37.336-37.332 37.336zM314.668 32a5.337 5.337 0 0 0-5.336 5.332v224a5.338 5.338 0 0 0 5.336 5.336h160a5.337 5.337 0 0 0 5.332-5.336v-224A5.336 5.336 0 0 0 474.668 32zm0 0"
                  data-original="#000000" />
              </svg>
              <span>Dashboard</span>
            </a>
          </li>
        </ul>

        {/* Dropdowns Section */}
        <div className="mt-6">
  <div
    className="flex cursor-pointer group"
    onClick={() => toggleDropdown(1)}
  >
    <h6 className="text-white-900 group-hover:text-white text-sm font-bold px-4 flex-1 mt-6 flex items-center">
    Information
    </h6>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-3 fill-grey-100 group-hover:fill-white mt-6 transition-transform duration-300 ${
        openDropdown === 1 ? "rotate-180" : ""
      }`}
      viewBox="0 0 451.847 451.847"
    >
      <path
        d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z"
        data-original="#000000"
      />
    </svg>
  </div>

  <div
    className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
      openDropdown === 1 ? "max-h-40" : "max-h-0"
    }`}
  >
    <ul className="space-y-1 mt-2 pl-4">
      <li className="text-white-600 hover:text-black transition-all text-sm flex items-center hover:bg-[#efefef] rounded-md px-4 py-3">
        Audience
      </li>
      <li className="text-white-500 hover:text-black transition-all text-sm flex items-center hover:bg-[#efefef] rounded-md px-4 py-3">
        Posts
      </li>
      <li className="text-white-500 hover:text-black transition-all text-sm flex items-center hover:bg-[#efefef] rounded-md px-4 py-3">
        Schedules
      </li>
    </ul>
  </div>

  <div className="flex cursor-pointer group" onClick={() => toggleDropdown(2)}>
    <h6 className="text-white-900 group-hover:text-white text-sm font-bold px-4 flex-1 mt-6 flex items-center">
      Tasks
    </h6>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-3 fill-grey group-hover:fill-white mt-6 transition-transform duration-300 ${
        openDropdown === 2 ? "rotate-180" : ""
      }`}
      viewBox="0 0 451.847 451.847"
    >
      <path
        d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z"
        data-original="#000000"
      />
    </svg>
  </div>

  <div
    className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
      openDropdown === 2 ? "max-h-40" : "max-h-0"
    }`}
  >
    <ul className="space-y-1 mt-2 pl-4">
      <li className="text-white hover:text-black transition-all text-sm flex items-center hover:bg-[#efefef] rounded-md px-4 py-3">
        View Tasks
      </li>
      <li className="text-white hover:text-black transition-all text-sm flex items-center hover:bg-[#efefef] rounded-md px-4 py-3">
        Add Task
      </li>
      <li className="text-white hover:text-black transition-all text-sm flex items-center hover:bg-[#efefef] rounded-md px-4 py-3">
        Edit Task
      </li>
    </ul>
  </div>
</div>

      </nav>
    </div>
  );
}

export default Sidebar;
