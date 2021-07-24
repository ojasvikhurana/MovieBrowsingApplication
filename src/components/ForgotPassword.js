import React, {useRef, useState} from 'react';
import {Form, Button, Container, Card, Alert} from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import {Link, useHistory} from 'react-router-dom';

export default function ForgotPassword() {
    const emailRef = useRef();
    const {resetPassword} = useAuth();
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const [message, setMessage] = useState('');

    async function handleSubmit (e) {
        e.preventDefault();

        try{
            setError('');
            setMessage('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage('Check your inbox for further instructions');
            
        } catch(e){
            console.error(e);
            setError("Failed to reset password");
        }
        setLoading(false);
    }

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}} >
                       <div className="w-100" style={{maxWidth: "400px"}}>

            <Card bg="dark" text="light">
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>                    
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control id="email" type="email" ref={emailRef} required />
                        </Form.Group>
                        
                        <br></br>
                        <Button variant="danger" disabled={loading} className="w-100" type="submit">Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center mt-2">
                        <Link className="link" to="/login">Log In</Link>
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
