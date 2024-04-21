import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";

export default function Avatar() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const handleSignout = async () => {
    try {
      const res = await fetch("/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className='flex justify-center items-center'>
        <div className='w-64 flex justify-center items-center'>
          <div
            onClick={() => setOpen(!open)}
            className={`relative border-b-4 border-transparent py-3 ${
              open ? "border-indigo-700 transform transition duration-300" : ""
            }`}
            data-transition-enter-end='transform opacity-100 scale-100'
            data-transition-leave='transition ease-in duration-75'
            data-transition-leave-start='transform opacity-100 scale-100'
          >
            <div className='flex justify-center items-center space-x-3 cursor-pointer'>
              <div className='w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden border-2  border-sky-500'>
                <img
                  src={currentUser.photo}
                  alt='avatar'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='font-semibold text-sky-500 text-lg'>
                <div className='cursor-pointer'>{currentUser.username}</div>
              </div>
            </div>
            {open && (
              <div
                className='absolute top-20 right-0 w-60 px-5 py-3 bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded-lg shadow border mt-5'
                data-transition-enter='transition ease-out duration-100'
                data-transition-enter-start='transform opacity-0 scale-95'
                data-transition-enter-end='transform opacity-100 scale-100'
                data-transition-leave='transition ease-in duration-75'
                data-transition-leave-start='transform opacity-100 scale-100'
                data-transition-leave-end='transform opacity-0 scale-95'
              >
                <ul className='space-y-3 text-black'>
                  <li className='font-semibold text-lg'>{currentUser.email}</li>
                  <hr className='border-gray-300' />
                  <li className='font-medium'>
                    <a
                      href='/dashboard?tab=profile'
                      className='flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700'
                    >
                      <div className='mr-3'>
                        <svg
                          className='w-6 h-6'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                          ></path>
                        </svg>
                      </div>
                      Account
                    </a>
                  </li>
                  <li className='font-medium'>
                    <a
                      href='#'
                      className='flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700'
                    >
                      <div className='mr-3'>
                        <svg
                          className='w-6 h-6'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                          ></path>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                          ></path>
                        </svg>
                      </div>
                      Setting
                    </a>
                  </li>
                  <hr className='border-gray-300' />
                  <li className='font-medium'>
                    <a
                      onClick={handleSignout}
                      href='#'
                      className='flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600'
                    >
                      <div className='mr-3 text-red-600'>
                        <svg
                          className='w-6 h-6'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                          ></path>
                        </svg>
                      </div>
                      Sign Out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
