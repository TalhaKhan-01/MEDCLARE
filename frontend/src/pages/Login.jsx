import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as loginApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

export default function Login() {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await loginApi({ email, password });
            loginUser(res.data.access_token, res.data.user);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.detail || t('common.error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card card">
                <div className="auth-header">
                    <div className="navbar-logo" style={{ justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <div className="navbar-logo-icon">M</div>
                        <span className="navbar-logo-text">MEDCLARE</span>
                    </div>
                    <h2 className="auth-title">{t('auth.welcomeBack')}</h2>
                    <p className="auth-subtitle">{t('auth.signInSubtitle')}</p>
                </div>
                <form className="auth-form" onSubmit={handleSubmit}>
                    {error && (
                        <div style={{
                            padding: '0.75rem 1rem', background: 'var(--color-accent-red-dim)',
                            borderRadius: 'var(--radius-md)', color: 'var(--color-accent-red)',
                            fontSize: 'var(--fs-sm)'
                        }}>{error}</div>
                    )}
                    <div className="input-group">
                        <label>{t('auth.email')}</label>
                        <input className="input-field" type="email" value={email}
                            onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
                    </div>
                    <div className="input-group">
                        <label>{t('auth.password')}</label>
                        <input className="input-field" type="password" value={password}
                            onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}
                        disabled={loading}>{loading ? t('common.loading') : t('common.signIn')}</button>
                </form>
                <p className="auth-footer">
                    {t('auth.noAccount')} <Link to="/register">{t('auth.createOne')}</Link>
                </p>
            </div>
        </div>
    );
}
