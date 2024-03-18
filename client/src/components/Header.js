const Header = () => {
    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo">
                    {/* <Link to="/">Courses</Link> */}
                    <span>Courses</span>
                </h1>
                <nav>
                    <ul className="header--signedout">
                        <li>
                            {/* <Link to="sign-up.html">Sign Up</Link> */}
                            <span>Sign Up</span>
                        </li>
                        <li>
                            {/* <Link to="sign-in.html">Sign In</Link> */}
                            <span>Sign In</span>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
