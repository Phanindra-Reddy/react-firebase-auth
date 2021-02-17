import React,{useState, useRef} from 'react'
import {Card, Form, Button, Alert} from 'react-bootstrap';
import {Link,useHistory} from 'react-router-dom';
import {useAuth} from './AuthContext';


const UpdateProfile = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {currentUser, updateEmail, updatePassword} = useAuth();
    const history = useHistory();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    function onSubmitForm(e){
        e.preventDefault();
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match!!')
        }

        const promises = [];
        setLoading(true);
        setError('');
        if(emailRef.current.value !== currentUser.email.value){
            promises.push(updateEmail(emailRef.current.value));
        }
        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value));
        }

        Promise.all(promises).then(()=>{
            history.push('/')
        }).catch(()=>{
            setError('Failed to Update Pofile');
        }).finally(()=>{
            setLoading(false);
        })

    }


    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={onSubmitForm}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} placeholder="Email" defaultValue={currentUser.email}></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} placeholder="Password" required></Form.Control>
                        </Form.Group>
                        <Form.Group id="passwordConfirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} placeholder="Confirm Password"></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} type="submit" className="w-100">Update</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/">Cancel</Link>
            </div>
        </>
    )
}

export default UpdateProfile;
