import { useRef } from "react";
import { FaBeer } from "react-icons/fa";
import "./Nav.css";

function Nav() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <div className="icon">
        <img src={require("../../assets/icon-1.png")} />
      </div>
      <nav ref={navRef}>
        <a href="/#">Home</a>
        <a href="/#">Features</a>
        <a href="/#">Pricing</a>
        <a href="/#">Blog</a>
        {/* <a href="/#">Sign In</a> */}
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          {/* <img src={require("../../assets/n-0.jfif")} /> */}
          <FaBeer />
        </button>
      </nav>

      <button className="nav-btn" onClick={showNavbar}>
        <FaBeer />
      </button>
    </header>
  );
}

export default Nav;
