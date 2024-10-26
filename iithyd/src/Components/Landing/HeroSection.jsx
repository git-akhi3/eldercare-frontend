import video2 from "../../assets/video2.mp4";

const HeroSection = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover"
      >
        <source src={video2} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 text-center text-white p-8">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl tracking-wide mb-6">
          Seamless elder 
          <span className="bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">
            {" "}
            care and coordination.
          </span>
        </h1>
        <p className="text-lg max-w-4xl mx-auto mb-10">
          Empower better care and support for elders with our easy-to-use coordination tools. Get started today to simplify elder care and enhance their well-being!
        </p>
        <div className="flex justify-center">
          <a
            href="#"
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-4 mx-3 rounded-md"
          >
            Start for free
          </a>
          <a href="#" className="py-3 px-4 mx-3 rounded-md border border-white text-white">
            Documentation
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
