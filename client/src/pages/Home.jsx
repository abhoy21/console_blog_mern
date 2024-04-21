import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl text-sky-500'>
          Welcome to console.Blog()
        </h1>
        <p className='text-gray-500 font-bold text-md sm:text-sm'>
          Welcome to Console.Blog, your go-to destination for insightful
          articles and tutorials crafted specifically for developers, software
          engineers, technical students, and tech enthusiasts alike. Dive into a
          plethora of enriching content covering the latest trends in web
          development, software engineering, programming languages, and much
          more. Let&apos;s embark on a journey of continuous learning and
          exploration in the ever-evolving realm of technology.
        </p>

        <a
          href='/search'
          className='text-xs sm:text-sm text-blue-500 font-bold hover:underline'
        >
          View all posts
        </a>
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <a
              href={"/search"}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
