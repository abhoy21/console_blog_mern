import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function DashboardUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `https://console-blog-mern-api.vercel.app/api/user/getusers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `https://console-blog-mern-api.vercel.app/api/user/getusers?startIndex=${startIndex}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `https://console-blog-mern-api.vercel.app/api/user/delete/${userIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {currentUser.isAdmin && users.length > 0 ? (
        <div className='flex flex-col'>
          <div className='-my-2 table-auto overflow-x-scroll scrollbar lg:scrollbar-none scrollbar-track-slate-100 scrollbar-thumb-slate-300 sm:-mx-6 lg:-mx-8'>
            <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 '>
              <div className=' shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mx-10 mt-20 '>
                <table className='min-w-full divide-y divide-gray-200 '>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Date
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Image
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Username
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Email
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-lgfont-medium text-gray-500 uppercase tracking-wider'
                      >
                        User Type
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-gray-100 backdrop-blur-xl bg-opacity-20  border-2 border-white shadow-[100px_100px_80px_rgba(0,0,0,0.03)] divide-y divide-gray-200'>
                    {users.map((user) => (
                      <tr
                        key={user._id}
                        className='hover:bg-gray-100 duration-300 ease-linear'
                      >
                        <td className='px-6 py-4 whitespace-nowrap'>
                          {new Date(user.updatedAt).toLocaleDateString()}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <img
                            src={user.photo}
                            alt={user.username}
                            className='w-16 h-16 object-cover rounded-full'
                          />
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap font-bold'>
                          {user.username}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          {user.email}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span
                            className={`inline-block rounded-full px-4 py-2 font-semibold text-xl mr-2 ${
                              user.isAdmin
                                ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-sky-500"
                                : ""
                            }`}
                          >
                            {user.isAdmin ? "Admin" : "User"}
                          </span>
                        </td>

                        <td className='px-6 py-6 flex items-center justify-start whitespace-nowrap space-x-4'>
                          <button
                            className='text-red-600 flex items-center hover:text-red-900'
                            onClick={() => {
                              setShowModal(true);
                              setUserIdToDelete(user._id);
                            }}
                          >
                            <span className='text-xl mr-2'>Delete</span>
                            {/* delete svg */}
                            <svg
                              className='h-8 w-8'
                              viewBox='0 0 1024 1024'
                              version='1.1'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M667.8 362.1H304V830c0 28.2 23 51 51.3 51h312.4c28.4 0 51.4-22.8 51.4-51V362.2h-51.3z'
                                fill='#fff'
                              />
                              <path
                                d='M750.3 295.2c0-8.9-7.6-16.1-17-16.1H289.9c-9.4 0-17 7.2-17 16.1v50.9c0 8.9 7.6 16.1 17 16.1h443.4c9.4 0 17-7.2 17-16.1v-50.9z'
                                fill='#fff'
                              />
                              <path
                                d='M733.3 258.3H626.6V196c0-11.5-9.3-20.8-20.8-20.8H419.1c-11.5 0-20.8 9.3-20.8 20.8v62.3H289.9c-20.8 0-37.7 16.5-37.7 36.8V346c0 18.1 13.5 33.1 31.1 36.2V830c0 39.6 32.3 71.8 72.1 71.8h312.4c39.8 0 72.1-32.2 72.1-71.8V382.2c17.7-3.1 31.1-18.1 31.1-36.2v-50.9c0.1-20.2-16.9-36.8-37.7-36.8z m-293.5-41.5h145.3v41.5H439.8v-41.5z m-146.2 83.1H729.5v41.5H293.6v-41.5z m404.8 530.2c0 16.7-13.7 30.3-30.6 30.3H355.4c-16.9 0-30.6-13.6-30.6-30.3V382.9h373.6v447.2z'
                                fill='currentColor'
                              />
                              <path
                                d='M511.6 798.9c11.5 0 20.8-9.3 20.8-20.8V466.8c0-11.5-9.3-20.8-20.8-20.8s-20.8 9.3-20.8 20.8v311.4c0 11.4 9.3 20.7 20.8 20.7zM407.8 798.9c11.5 0 20.8-9.3 20.8-20.8V466.8c0-11.5-9.3-20.8-20.8-20.8s-20.8 9.3-20.8 20.8v311.4c0.1 11.4 9.4 20.7 20.8 20.7zM615.4 799.6c11.5 0 20.8-9.3 20.8-20.8V467.4c0-11.5-9.3-20.8-20.8-20.8s-20.8 9.3-20.8 20.8v311.4c0 11.5 9.3 20.8 20.8 20.8z'
                                fill='currentColor'
                              />
                            </svg>
                          </button>
                          {showModal && (
                            <div className='absolute top-1/2 -right-8 transform -translate-x-1/2 -translate-y-1/2 z-10'>
                              <div className='group select-none w-[200px] md:w-[250px] flex flex-col p-4 bg-gray-200 bg-opacity-40 backdrop-blur-lg border border-gray-100 shadow-lg rounded-2xl'>
                                <div className=''>
                                  <div className='text-center p-3 flex-auto justify-center'>
                                    <svg
                                      fill='currentColor'
                                      viewBox='0 0 20 20'
                                      className='group-hover:animate-bounce w-12 h-12 flex items-center text-gray-600 fill-red-500 mx-auto'
                                      xmlns='http://www.w3.org/2000/svg'
                                    >
                                      <path
                                        clipRule='evenodd'
                                        d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                                        fillRule='evenodd'
                                      />
                                    </svg>
                                    <h2 className='text-xl font-bold py-4 text-black'>
                                      Are you sure?
                                    </h2>
                                    <p className='font-bold text-sm text-gray-500 px-2'>
                                      Do you really want to continue ?
                                    </p>
                                    <p className='font-bold text-sm text-gray-500 px-2'>
                                      This process cannot be undone !
                                    </p>
                                  </div>
                                  <div className='p-2 mt-2 text-center space-x-1 md:block'>
                                    <button
                                      onClick={() => setShowModal(false)}
                                      className='mb-2 md:mb-0 bg-gray-300 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 hover:border-gray-700 text-gray-800 hover:text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300'
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={handleDeleteUser}
                                      className='bg-red-500 hover:bg-transparent px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 hover:border-red-500 text-white hover:text-red-500 rounded-full transition ease-in duration-300'
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {showMore && (
                  <button
                    onClick={handleShowMore}
                    className='w-full text-teal-500 self-center text-sm py-7'
                  >
                    Show more
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className='text-xl md:text-3xl font-bold'>You have no users yet!</p>
      )}
    </div>
  );
}
