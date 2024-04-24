import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Trash2, LogOut, CirclePlus, SquarePen } from "lucide-react";
import { imageDB } from "../firebase";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from "../redux/user/userSlice";

export default function DashboardProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imgFUploadProgress, setImgFUploadprogress] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [imgFUploadError, setimgFUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));

      if (
        currentUser.photo !==
        "https://firebasestorage.googleapis.com/v0/b/console-blog-78e8f.appspot.com/o/default_profile_picture.webp?alt=media&token=86b7a9bb-9bf9-4b97-ab4e-157601e9e361"
      ) {
        deleteExistingImage(currentUser.photo);
      }
    }
  };

  const deleteExistingImage = async (imageUrl) => {
    try {
      const imageRef = ref(imageDB, imageUrl);
      await deleteObject(imageRef);
      console.log("Previous image deleted successfully");
    } catch (error) {
      console.error("Error deleting previous image:", error);
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setimgFUploadError(null);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(imageDB, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress} % done`);
        setImgFUploadprogress(progress.toFixed(0));
      },
      () => {
        setimgFUploadError(
          "Could not upload image (File must be less than 2 mb",
        );
        const notify = () =>
          toast.error(
            "Could not upload image (File must be less than 2 mb) OR (file should be an Image)",
          );
        notify();
        setImgFUploadprogress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, photo: downloadURL });
          const notify = () => toast.success("Image Uploaded Successfully");
          notify();
          setImageFileUploading(false);
          setImgFUploadprogress(null);
        });
      },
    );
  };

  const handleChange = (e) => {
    console.log(formData);
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      dispatch(updateStart());
      const res = await fetch(
        `https://console-blog-mern-api.vercel.app/api/user/update/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
      } else {
        console.log(data);
        dispatch(updateSuccess(data));
        const notify = () => toast.success("Profile updated Successfully");
        notify();
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    const token = localStorage.getItem("token");
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const photoURL = currentUser.photo;
      if (photoURL) {
        const imageRef = ref(imageDB, photoURL);
        await deleteObject(imageRef);
      }
      const res = await fetch(
        `https://console-blog-mern-api.vercel.app/api/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
        toast.error("Error Deleting account");
      } else {
        dispatch(deleteUserSuccess(data));
        toast.success("Account Deleted Successfully");
        navigate("/sign-in");
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      toast.error("Error Deleting, Something went wrong!");
    }
  };

  // const handleSignout = async () => {
  //   try {
  //     const res = await fetch(
  //       "https://console-blog-mern-frontend.vercel.app/api/user/signout",
  //       {
  //         method: "POST",
  //       },
  //     );
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
    <div className='mx-auto p-6 w-full flex justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center justify-center gap-4 w-full bg-gray-300 bg-opacity-40  border-2 border-white shadow-[100px_100px_80px_rgba(0,0,0,0.03)] px-5 py-[30px] rounded-[20px] '
      >
        <span className='text-black font-bold text-center text-xl md:text-5xl mb-1'>
          Profile
        </span>

        <input
          id='file'
          type='file'
          accept='image/*'
          onChange={handleImageChange}
        />
        <label
          className='self-center cursor-pointer shadow-[12.5px_12.5px_10px_rgba(0,0,0,0.015),100px_100px_80px_rgba(0,0,0,0.03)] p-1.5 rounded-[50%]'
          htmlFor='file'
        >
          <div className='relative'>
            {imgFUploadProgress && (
              <CircularProgressbar
                value={imgFUploadProgress || 0}
                text={`${imgFUploadProgress}%`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  },
                  path: {
                    stroke: `rgba(62, 152, 199, ${imgFUploadProgress / 100})`,
                  },
                }}
              />
            )}
            <img
              src={imageFileUrl || currentUser.photo}
              alt='user'
              className={` rounded-full h-[90px] w-[90px] md:h-[120px] md:w-[120px] object-cover border-8 border-sky-500  ${
                imgFUploadProgress && imgFUploadProgress < 100 && "opacity-60"
              }`}
            />
          </div>
        </label>
        <input
          type='text'
          id='username'
          className='input-profile'
          placeholder='username'
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type='email'
          id='email'
          className='input-profile'
          placeholder='email'
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type='password'
          id='password'
          className='input-profile'
          placeholder='password'
          onChange={handleChange}
        />
        <button
          type='submit'
          className='flex items-center justify-center bg-sky-500 text-white text-lg md:text-xl p-4 px-8 rounded-xl hover:bg-transparent hover:border hover:border-sky-500 hover:text-sky-500 duration-300 ease-linear'
          disabled={loading || imageFileUploading}
        >
          {loading || imageFileUploading ? "Updating..." : "Update"}
          <SquarePen className='h-7 w-7 ml-4' />
        </button>

        <a href='/create-post' className='w-full md:w-1/2'>
          <button
            type='button'
            className='flex items-center justify-center w-full  bg-gray-300 backdrop-blur-lg bg-opacity-40 text-black border border-sky-500 text-lg md:text-xl p-4 px-8 rounded-xl hover:bg-transparent hover:border hover:border-sky-500 hover:text-sky-500 duration-300 ease-linear'
          >
            Create a Post <CirclePlus className='h-7 w-7 ml-2' />
          </button>
        </a>

        <div className='flex justify-between w-full md:w-1/2 cursor-pointer mt-5 space-x-4'>
          <span
            className='text-red-500 flex'
            onClick={() => setShowModal(true)}
          >
            <Trash2 className='h-6 w-6 mr-2 hidden md:flex' />
            Delete Account
          </span>
          <span onClick={handleSignout} className='text-red-500 flex'>
            Sign Out
            <LogOut className='h-6 w-6 ml-2 hidden md:flex' />
          </span>

          {showModal && (
            <div className='absolute top-1/4 -left-0 md:top-1/2 md:left-0 md:transform md:translate-y-1/2'>
              <div className='group select-none w-[250px] flex flex-col p-4 relative top-1/4 -left-10 md:top-1/2 md:left-1/2 md:transform md:-translate-y-1/2 items-center justify-center bg-gray-200 bg-opacity-40 backdrop-blur-lg border border-gray-100 shadow-lg rounded-2xl'>
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
                      Do you really want to continue ? This process cannot be
                      undone
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
        </div>
      </form>
    </div>
  );
}
