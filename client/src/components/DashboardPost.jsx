import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function DashboardPost() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPosts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`,
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        },
      );
      // eslint-disable-next-line no-unused-vars
      const data = await res.json();
      if (!res.ok) {
        // eslint-disable-next-line no-undef
        console.log(error.message);
      }
      setUserPosts((prev) =>
        prev.filter((post) => post._id !== postIdToDelete),
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {userPosts.length > 0 ? (
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
                        Post Title
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Post Description
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-lgfont-medium text-gray-500 uppercase tracking-wider'
                      >
                        Category
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
                    {userPosts.map((post) => (
                      <tr
                        key={post._id}
                        className='hover:bg-gray-100 duration-300 ease-linear'
                      >
                        <td className='px-6 py-4 whitespace-nowrap'>
                          {new Date(post.updatedAt).toLocaleDateString()}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <a href={`/post/${post.slug}`}>
                            <img
                              src={post.image}
                              alt={post.title}
                              className='w-20 h-16 object-cover rounded-md'
                            />
                          </a>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap font-bold'>
                          {post.title}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: post && post.content.slice(0, 45) + "...",
                            }}
                            className='truncate'
                          ></span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span className='inline-block bg-gradient-to-r from-cyan-300 to-sky-500  rounded-full px-4 py-2 text-xs font-semibold text-white mr-2'>
                            {post.category}
                          </span>
                        </td>

                        <td className='px-6 py-6 flex items-center justify-start whitespace-nowrap space-x-4'>
                          <a
                            href={`/update-post/${post._id}`}
                            className='text-indigo-600 hover:text-indigo-900'
                          >
                            {/* Edit svg */}
                            <svg
                              className='h-8 w-8'
                              viewBox='0 0 24 24'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M16.4745 5.40801L18.5917 7.52524M17.8358 3.54289L12.1086 9.27005C11.8131 9.56562 11.6116 9.94206 11.5296 10.3519L11 13L13.6481 12.4704C14.0579 12.3884 14.4344 12.1869 14.7299 11.8914L20.4571 6.16423C21.181 5.44037 21.181 4.26676 20.4571 3.5429C19.7332 2.81904 18.5596 2.81903 17.8358 3.54289Z'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                              <path
                                d='M19 15V18C19 19.1046 18.1046 20 17 20H6C4.89543 20 4 19.1046 4 18V7C4 5.89543 4.89543 5 6 5H9'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                            </svg>
                          </a>
                          <button
                            className='text-red-600 hover:text-red-900'
                            onClick={() => {
                              setShowModal(true);
                              setPostIdToDelete(post._id);
                            }}
                          >
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
                                      onClick={handleDeletePost}
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
        <p className='text-xl md:text-3xl font-bold'>You have no posts yet!</p>
      )}
    </div>
  );
}
