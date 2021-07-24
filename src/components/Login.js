import React, { useRef, useState } from 'react';
import { Form, Container, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        } catch (e) {
            console.error(e);
            setError("Failed to Sign In");
        }
        setLoading(false);
    }

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }} >
            <div className="w-100" style={{maxWidth: "400px"}}>
            <Card bg="dark" text="light">
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control id="email" type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control id="password" type="password" ref={passwordRef} required />
                        </Form.Group>
                        <br></br>
                        <Button disabled={loading} className="w-100" type="submit" variant="danger">Log In</Button>
                    </Form>
                    <div className="w-100 text-center mt-2 light">
                        <Link className="link" to="/forgot-password">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link className="link" to="/signup">Sign Up</Link>
            </div>
            </div>
        </Container>
    )
}