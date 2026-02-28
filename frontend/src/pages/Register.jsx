import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register as registerApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import Particles from '../components/Visuals/Particles/Particles';

export default function Register() {
    const { t } = useTranslation();
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'patient' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await registerApi(form);
            loginUser(res.data.access_token, res.data.user);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.detail || t('common.error'));
        } finally {
            setLoading(false);
        }
    };

    const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

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
                    <h2 className="auth-title">{t('auth.createAccount')}</h2>
                    <p className="auth-subtitle">{t('auth.registerSubtitle')}</p>
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
                        <label>{t('auth.fullName')}</label>
                        <input className="input-field" value={form.name}
                            onChange={e => update('name', e.target.value)} placeholder="Your full name" required />
                    </div>
                    <div className="input-group">
                        <label>{t('auth.email')}</label>
                        <input className="input-field" type="email" value={form.email}
                            onChange={e => update('email', e.target.value)} placeholder="you@example.com" required />
                    </div>
                    <div className="input-group">
                        <label>{t('auth.password')}</label>
                        <input className="input-field" type="password" value={form.password}
                            onChange={e => update('password', e.target.value)} placeholder={t('auth.passwordHint')} required minLength={6} />
                    </div>
                    <div className="input-group">
                        <label>{t('auth.roleLabel')}</label>
                        <div className="role-select">
                            <button type="button" className={`role-option ${form.role === 'patient' ? 'active' : ''}`}
                                onClick={() => update('role', 'patient')}>
                                <div className="role-option-icon">👤</div>
                                <div className="role-option-label">{t('common.patient')}</div>
                            </button>
                            <button type="button" className={`role-option ${form.role === 'doctor' ? 'active' : ''}`}
                                onClick={() => update('role', 'doctor')}>
                                <div className="role-option-icon">🩺</div>
                                <div className="role-option-label">{t('common.doctor')}</div>
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}
                        disabled={loading}>{loading ? t('common.loading') : t('common.getStarted')}</button>
                </form>
                <p className="auth-footer">
                    {t('auth.haveAccount')} <Link to="/login">{t('auth.signInLink')}</Link>
                </p>
            </div>
        </div>
    );
}
