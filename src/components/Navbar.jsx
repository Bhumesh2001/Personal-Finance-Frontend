import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
    const location = useLocation();

    return (
        <Navbar expand="lg" className="custom-navbar py-3">
            <Container>
                <Navbar.Brand as={Link} to="/" className="navbar-brand">
                    💰 Finance Tracker
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/transactions" className={`nav-link-custom ${location.pathname === "/transactions" ? "active" : ""}`}>
                            Transactions
                        </Nav.Link>
                        <Nav.Link as={Link} to="/dashboard" className={`nav-link-custom ${location.pathname === "/dashboard" ? "active" : ""}`}>
                            Dashboard
                        </Nav.Link>
                        <Nav.Link as={Link} to="/budgets" className={`nav-link-custom ${location.pathname === "/budgets" ? "active" : ""}`}>
                            Budgets
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
