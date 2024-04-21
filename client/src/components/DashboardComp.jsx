import { ArrowUp, FileText, MessageSquareText, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/user/getusers?limit=5");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=5");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch("/comment/getcomments?limit=5");
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);
  return (
    <div className='p-3 md:mx-auto'>
      <div className='flex-wrap flex gap-4 justify-center'>
        <div className='flex flex-col p-3 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
              <p className='text-2xl'>{totalUsers}</p>
            </div>
            <UsersRound className='bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex  gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <ArrowUp />
              {lastMonthUsers}
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>
        <div className='flex flex-col p-3 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>
                Total Comments
              </h3>
              <p className='text-2xl'>{totalComments}</p>
            </div>
            <MessageSquareText className='bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex  gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <ArrowUp />
              {lastMonthComments}
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>
        <div className='flex flex-col p-3 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>Total Posts</h3>
              <p className='text-2xl'>{totalPosts}</p>
            </div>
            <FileText className='bg-lime-600  text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex  gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <ArrowUp />
              {lastMonthPosts}
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>
      </div>
      <div className='flex flex-wrap gap-4 py-3 pt-10 mx-auto justify-center'>
        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md'>
          <div className='flex justify-between  p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Recent users</h1>
            <button className='bg-gradient-to-r from-cyan-300 to-sky-500 py-4 px-8 rounded-xl'>
              <a href={"/dashboard?tab=users"}>See all</a>
            </button>
          </div>
          <div className='table-auto overflow-x-scroll scrollbar lg:scrollbar-none scrollbar-track-slate-100 scrollbar-thumb-slate-300 sm:-mx-6 lg:-mx-8'>
            <div className='align-middle inline-block min-w-full'>
              <div className=' shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mx-10'>
                <table className='min-w-full divide-y divide-gray-200 '>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider'
                      >
                        User image
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Username
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-gray-100 backdrop-blur-xl bg-opacity-20  border-2 border-white shadow-[100px_100px_80px_rgba(0,0,0,0.03)] divide-y divide-gray-200'>
                    {users &&
                      users.map((user) => (
                        <tr
                          key={user._id}
                          className='hover:bg-gray-100 duration-300 ease-linear'
                        >
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
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md'>
          <div className='flex justify-between  p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Recent comments</h1>
            <button className='bg-gradient-to-r from-cyan-300 to-sky-500 py-4 px-8 rounded-xl'>
              <a href={"/dashboard?tab=comments"}>See all</a>
            </button>
          </div>
          <div className='table-auto overflow-x-scroll scrollbar lg:scrollbar-none scrollbar-track-slate-100 scrollbar-thumb-slate-300 sm:-mx-6 lg:-mx-8'>
            <div className='align-middle inline-block min-w-full'>
              <div className=' shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mx-10'>
                <table className='min-w-full divide-y divide-gray-200 '>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Comment content
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Likes
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-gray-100 backdrop-blur-xl bg-opacity-20  border-2 border-white shadow-[100px_100px_80px_rgba(0,0,0,0.03)] divide-y divide-gray-200'>
                    {comments &&
                      comments.map((comment) => (
                        <tr
                          key={comment._id}
                          className='hover:bg-gray-100 duration-300 ease-linear'
                        >
                          <td className='px-6 py-4 whitespace-nowrap'>
                            {comment.content.length > 20
                              ? comment.content.substring(0, 20) + "..."
                              : comment.content}
                          </td>

                          <td className='px-6 py-4 whitespace-nowrap font-bold'>
                            {comment.numberOfLikes}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md '>
          <div className='flex justify-between  p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Recent posts</h1>
            <button className='bg-gradient-to-r from-cyan-300 to-sky-500 py-4 px-8 rounded-xl'>
              <a href={"/dashboard?tab=posts"}>See all</a>
            </button>
          </div>

          <div className='table-auto overflow-x-scroll scrollbar lg:scrollbar-none scrollbar-track-slate-100 scrollbar-thumb-slate-300 sm:-mx-6 lg:-mx-8'>
            <div className='align-middle inline-block min-w-full'>
              <div className=' shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mx-10'></div>
              <table className='min-w-full divide-y divide-gray-200 '>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Post image
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
                      Category
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-gray-100 backdrop-blur-xl bg-opacity-20  border-2 border-white shadow-[100px_100px_80px_rgba(0,0,0,0.03)] divide-y divide-gray-200'>
                  {posts &&
                    posts.map((post) => (
                      <tr
                        key={post._id}
                        className='hover:bg-gray-100 duration-300 ease-linear'
                      >
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
                          <span className='inline-block bg-gradient-to-r from-cyan-300 to-sky-500  rounded-full px-4 py-2 text-xs font-semibold text-white mr-2'>
                            {post.category}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
