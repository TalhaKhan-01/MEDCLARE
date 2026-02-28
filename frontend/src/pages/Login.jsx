import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as loginApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import Particles from '../components/Visuals/Particles/Particles';

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
        <div className="auth-page" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <Particles
                    particleCount={150}
                    particleSpread={15}
                    speed={0.2}
                    particleColors={['#ffffff', '#0D9488', '#F59E0B']}
                    moveParticlesOnHover={true}
                    particleHoverFactor={2}
                    alphaParticles={true}
                />
            </div>
            <div className="auth-card card" style={{ position: 'relative', zIndex: 1 }}>
                <div className="auth-header">
                    <div className="navbar-logo" style={{ justifyContent: 'center', marginBottom: '2rem' }}>
                        <img src="/Logo.png" alt="MEDCLARE" style={{ height: '64px', width: 'auto', objectFit: 'contain' }} />
                        <div className="brand-identity-stack" style={{ textAlign: 'left' }}>
                            <span className="navbar-logo-text" style={{ fontSize: 'var(--fs-2xl)' }}>MEDCLARE</span>
                            <span className="brand-tagline" style={{ fontSize: '0.75rem' }}>YOUR HEALTH, CLARIFIED</span>
                        </div>
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
