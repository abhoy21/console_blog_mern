import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import Avatar from "./Avatar";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // const handleSignout = async () => {
  //   try {
  //     const res = await fetch("/user/signout", {
  //       method: "POST",
  //     });
  //     const data = await res.json();
  //     if (!res.ok) {
  //       console.log(data.message);
  //     } else {
  //       dispatch(signoutSuccess());
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const handleSignout = async () => {
    try {
      const res = await fetch("/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
      } else {
        localStorage.removeItem("access_token");
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <>
      <div className='flex items-center justify-center p-4 z-55'>
        <div className='w-full lg:w-3/4 bg-gray-300 bg-opacity-20 backdrop-blur-lg border-2 border-white flex items-center justify-between px-4 rounded-[50px]'>
          <a href='/'>
            <div className='flex items-center space-x-4'>
              <img
                src='/logo.svg'
                alt='logo'
                className='h-12 w-12 md:h-20 md:w-20'
              />
              <span className='text-xl md:text-3xl text-sky-500'>
                console.blog()
              </span>
            </div>
          </a>

          <div
            type='button'
            className='hidden md:flex flex-grow items-center mx-0 md:mx-5 px-2 md:px-5  md:py-4 border-2 border-white bg-white bg-opacity-20 backdrop-blur-lg text-black rounded-[50px] focus-within:shadow-md'
          >
            <button onClick={handleSubmit}>
              <Search className='h-10 w-10 text-sky-500' />
            </button>

            <input
              type='text'
              placeholder='Search...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSubmit(event);
                }
              }}
              className='w-[8rem] md:flex-grow px-2 md:px-5 text-sm md:text-base text-black bg-transparent outline-none'
            />
          </div>

          <div className='hidden md:flex mr-4'>
            <a
              href='/'
              className='hover:text-sky-700 hover:font-bold duration-300 ease-in-out'
            >
              Home
            </a>
            <span className='mx-4'>|</span>
            <a
              href='/about'
              className='hover:text-sky-700 hover:font-bold duration-300 ease-in-out'
            >
              About
            </a>
            <span className='mx-4'>|</span>
            <a
              href='/dashboard?tab=profile'
              className='hover:text-sky-700 hover:font-bold duration-300 ease-in-out'
            >
              Dashboard
            </a>
          </div>

          <div className='hidden md:flex'>
            {currentUser ? (
              <div>
                <Avatar />
              </div>
            ) : (
              <div className='hidden md:flex space-x-4 mr-4'>
                <a href='/sign-up'>
                  <span className='text-sky-500 border border-sky-500 py-2 px-4 rounded-xl hover:bg-sky-500 hover:text-white duration-300 ease-in-out cursor-pointer'>
                    Sign up
                  </span>
                </a>
                <a href='/sign-in'>
                  <span className='text-white bg-sky-500 py-2 px-4 rounded-xl hover:bg-transparent hover:border hover:border-sky-500 hover:text-sky-500 duration-300 ease-in-out cursor-pointer'>
                    Sign In
                  </span>
                </a>
              </div>
            )}
          </div>

          <div className='flex md:hidden relative'>
            <button className='text-sky-500 ' onClick={toggleMenu}>
              {isMenuOpen ? (
                <svg
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              ) : (
                <svg
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16m-7 6h7'
                  />
                </svg>
              )}
            </button>
            {isMenuOpen && (
              <div className='absolute top-10 -left-[75px] transform -translate-x-1/2 min-w-[80vw] w-full bg-gray-300 backdrop-blur-lg rounded-xl mt-2 p-8 shadow-md !z-50'>
                <ul className='space-y-4 flex flex-col items-center justify-center'>
                  <li>
                    <a
                      href='/'
                      className='block text-gray-800 hover:text-sky-500'
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href='/about'
                      className='block text-gray-800 hover:text-sky-500'
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href='/dashboard?tab=profile'
                      className='hover:text-sky-700 hover:font-bold duration-300 ease-in-out'
                    >
                      Dashboard
                    </a>
                  </li>
                </ul>
                <hr className='border-gray-800 my-4' />
                {currentUser ? (
                  <a
                    onClick={handleSignout}
                    href='#'
                    className='flex items-center justify-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600'
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
                ) : (
                  <div className='flex justify-end mt-6'>
                    <a href='/sign-up'>
                      <button className='text-sky-500 border border-sky-500 px-4 py-2 rounded-lg mr-2 hover:bg-sky-500 hover:text-white'>
                        Sign up
                      </button>
                    </a>
                    <a href='/sign-in'>
                      <button className='bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-transparent hover:border hover:border-sky-500'>
                        Sign In
                      </button>
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='flex items-center space-x-2 md:hidden mx-4 !-z-50'>
        {currentUser && currentUser.photo ? ( // Added conditional check
          <div className='w-12 h-12 rounded-full overflow-hidden border-2 border-sky-500'>
            <img
              src={currentUser.photo}
              alt='avatar'
              className='w-full h-full object-cover'
            />
          </div>
        ) : null}
        <div className='flex flex-grow md:hidden items-center mx-2 py-2 border-b-2 border-gray-300 bg-white bg-opacity-20 backdrop-blur-lg text-[#f8f9fa] rounded-xl focus-within:shadow-md !-z-[1]'>
          <Search className='h-6 w-6 mx-2 text-sky-500' />
          <input
            type='text'
            placeholder='Search...'
            className='w-[8rem] md:flex-grow px-2 md:px-5 text-sm md:text-base text-black bg-transparent outline-none'
          />
        </div>
      </div>
    </>
  );
}
