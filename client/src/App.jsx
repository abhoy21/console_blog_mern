import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import ScrollToTop from "./components/ScrollToTop";
import Search from "./pages/Search";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<Signin />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/search' element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/update-post/:postId' element={<UpdatePost />} />
        {/* <Route element={<OnlyAdminPrivateRoute />}></Route> */}

        <Route path='/post/:postSlug' element={<PostPage />} />
      </Routes>

      <Footer />

      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />

      {/* Background elements */}
      <div className='w-[600px] h-[1000px] absolute top-0 right-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-cyan-50 via-sky-100 to-teal-100 rounded-[999px]'></div>
      <div className='md:w-[600px] md:h-[800px] absolute -bottom-60 -left-60 -z-10 blur-3xl  bg-opacity-60 bg-gradient-to-r from-teal-100 via-sky-100 to-cyan-50 rounded-[999px]'></div>
      <div className='hidden md:flex w-[150px] h-[160px] absolute top-10 left-60 -z-10 blur-xl bg-opacity-60 bg-gradient-to-r from-cyan-50 via-sky-100 to-teal-100 rounded-[999px]'></div>
    </BrowserRouter>
  );
}
