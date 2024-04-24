/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { imageDB } from "../firebase";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { useSelector } from "react-redux";

export default function UpdatePost() {
  const { postId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const [selectedOption, setSelectedOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  console.log(formData);
  const options = [
    "JavaScript",
    "TypeScript",
    "CSS",
    "React.js",
    "Next.js",
    "Django",
    "C++",
    "Python",
    "REST framework",
    "Express.js",
    "MERN",
    "PostgreSQL",
    "MongoDB",
    "Web Development",
    "TensorFlow",
    "Neural Networks",
    "Machine Learning",
    "Data Analyst",
    "Data Science",
  ];

  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    ["link", "image", "video", "formula"],
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ["clean"], // remove formatting button
  ];

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(
          `https://console-blog-mern-api.vercel.app/api/post/getposts?postId=${postId}`,
        );
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      };

      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setFormData({ ...formData, category: option });
    setIsOpen(false);
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const uploadImage = async () => {
    console.log("upload image triggered");
    try {
      if (!imageFile) {
        setImageUploadError("Please select an image.");
        return;
      }
      setImageUploadError(null);

      // If formData has an existing image and it's not the default image, delete it first
      if (
        formData.image &&
        formData.image !==
          "https://firebasestorage.googleapis.com/v0/b/console-blog-78e8f.appspot.com/o/default_post_image.jpg?alt=media&token=3e29f09b-d832-416f-b323-ed37960d517a"
      ) {
        const existingImageRef = ref(imageDB, formData.image);
        deleteObject(existingImageRef)
          .then(() => {
            console.log("Existing image deleted successfully");
            uploadNewImage();
          })
          .catch((error) => {
            console.error("Error deleting existing image:", error);
            setImageUploadError("Image upload failed");
            setImageUploadProgress(null);
            toast.error("Could not upload image.");
          });
      } else {
        // If no existing image or it's the default image, directly upload the new image
        uploadNewImage();
      }
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.error(error);
    }
  };

  const uploadNewImage = () => {
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(imageDB, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress} % done`);
        setImageUploadProgress(progress.toFixed(0));
      },
      (error) => {
        console.error("Error uploading image:", error);
        setImageUploadError("Image upload failed");
        setImageUploadProgress(null);
        toast.error("Could not upload image.");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUploadProgress(downloadURL);
          setImageUploadError(null);
          setImageUploadProgress(null);
          setFormData({ ...formData, image: downloadURL });
          toast.success("Image Uploaded Successfully");
        });
      },
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `https://console-blog-mern-api.vercel.app/api/post/updatepost/${formData._id}/${currentUser._id}`,
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
        setPublishError(data.message || "Failed to create post");
        toast.error(data.message || "Failed to create post");
        return;
      }

      setPublishError(null);
      toast.success("New post created!");
      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError("Something went wrong");
      toast.error("Something went wrong");
    }
  };

  return (
    <div className='p-3 max-w-5xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Update a Post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between items-center'>
          <div className='relative mt-6 w-full'>
            <input
              type='text'
              required
              placeholder='Title'
              id='title'
              className='flex-1 w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-sky-500 focus:outline-none focus:ring-sky-500/5'
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              value={formData.title}
            />
          </div>
          <div
            className='relative inline-block text-left mt-6 w-full md:w-1/2 z-20'
            onMouseLeave={() => setIsOpen(false)}
          >
            <div>
              <button
                type='button'
                className='inline-flex justify-between w-full rounded-lg border border-gray-300 shadow-sm px-4 py-4 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'
                id='options-menu'
                aria-expanded={isOpen}
                aria-haspopup='true'
                onClick={toggleDropdown}
              >
                {selectedOption || formData.category}
                <svg
                  className={`-mr-1 ml-2 h-5 w-5 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>

            {isOpen && (
              <div
                className='absolute right-0 w-72 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 max-h-[300px] overflow-y-auto'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='options-menu'
              >
                <div className='py-2' role='none'>
                  {options.map((option, index) => (
                    <a
                      href='#'
                      key={index}
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${
                        selectedOption === option
                          ? "bg-gray-100 text-gray-900"
                          : ""
                      }`}
                      role='menuitem'
                      tabIndex='-1'
                      id={`menu-item-${index}`}
                      onClick={(event) => {
                        event.preventDefault();
                        handleOptionChange(option);
                      }}
                    >
                      {option}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <ReactQuill
          modules={{ toolbar: toolbarOptions }}
          theme='snow'
          required
          placeholder='Write Something...'
          className='h-72 mb-12'
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
          value={formData.content}
        />

        <div className='flex flex-col md:flex-row gap-4 items-center justify-between border-4 border-gray-300 border-dotted p-3 mt-52 md:mt-20'>
          <input
            type='file'
            accept='image/*'
            required=''
            id='file-input'
            onChange={handleFileChange}
          />
          <button
            onClick={uploadImage}
            disabled={imageUploadProgress}
            className='bg-gradient-to-r from-cyan-300 to-sky-500 mx-4 rounded-xl p-4 text-white font-bold'
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </button>
        </div>

        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )}
        <div className='flex items-center justify-center mt-8'>
          <button className='w-full md:w-1/2 flex items-center justify-center text-white bg-gradient-to-r from-cyan-300 to-sky-500 py-4 px-8 rounded-xl hover:bg-white hover:bg-opacity-20 hover:backdrop-blur-xl hover:text-sky-500 hover:border hover:border-sky-500 duration-300 ease-linear'>
            <span className='text-xl font-bold'>Update</span>
            <svg
              className='h-8 w-8 ml-4'
              viewBox='0 0 25 25'
              fill='currentColor'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M4.99997 5.50005H20M7.5 14L12.5 9.00003L17.5 14'
                stroke='currentColor'
                strokeWidth='1.2'
              />
              <path
                d='M12.5 9.00003V20'
                stroke='currentColor'
                strokeWidth='1.2'
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
