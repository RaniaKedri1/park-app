import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation } from 'react-router-dom';
import { useNavigate, NavLink } from 'react-router-dom';
import { HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";


function NavbarExemple() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogout = () => {
        // Supprimer token, isAuth du stockage local
        localStorage.removeItem('token');
        localStorage.removeItem('isAuth');
        localStorage.removeItem('id');
        localStorage.removeItem('role');
        // Rediriger vers la page de connexion
        navigate('/login');
    };

    useEffect(() => {
        const isAuth = localStorage.getItem('isAuth') || false;
        setIsAuthenticated(isAuth);
    }, [location]);

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <NavLink exact to="/" className="nav-logo">
                        <span>RentACar</span>
                        {/* <i className="fas fa-code"></i> */}
                    </NavLink>

                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/mission"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Mission
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/vehicle"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Vehicle
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/contact"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Contact Us
                            </NavLink>
                        </li>
                        {!isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        exact
                                        to="/login"
                                        activeClassName="active"
                                        className="nav-links"
                                        onClick={handleClick}
                                    >
                                        <img width={36} src='https://icon-library.com/images/google-login-icon/google-login-icon-12.jpg' />
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        exact
                                        to="/register"
                                        activeClassName="active"
                                        className="nav-links"
                                        onClick={handleClick}
                                    // style={{ border:'1px solid #fff' }}
                                    >
                                        sign up
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <Nav.Link><button className='btn btn-danger' onClick={handleLogout}>Log out</button></Nav.Link>
                        )}
                    </ul>
                    <div className="nav-icon" onClick={handleClick}>
                        {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}

                        {click ? (
                            <span className="icon">
                                <HamburgetMenuClose />
                            </span>
                        ) : (
                            <span className="icon">
                                <HamburgetMenuOpen />{" "}
                            </span>
                        )}
                    </div>
                </div>
            </nav>
        </>

    );
}

export default NavbarExemple;
