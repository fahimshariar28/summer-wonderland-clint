import { Link } from "react-router-dom";
import logo from "/logo.png";
const Footer = () => {
  return (
    <footer className="footer mt-3 p-10 bg-base-200 text-base-content">
      <div>
        <img className="w-16" src={logo} alt="" />
        <p className="text-xl text-primary font-bold">Summer WonderLand</p>
        <br />
        <p className="font-bold">©Summer WonderLand 2023</p>
      </div>
      <div>
        <span className="footer-title">Links</span>
        <Link to="/" className="link link-hover">
          Home
        </Link>
        <Link to="/classes" className="link link-hover">
          Classes
        </Link>
        <Link to="/instructors" className="link link-hover">
          Instructors
        </Link>
        <Link to="/dashboard/home" className="link link-hover">
          Dashboard
        </Link>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </div>
    </footer>
  );
};

export default Footer;
