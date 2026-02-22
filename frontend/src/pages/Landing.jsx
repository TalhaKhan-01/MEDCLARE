import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Landing() {
    const { t } = useTranslation();

    return (
        <div className="landing-hero">
            <div className="landing-content">
                <div className="landing-badge">
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-accent-green)', display: 'inline-block' }} />
                    {t('landing.badge')}
                </div>

                <h1 className="landing-title">
                    {t('landing.title').split(' Clarity')[0]} <span>{t('landing.title').includes(' Clarity') || t('landing.title').includes('स्पष्टता') ? (t('landing.title').includes(' Clarity') ? 'Clarity' : 'स्पष्टता') : 'Clarity'}</span>
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
