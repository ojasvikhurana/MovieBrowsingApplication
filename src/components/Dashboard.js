import React from "react"
import { Card, Container, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useHistory, Link } from 'react-router-dom';
import NavBar from "./Navbar";

export default function Dashboard() {
    const [error, setError] = React.useState(null);
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    async function handleLogout() {
        setError("");
        try {
            await logout();
            history.push("/login");
        } catch {
            setError("Error logging out");
        }
    }

    return (
        <div>
            <NavBar />
            <Container className="d-flex bg-dark align-items-center justify-content-center" style={{minHeight: "100vh"}} >
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email:</strong> {currentUser.email}
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                        Update Profile
                    </Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="danger" onClick={handleLogout}>Log Out</Button>
            </div>
            </Container>
        </div>
    )
}