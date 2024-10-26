import video1 from "../../assets/video1.mp4";
import video2 from "../../assets/video2.mp4";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20 bg-white text-blue-900">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide text-blue-900">
      Seamless elder 
        <span className="bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">
          {" "}
          care and coordination.
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-blue-700 max-w-4xl">
      Empower better care and support for elders with our easy-to-use coordination tools. Get started today to simplify elder care and enhance their well-being!
      </p>
      <div className="flex justify-center my-10">
        <a
          href="#"
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-4 mx-3 rounded-md"
        >
          Start for free
        </a>
        <a href="#" className="py-3 px-4 mx-3 rounded-md border border-blue-500 text-blue-500">
          Documentation
        </a>
      </div>
      <div className="flex mt-10 justify-center">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-blue-300 shadow-sm shadow-blue-200 mx-2 my-4"
        >
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-blue-300 shadow-sm shadow-blue-200 mx-2 my-4"
        >
          <source src={video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default HeroSection;
