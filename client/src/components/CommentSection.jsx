/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import { useNavigate } from "react-router-dom";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch("/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/comment/likeComment/${commentId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment,
          ),
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c,
      ),
    );
  };

  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(
        `https://console-blog-mern-api.vercel.app/api/comment/deleteComment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.ok) {
        const data = await res.json();
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      {currentUser ? (
        <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
          <p>Signed in as:</p>
          <img
            className='h-7 w-7 object-cover rounded-full ml-2 cursor-pointer'
            src={currentUser.photo}
            alt=''
          />
          <a
            href={"/dashboard?tab=profile"}
            className='text-md text-cyan-600 hover:underline cursor-pointer'
          >
            @{currentUser.username}
          </a>
        </div>
      ) : (
        <div className='text-sm text-teal-500 my-5 flex gap-1'>
          You must be signed in to comment.
          <a className='text-blue-500 hover:underline' to={"/sign-in"}>
            Sign In
          </a>
        </div>
      )}

      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className='border border-sky-300 rounded-md p-3'
        >
          <div className='max-w-2xl mx-auto'>
            <label
              htmlFor='message'
              className='block mb-2 text-lg font-medium text-gray-500'
            >
              Your Comment!
            </label>
            <textarea
              id='message'
              rows={4}
              maxLength='200'
              className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-sky-300 focus:ring-sky-500 focus:border-sky-500 '
              placeholder='Your thaughts...'
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <p className='mt-5'>
              Want to learn more? Check out our latest blog post on{" "}
              <a
                className='text-blue-600 hover:underline'
                href='/'
                target='_blank'
              >
                console.Blog()
              </a>
              .
            </p>
          </div>
          <div className='flex justify-between items-center mt-5'>
            <p className='text-gray-500 text-xs'>
              {200 - comment.length} characters remaining
            </p>
            <button
              type='submit'
              className='bg-gradient-to-r from-cyan-300 to-sky-500  rounded-full px-4 py-2 text-lg font-semibold text-white mr-2'
            >
              Submit
            </button>
          </div>
        </form>
      )}
      {comments.length === 0 ? (
        <p className='text-sm my-5'>No comments yet!</p>
      ) : (
        <>
          <div className='text-sm my-5 flex items-center gap-1'>
            <p>Comments</p>
            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
      )}
      {showModal && (
        <div className='relative top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2 z-10'>
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
                  onClick={() => handleDelete(commentToDelete)}
                  className='bg-red-500 hover:bg-transparent px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 hover:border-red-500 text-white hover:text-red-500 rounded-full transition ease-in duration-300'
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
