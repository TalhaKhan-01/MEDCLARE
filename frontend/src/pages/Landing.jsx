import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Aurora from '../components/Visuals/Aurora/Aurora';

export default function Landing() {
    const { t } = useTranslation();

    return (
        <div className="landing-hero" style={{ position: 'relative', overflow: 'hidden', background: 'var(--color-bg-primary)' }}>
            {/* Animated Aurora Background */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.5 }}>
                <Aurora
                    colorStops={['#0D9488', '#F59E0B', '#134E4A']}
                    amplitude={1.2}
                    speed={0.5}
                />
            </div>

            {/* Background Watermark */}
            <img src="/Logo.png" alt="" style={{
                position: 'absolute',
                top: '10%',
                right: '-5%',
                width: '600px',
                height: '600px',
                opacity: 0.02,
                filter: 'grayscale(100%) contrast(0.5) blur(1px)',
                pointerEvents: 'none',
                zIndex: 1,
                transform: 'rotate(-15deg)'
            }} />

            <div className="landing-content" style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 'var(--space-10)' }}>
                    <img src="/Logo.png" alt="MEDCLARE Logo" style={{
                        width: '120px', height: 'auto',
                        objectFit: 'contain',
                        marginBottom: 'var(--space-4)',
                        filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5))'
                    }} />
                    <div className="brand-identity-stack">
                        <span className="navbar-logo-text" style={{ fontSize: 'var(--fs-3xl)' }}>MEDCLARE</span>
                        <span className="brand-tagline" style={{ fontSize: 'var(--fs-base)', letterSpacing: '0.2em' }}>YOUR HEALTH, CLARIFIED</span>
                    </div>
                </div>

                <div className="landing-badge">
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-accent-green)', display: 'inline-block' }} />
                    {t('landing.badge')}
                </div>

                <h1 className="landing-title">
                    {t('landing.title').split(' Clarity')[0]} <span>Clarity</span>
                </h1>

                <p className="landing-description">
                    {t('landing.description')}
                </p>

                <div className="landing-cta">
                    <Link to="/register" className="btn btn-primary btn-lg">{t('common.getStarted')}</Link>
                    <Link to="/login" className="btn btn-ghost btn-lg">{t('common.signIn')}</Link>
                </div>

                <div className="landing-features">
                    <div className="landing-feature">
                        <div className="landing-feature-icon" style={{ background: 'var(--color-accent-blue-dim)', color: 'var(--color-accent-blue)' }}>
                            🔬
                        </div>
                        <h3>{t('landing.feature1Title')}</h3>
                        <p>{t('landing.feature1Desc')}</p>
                    </div>
                    <div className="landing-feature">
                        <div className="landing-feature-icon" style={{ background: 'var(--color-accent-green-dim)', color: 'var(--color-accent-green)' }}>
                            📋
                        </div>
                        <h3>{t('landing.feature2Title')}</h3>
                        <p>{t('landing.feature2Desc')}</p>
                    </div>
                    <div className="landing-feature">
                        <div className="landing-feature-icon" style={{ background: 'var(--color-accent-purple-dim)', color: 'var(--color-accent-purple)' }}>
                            ✓
                        </div>
                        <h3>{t('landing.feature3Title')}</h3>
                        <p>{t('landing.feature3Desc')}</p>
                    </div>
                </div>

                <div style={{
                    marginTop: 'var(--space-12)',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 'var(--space-8)',
                    flexWrap: 'wrap'
                }}>
                    {[
                        { label: t('landing.confidence'), icon: '📊' },
                        { label: t('landing.citations'), icon: '📑' },
                        { label: t('landing.safety'), icon: '🛡️' },
                        { label: t('landing.personalized'), icon: '🎯' }
                    ].map((item, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            fontSize: '0.8125rem', color: 'var(--color-text-muted)'
                        }}>
                            <span>{item.icon}</span> {item.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
