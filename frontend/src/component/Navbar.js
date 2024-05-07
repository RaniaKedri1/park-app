import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function NavbarExemple() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogout = () => {
        // Supprimer token, isAuth du stockage local
        localStorage.removeItem('token');
        localStorage.removeItem('isAuth');
        // Rediriger vers la page de connexion
        navigate('/login');
    };

    useEffect(() => {
        const isAuth = localStorage.getItem('isAuth') || false;
        setIsAuthenticated(isAuth);
    }, [location]);

    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="#home">Home</Navbar.Brand>
                <Nav className="me-auto">
                    {!isAuthenticated ? (
                        <>
                            <Nav.Link><Link to={'/register'}>Register</Link></Nav.Link>
                            <Nav.Link><Link to={'/login'}>Log in</Link></Nav.Link>
                        </>
                    ) : (
                        <Nav.Link><button className='btn btn-danger' onClick={handleLogout}>Log out</button></Nav.Link>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavbarExemple;
