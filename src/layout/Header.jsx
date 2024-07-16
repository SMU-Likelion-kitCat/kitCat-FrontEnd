// import React from 'react';
// import logo from '../assets/images/logo.png';

// import { Link, useLocation } from 'react-router-dom';

// const Header = () => {
//   const loaction = useLocation();
//   const isMainPage = loaction.pathname === '/';

//   return (
//     <header
//       className={
//         isMainPage
//           ? 'header-container main-header-container'
//           : 'header-container other-header-container'
//       }
//     >
//       <div className="header-logo-container">
//         <img src={logo} className="logo" alt="Logo" />
//       </div>
//       <nav className="header-nav-list-container">
//         <li className="header-nav-list-item">
//           <Link className="header-nav-list-item-link" to="/">
//             Home
//           </Link>
//         </li>
//         {/* <li className="list-item">
//           <Link to="/life">life</Link>
//         </li> */}
//         <li className="header-nav-list-item">
//           <Link className="header-nav-list-item-link" to="/coding">
//             coding
//           </Link>
//         </li>
//         {/* <li className="list-item">
//           <Link to="/photo">photo</Link>
//         </li> */}
//         <li className="header-nav-list-item">
//           <Link className="header-nav-list-item-link" to="/info">
//             info
//           </Link>
//         </li>
//       </nav>
//     </header>
//   );
// };

// export default Header;
