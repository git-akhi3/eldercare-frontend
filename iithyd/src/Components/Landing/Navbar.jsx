// import { Menu, X } from "lucide-react";
// import { useState } from "react";
// import logo from "../../assets/logo.png";
// import { navItems } from "../../constants";
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar = () => {
//   const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

//   const toggleNavbar = () => {
//     setMobileDrawerOpen(!mobileDrawerOpen);
//   };

//   return (
//     <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
//       <div className="container px-4 mx-auto relative lg:text-sm">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center flex-shrink-0">
//             <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
//             <span className="text-xl tracking-tight">VirtualR</span>
//           </div>
//           <ul className="hidden lg:flex ml-14 space-x-12">
//             {navItems.map((item, index) => (
//               <li key={index}>
//                 <a href={item.href}>{item.label}</a>
//               </li>
//             ))}
//           </ul>
//           <div className="hidden lg:flex justify-center space-x-12 items-center">
//             <a href="#" className="py-2 px-3 border rounded-md">
//               Sign In
//             </a>
//             <a
//               href="#"
//               className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
//             >
//               Create an account
//             </a>
//           </div>
//           <div className="lg:hidden md:flex flex-col justify-end">
//             <button onClick={toggleNavbar}>
//               {mobileDrawerOpen ? <X /> : <Menu />}
//             </button>
//           </div>
//         </div>
//         {mobileDrawerOpen && (
//           <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
//             <ul>
//               {navItems.map((item, index) => (
//                 <li key={index} className="py-4">
//                   <a href={item.href}>{item.label}</a>
//                 </li>
//               ))}
//             </ul>
//             <div className="flex space-x-6">
//               <a href="#" className="py-2 px-3 border rounded-md">
//                 Sign In
//               </a>
//               <a
//                 href="#"
//                 className="py-2 px-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800"
//               >
//                 Create an account
//               </a>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import { CheckCircle2 } from "lucide-react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../../assets/logo.png";
import { navItems } from "../../constants";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleSignIn = () => {
    navigate('/login');
    setMobileDrawerOpen(false); // Close mobile menu if open
  };

  const handleSignUp = () => {
    navigate('/signup');
    setMobileDrawerOpen(false); // Close mobile menu if open
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
            <span className="text-xl tracking-tight">VirtualR</span>
          </Link>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <button 
              onClick={handleSignIn}
              className="py-2 px-3 border rounded-md hover:bg-neutral-800 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={handleSignUp}
              className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md hover:from-orange-600 hover:to-orange-900 transition-colors"
            >
              Create an account
            </button>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
              <button 
                onClick={handleSignIn}
                className="py-2 px-3 border rounded-md hover:bg-neutral-800 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={handleSignUp}
                className="py-2 px-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800 hover:from-orange-600 hover:to-orange-900 transition-colors"
              >
                Create an account
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;