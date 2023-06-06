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
        <a className="link link-hover">Home</a>
        <a className="link link-hover">Classes</a>
        <a className="link link-hover">Instructors</a>
        <a className="link link-hover">Dashboard</a>
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
