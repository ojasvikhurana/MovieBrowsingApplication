import React, {useRef, useState} from 'react';
import {Form, Button, Container, Card, Alert} from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const {currentUser, updateEmail, updatePassword} = useAuth();
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const history = useHistory();
    
    function handleSubmit (e) {
        e.preventDefault();

        if(passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError("Passwords do not match")
        }

        const promises = []
        if(emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if(passwordRef.current.value !== "") {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push("/")
        }).catch(err => {
            setError("Failed to update account")
        }).finally(() => {
            setLoading(false);
        }
        )
    }

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}} >
                        <div className="w-100" style={{maxWidth: "400px"}}>

            <Card bg="dark" text="light">
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control id="email" type="email" ref={emailRef} required defaultValue={currentUser.email}/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control id="password" type="password" ref={passwordRef} placeholder="Leave blank to keep it same" />
                        </Form.Group>
                        <Form.Group id="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control id="confirmPassword" type="password" ref={confirmPasswordRef} placeholder="Leave blank to keep it same" />
                        </Form.Group>
                        <br></br>
                        <Button variant="danger" disabled={loading} className="w-100" type="submit">Update</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link className="link" to="/">Cancel</Link>
            </div>
            </div>
        </Container>
    )
}