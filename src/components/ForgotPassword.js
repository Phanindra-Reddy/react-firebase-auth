import React,{useState, useRef} from 'react'
import {Card, Form, Button, Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useAuth} from './AuthContext';


const ForgotPassword = () => {
    const emailRef = useRef();

    const {forgotPassword} = useAuth();

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    async function onSubmitForm(e){
        e.preventDefault();
        
        try{
            setMessage('')
            setError('')
            setLoading(true)
            await forgotPassword(emailRef.current.value)
            setMessage('Check E-mail for further instructions.')
            
        }catch{
            setError('Failed to reset password')
        }
        setLoading(false)
    }


    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={onSubmitForm}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} placeholder="Email" required></Form.Control>
                        </Form.Group>
                        
                        <Button type="submit" className="w-100">Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center mt-2">
                        <Link to="/login">Log In</Link>
                    </div>
                </Card.Body>
            </Card>
            <div disabled={loading} className="w-100 text-center mt-2">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}

export default ForgotPassword;
