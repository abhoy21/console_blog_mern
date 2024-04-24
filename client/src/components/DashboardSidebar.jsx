import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";

export default function DashboardSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [tab, settab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      settab(tabFromUrl);
      console.log(tabFromUrl);
    }
  }, [location.search]);

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

  const handleSignout = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
    dispatch(signoutSuccess());
  };

  return (
    <div className=''>
      <div className='flex flex-col items-center justify-center bg-clip-border border-2 border-white rounded-[100px] bg-gray-100 bg-opacity-20 backdrop-blur-lg text-gray-700 max-h-[10vh] md:max-h-[100vh] md:min-h-[calc(100vh-50rem)] w-full md:max-w-[10rem] p-4 shadow-md shadow-gray-200'>
        <nav className='flex flex-row md:flex-col gap-1  p-2 font-sans text-base font-normal text-gray-700'>
          <a href='/dashboard?tab=profile'>
            <div
              role='button'
              tabIndex={0}
              className='flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:rounded-full hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none'
            >
              <div
                className={`grid place-items-center p-2 rounded-full ${
                  tab === "profile" ? "bg-sky-500" : "bg-sky-100"
                }`}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill={tab === "profile" ? "white" : "currentColor"}
                  aria-hidden='true'
                  className='h-6 w-6 md:h-12 md:w-12 text-sky-500'
                >
                  <path
                    fillRule='evenodd'
                    d='M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            </div>
          </a>
          {/* admin user show posts */}

          <a href='/dashboard?tab=posts'>
            <div
              role='button'
              tabIndex={0}
              className='flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:rounded-full hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none'
            >
              <div
                className={`grid place-items-center p-2 rounded-full ${
                  tab === "posts" ? "bg-sky-500" : "bg-sky-100"
                }`}
              >
                <svg
                  className='h-6 w-6 md:h-12 md:w-12 text-sky-500'
                  fill={tab === "posts" ? "white" : "currentColor"}
                  viewBox='-4 -2 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  preserveAspectRatio='xMinYMin'
                >
                  <path d='M3 0h10a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3zm0 2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3zm2 1h6a1 1 0 0 1 0 2H5a1 1 0 1 1 0-2zm0 12h2a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2zm0-4h6a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2zm0-4h6a1 1 0 0 1 0 2H5a1 1 0 1 1 0-2z' />
                </svg>
              </div>
            </div>
          </a>

          {/*  user show comments */}
          {currentUser.isAdmin && (
            <>
              <a href='/dashboard?tab=comments'>
                <div
                  role='button'
                  tabIndex={0}
                  className='flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:rounded-full hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none'
                >
                  <div
                    className={`grid place-items-center p-2 rounded-full ${
                      tab === "comments" ? "bg-sky-500" : "bg-sky-100"
                    }`}
                  >
                    <svg
                      className='h-6 w-6 md:h-12 md:w-12 text-sky-500'
                      fill={tab === "comments" ? "white" : "currentColor"}
                      version='1.1'
                      id='Layer_1'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 32 32'
                    >
                      <polygon
                        fill='none'
                        stroke={tab === "comments" ? "white" : "currentColor"}
                        strokeWidth='2'
                        strokeMiterlimit='10'
                        points='4,7 4,25 13,25 16,28 19,25 28,25 28,7 '
                      />
                      <line
                        fill='none'
                        stroke={tab === "comments" ? "white" : "currentColor"}
                        strokeWidth='2'
                        strokeMiterlimit='10'
                        x1='9'
                        y1='12'
                        x2='23'
                        y2='12'
                      />
                      <line
                        fill='none'
                        stroke={tab === "comments" ? "white" : "currentColor"}
                        strokeWidth='2'
                        strokeMiterlimit='10'
                        x1='9'
                        y1='16'
                        x2='23'
                        y2='16'
                      />
                      <line
                        fill='none'
                        stroke={tab === "comments" ? "white" : "currentColor"}
                        strokeWidth='2'
                        strokeMiterlimit='10'
                        x1='9'
                        y1='20'
                        x2='19'
                        y2='20'
                      />
                    </svg>
                  </div>
                </div>
              </a>
            </>
          )}

          {/* admin user show users */}
          {currentUser.isAdmin && (
            <>
              <a href='/dashboard?tab=users'>
                <div
                  role='button'
                  tabIndex={0}
                  className='flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:rounded-full hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none'
                >
                  <div
                    className={`grid place-items-center p-2 rounded-full ${
                      tab === "users" ? "bg-sky-500" : "bg-sky-100"
                    }`}
                  >
                    <svg
                      className='h-6 w-6 md:h-12 md:w-12 text-sky-500'
                      fill={tab === "users" ? "white" : "currentColor"}
                      viewBox='0 0 256 256'
                      id='Flat'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M140,80a12.00028,12.00028,0,0,1,12-12h92a12,12,0,0,1,0,24H152A12.00028,12.00028,0,0,1,140,80Zm104,36H152a12,12,0,0,0,0,24h92a12,12,0,0,0,0-24Zm0,48H176a12,12,0,0,0,0,24h68a12,12,0,0,0,0-24Zm-90.395,25.00879a11.99988,11.99988,0,1,1-23.24219,5.98242,52.021,52.021,0,0,0-100.72558,0A11.99988,11.99988,0,0,1,6.395,189.00879a75.86592,75.86592,0,0,1,37.32275-47.80811,52,52,0,1,1,72.56446,0A75.86592,75.86592,0,0,1,153.605,189.00879ZM80,132a28,28,0,1,0-28-28A28.03146,28.03146,0,0,0,80,132Z' />
                    </svg>
                  </div>
                </div>
              </a>

              {/*  user show comments */}

              <a href='/dashboard?tab=dash'>
                <div
                  role='button'
                  tabIndex={0}
                  className='flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:rounded-full hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none'
                >
                  <div
                    className={`grid place-items-center p-2 rounded-full ${
                      tab === "dash" ? "bg-sky-500" : "bg-sky-100"
                    }`}
                  >
                    <svg
                      className='h-6 w-6 md:h-12 md:w-12 text-sky-500'
                      fill={tab === "dash" ? "white" : "currentColor"}
                      viewBox='0 0 15 15'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M2.8 1L2.74967 0.99997C2.52122 0.999752 2.32429 0.999564 2.14983 1.04145C1.60136 1.17312 1.17312 1.60136 1.04145 2.14983C0.999564 2.32429 0.999752 2.52122 0.99997 2.74967L1 2.8V5.2L0.99997 5.25033C0.999752 5.47878 0.999564 5.67572 1.04145 5.85017C1.17312 6.39864 1.60136 6.82688 2.14983 6.95856C2.32429 7.00044 2.52122 7.00025 2.74967 7.00003L2.8 7H5.2L5.25033 7.00003C5.47878 7.00025 5.67572 7.00044 5.85017 6.95856C6.39864 6.82688 6.82688 6.39864 6.95856 5.85017C7.00044 5.67572 7.00025 5.47878 7.00003 5.25033L7 5.2V2.8L7.00003 2.74967C7.00025 2.52122 7.00044 2.32429 6.95856 2.14983C6.82688 1.60136 6.39864 1.17312 5.85017 1.04145C5.67572 0.999564 5.47878 0.999752 5.25033 0.99997L5.2 1H2.8ZM2.38328 2.01382C2.42632 2.00348 2.49222 2 2.8 2H5.2C5.50779 2 5.57369 2.00348 5.61672 2.01382C5.79955 2.05771 5.94229 2.20045 5.98619 2.38328C5.99652 2.42632 6 2.49222 6 2.8V5.2C6 5.50779 5.99652 5.57369 5.98619 5.61672C5.94229 5.79955 5.79955 5.94229 5.61672 5.98619C5.57369 5.99652 5.50779 6 5.2 6H2.8C2.49222 6 2.42632 5.99652 2.38328 5.98619C2.20045 5.94229 2.05771 5.79955 2.01382 5.61672C2.00348 5.57369 2 5.50779 2 5.2V2.8C2 2.49222 2.00348 2.42632 2.01382 2.38328C2.05771 2.20045 2.20045 2.05771 2.38328 2.01382ZM9.8 1L9.74967 0.99997C9.52122 0.999752 9.32429 0.999564 9.14983 1.04145C8.60136 1.17312 8.17312 1.60136 8.04145 2.14983C7.99956 2.32429 7.99975 2.52122 7.99997 2.74967L8 2.8V5.2L7.99997 5.25033C7.99975 5.47878 7.99956 5.67572 8.04145 5.85017C8.17312 6.39864 8.60136 6.82688 9.14983 6.95856C9.32429 7.00044 9.52122 7.00025 9.74967 7.00003L9.8 7H12.2L12.2503 7.00003C12.4788 7.00025 12.6757 7.00044 12.8502 6.95856C13.3986 6.82688 13.8269 6.39864 13.9586 5.85017C14.0004 5.67572 14.0003 5.47878 14 5.25033L14 5.2V2.8L14 2.74967C14.0003 2.52122 14.0004 2.32429 13.9586 2.14983C13.8269 1.60136 13.3986 1.17312 12.8502 1.04145C12.6757 0.999564 12.4788 0.999752 12.2503 0.99997L12.2 1H9.8ZM9.38328 2.01382C9.42632 2.00348 9.49222 2 9.8 2H12.2C12.5078 2 12.5737 2.00348 12.6167 2.01382C12.7995 2.05771 12.9423 2.20045 12.9862 2.38328C12.9965 2.42632 13 2.49222 13 2.8V5.2C13 5.50779 12.9965 5.57369 12.9862 5.61672C12.9423 5.79955 12.7995 5.94229 12.6167 5.98619C12.5737 5.99652 12.5078 6 12.2 6H9.8C9.49222 6 9.42632 5.99652 9.38328 5.98619C9.20045 5.94229 9.05771 5.79955 9.01382 5.61672C9.00348 5.57369 9 5.50779 9 5.2V2.8C9 2.49222 9.00348 2.42632 9.01382 2.38328C9.05771 2.20045 9.20045 2.05771 9.38328 2.01382ZM2.74967 7.99997L2.8 8H5.2L5.25033 7.99997C5.47878 7.99975 5.67572 7.99956 5.85017 8.04145C6.39864 8.17312 6.82688 8.60136 6.95856 9.14983C7.00044 9.32429 7.00025 9.52122 7.00003 9.74967L7 9.8V12.2L7.00003 12.2503C7.00025 12.4788 7.00044 12.6757 6.95856 12.8502C6.82688 13.3986 6.39864 13.8269 5.85017 13.9586C5.67572 14.0004 5.47878 14.0003 5.25033 14L5.2 14H2.8L2.74967 14C2.52122 14.0003 2.32429 14.0004 2.14983 13.9586C1.60136 13.8269 1.17312 13.3986 1.04145 12.8502C0.999564 12.6757 0.999752 12.4788 0.99997 12.2503L1 12.2V9.8L0.99997 9.74967C0.999752 9.52122 0.999564 9.32429 1.04145 9.14983C1.17312 8.60136 1.60136 8.17312 2.14983 8.04145C2.32429 7.99956 2.52122 7.99975 2.74967 7.99997ZM2.8 9C2.49222 9 2.42632 9.00348 2.38328 9.01382C2.20045 9.05771 2.05771 9.20045 2.01382 9.38328C2.00348 9.42632 2 9.49222 2 9.8V12.2C2 12.5078 2.00348 12.5737 2.01382 12.6167C2.05771 12.7995 2.20045 12.9423 2.38328 12.9862C2.42632 12.9965 2.49222 13 2.8 13H5.2C5.50779 13 5.57369 12.9965 5.61672 12.9862C5.79955 12.9423 5.94229 12.7995 5.98619 12.6167C5.99652 12.5737 6 12.5078 6 12.2V9.8C6 9.49222 5.99652 9.42632 5.98619 9.38328C5.94229 9.20045 5.79955 9.05771 5.61672 9.01382C5.57369 9.00348 5.50779 9 5.2 9H2.8ZM9.8 8L9.74967 7.99997C9.52122 7.99975 9.32429 7.99956 9.14983 8.04145C8.60136 8.17312 8.17312 8.60136 8.04145 9.14983C7.99956 9.32429 7.99975 9.52122 7.99997 9.74967L8 9.8V12.2L7.99997 12.2503C7.99975 12.4788 7.99956 12.6757 8.04145 12.8502C8.17312 13.3986 8.60136 13.8269 9.14983 13.9586C9.32429 14.0004 9.52122 14.0003 9.74967 14L9.8 14H12.2L12.2503 14C12.4788 14.0003 12.6757 14.0004 12.8502 13.9586C13.3986 13.8269 13.8269 13.3986 13.9586 12.8502C14.0004 12.6757 14.0003 12.4788 14 12.2503L14 12.2V9.8L14 9.74967C14.0003 9.52122 14.0004 9.32429 13.9586 9.14983C13.8269 8.60136 13.3986 8.17312 12.8502 8.04145C12.6757 7.99956 12.4788 7.99975 12.2503 7.99997L12.2 8H9.8ZM9.38328 9.01382C9.42632 9.00348 9.49222 9 9.8 9H12.2C12.5078 9 12.5737 9.00348 12.6167 9.01382C12.7995 9.05771 12.9423 9.20045 12.9862 9.38328C12.9965 9.42632 13 9.49222 13 9.8V12.2C13 12.5078 12.9965 12.5737 12.9862 12.6167C12.9423 12.7995 12.7995 12.9423 12.6167 12.9862C12.5737 12.9965 12.5078 13 12.2 13H9.8C9.49222 13 9.42632 12.9965 9.38328 12.9862C9.20045 12.9423 9.05771 12.7995 9.01382 12.6167C9.00348 12.5737 9 12.5078 9 12.2V9.8C9 9.49222 9.00348 9.42632 9.01382 9.38328C9.05771 9.20045 9.20045 9.05771 9.38328 9.01382Z'
                      />
                    </svg>
                  </div>
                </div>
              </a>
            </>
          )}

          <div
            role='button'
            onClick={handleSignout}
            tabIndex={0}
            className='flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:rounded-full hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none'
          >
            <div className='grid place-items-center p-2 bg-sky-100 rounded-full'>
              <svg
                viewBox='0 0 24 24'
                fill='currentColor'
                aria-hidden='true'
                className='h-6 w-6 md:h-12 md:w-12 text-red-500'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M21.593 10.943c.584.585.584 1.53 0 2.116L18.71 15.95c-.39.39-1.03.39-1.42 0a.996.996 0 0 1 0-1.41 9.552 9.552 0 0 1 1.689-1.345l.387-.242-.207-.206a10 10 0 0 1-2.24.254H8.998a1 1 0 1 1 0-2h7.921a10 10 0 0 1 2.24.254l.207-.206-.386-.241a9.562 9.562 0 0 1-1.69-1.348.996.996 0 0 1 0-1.41c.39-.39 1.03-.39 1.42 0l2.883 2.893zM14 16a1 1 0 0 0-1 1v1.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1.505a1 1 0 1 0 2 0V5.5A2.5 2.5 0 0 0 12.5 3h-7A2.5 2.5 0 0 0 3 5.5v13A2.5 2.5 0 0 0 5.5 21h7a2.5 2.5 0 0 0 2.5-2.5V17a1 1 0 0 0-1-1z'
                />
              </svg>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
