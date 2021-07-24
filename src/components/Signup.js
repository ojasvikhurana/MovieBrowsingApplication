import React, {useRef, useState} from 'react';
import {Form, Button, Container, Card, Alert} from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const {signup} = useAuth();
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const history = useHistory();
    
    async function handleSubmit (e) {
        e.preventDefault();

        if(passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError("Passwords do not match")
        }
        try{
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            history.push("/");

        } catch(e){
            console.error(e);
            setError("Failed to create an account");
        }
        setLoading(false);
    }

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}} >
                        <div className="w-100" style={{maxWidth: "400px"}}>

            <Card bg="dark" text="light">
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control id="email" type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control id="password" type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control id="confirmPassword" type="password" ref={confirmPasswordRef} required />
                        </Form.Group>
                        <br></br>
                        <Button variant="danger" disabled={loading} className="w-100" type="submit">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link className="link" to="/login">Log In</Link>
            </div>
            </div>
        </Container>
    )
}