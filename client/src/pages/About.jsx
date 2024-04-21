function About() {
  return (
    <div className='min-h-screen py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto'>
        <div className='text-center mb-10'>
          <h1 className='text-3xl md:text-5xl font-bold text-sky-500 mb-2'>
            About Console.Blog()
          </h1>
          <p className='text-lg text-gray-600'>
            Your destination for tech insights and inspiration
          </p>
        </div>
        <div className='bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-md p-8 mb-10'>
          <h2 className='text-xl md:text-2xl font-semibold text-gray-800 mb-4'>
            Our Mission
          </h2>
          <p className='text-lg text-gray-700 mb-6'>
            Console.Blog() is committed to providing valuable resources and
            insightful content to empower tech students and enthusiasts. Our
            mission is to inspire, educate, and foster a vibrant community
            passionate about technology.
          </p>
          <h2 className='text-xl md:text-2xl font-semibold text-gray-800 mb-4'>
            What We Offer
          </h2>
          <p className='text-lg text-gray-700 mb-6'>
            From software development to machine learning, Console.Blog() covers
            a wide range of topics. We offer tutorials, guides, and in-depth
            articles to help you stay updated with the latest trends and
            advancements in the tech industry.
          </p>
          <h2 className='text-xl md:text-2xl font-semibold text-gray-800 mb-4'>
            Join Our Community
          </h2>
          <p className='text-lg text-gray-700 mb-6'>
            Connect with like-minded individuals, share your knowledge, and
            explore the endless possibilities of technology. Join Console.Blog()
            today and be part of a thriving community dedicated to tech
            innovation.
          </p>
        </div>
        <div className='text-center'>
          <p className='text-lg text-gray-600 mb-2'>
            Ready to dive into the world of tech?
          </p>
          <a
            href='/sign-up'
            className='inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300'
          >
            Sign Up Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;
