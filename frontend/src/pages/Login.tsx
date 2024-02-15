import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from "../context/AuthContext";
import AuthService from "../services/AuthService";
import {User} from "../model/User";

const Login: React.FC = () => {
    const {loginUser} = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const user: User = await AuthService.login(email, password);
            if (user) {
                loginUser(user);
                navigate('/');
            }
        } catch (e) {
            setError('Failed to log in. Please check your credentials.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header fw-bold">Login</div>
                        <div className="card-body">
                            {error && <div className="alert alert-danger" role="alert">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" value={email}
                                           onChange={e => setEmail(e.target.value)} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" value={password}
                                           onChange={e => setPassword(e.target.value)} required/>
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
