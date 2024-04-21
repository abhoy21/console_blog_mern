import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function PostCard({ post }) {
  const [user, setUser] = useState({});
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/user/${post.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [post]);

  return (
    <a href={`/post/${post.slug}`} className='group'>
      <div className='flex flex-col md:flex-row md:items-stretch bg-gray-200 bg-opacity-20 backdrop-blur-xl rounded-lg overflow-hidden transition-all '>
        <div className='relative md:w-[40em]'>
          <img
            src={post.image}
            alt={post.title}
            className='h-48 md:h-auto max-h-96 w-full object-cover'
          />
        </div>
        <div className='flex flex-col justify-between p-4 md:w-2/3 max-w-96'>
          <div>
            <h3 className='text-lg font-bold md:text-2xl  text-gray-800 mb-2'>
              {post.title}
            </h3>
            <p className='text-sm md:text-base text-gray-600 mb-4'>
              <span
                dangerouslySetInnerHTML={{
                  __html: post && post.content.slice(0, 45) + "...",
                }}
                className='truncate'
              ></span>
            </p>
          </div>
          <div className='flex items-center'>
            <img
              src={user.photo}
              alt={user.username}
              className='h-8 w-8 rounded-full mr-2'
            />
            <div>
              <span className='text-sm text-gray-800 font-semibold'>
                {user.username}
              </span>
              <span className='text-xs text-gray-500 ml-1'>
                {new Date(post.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
      <hr className='my-8 border-blueGray-300' />
    </a>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    user: PropTypes.shape({
      photo: PropTypes.string.isRequired,
    }),
    username: PropTypes.string,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
};
