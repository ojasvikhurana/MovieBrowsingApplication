import React from "react"
import { Container, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useHistory, Link } from 'react-router-dom';
import NavBar from "./Navbar";


export default function Profile() {
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
        <div className="d-flex flex-column bg-dark  justify-content-start" style={{ minHeight: "100vh" }}>
        <NavBar/>
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}} >
                        <div className="w-100" style={{maxWidth: "400px"}}>
            <Card className="bg-secondary">
                <Card.Body style={{color: "white"}}>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong >Email:</strong> {currentUser.email}
                    <Link to="/update-profile" className="btn btn-danger w-100 mt-3">
                        Update Profile
                    </Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="danger" onClick={handleLogout}>Log Out</Button>
            </div>
       
        </div></Container>
        </div>
    )
}
