import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';

import './LoginFormPage.css';

function LoginFormPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const sessionUser = useSelector(state => state.session.user);
    // const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    //Reset the state when the component is rendered
    useEffect(() => {
        sessionUser && navigate('/dashboard');
        setCredential('');
        setPassword('');
        setErrors({});
    }, []);

    useEffect(() => {
        const newErrors = {};
        if (credential.length > 0 && credential.length < 4) {
            newErrors.credential = 'Username or Email must be 4 characters or longer';
        }
        if (password.length > 0 && password.length < 6) {
            newErrors.password = 'Password must be 6 characters or longer';
        }
        setErrors(newErrors);
        // setIsButtonDisabled(credential.length < 4 || password.length < 6);
    }, [credential, password]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        dispatch(sessionActions.login({ credential, password }))
            .then(() => navigate('/dashboard'))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    }

    return (
        <main>
            <section className='left-section'>
                <div className="logo">
                    <img src="../../../dist/assets/horizontal-logo-white.png" alt="logo" />
                </div>
                <aside className="left-text">
                    <aside>SMART Ticketing</aside>
                    <p className='left-text-description'>
                        This is a Ticket Management System for IT Businesses that handle on Site installations and Troubleshooting
                    </p>
                </aside>
            </section>
            <section className='right-section'>
                <img className='right-section-logo' src="../../../dist/assets/horizontal-logo-white.png" alt="logo" />
                <div className='form-container'>
                    <form className="login-form">
                        <label>
                            Username or Email
                            <input type="text" name="credential" value={credential} onChange={(e) => setCredential(e.target.value)} />
                        </label>
                        <label>
                            Password
                            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        <button type="submit" onClick={(e) => handleSubmit(e)}>Log In</button>
                    </form>
                    {errors.message && (
                        <p className='error-message'>{errors.message}</p>
                    )}
                </div>
            </section>
        </main>
    );
}

export default LoginFormPage;