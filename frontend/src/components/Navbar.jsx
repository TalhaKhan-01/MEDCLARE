import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
    const { user, logout } = useAuth();
    const { t, i18n } = useTranslation();

    const languages = [
        { code: 'en', name: 'English', icon: '🇺🇸' },
        { code: 'hi', name: 'हिन्दी', icon: '🇮🇳' },
        { code: 'te', name: 'తెలుగు', icon: '🇮🇳' },
        { code: 'ta', name: 'தமிழ்', icon: '🇮🇳' },
        { code: 'or', name: 'ଓଡ଼ିଆ', icon: '🇮🇳' },
        { code: 'ml', name: 'മലയാളം', icon: '🇮🇳' },
        { code: 'bn', name: 'বাংলা', icon: '🇮🇳' },
        { code: 'pa', name: 'ਪੰਜਾਬੀ', icon: '🇮🇳' },
        { code: 'mr', name: 'मराठी', icon: '🇮🇳' }
    ];

    if (!user) return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link to="/" className="navbar-logo">
                    <div className="navbar-logo-icon">M</div>
                    <span className="navbar-logo-text">MEDCLARE</span>
                </Link>
                <div className="navbar-nav">
                    <div className="lang-switcher">
                        <select
                            value={i18n.language}
                            onChange={(e) => i18n.changeLanguage(e.target.value)}
                            className="lang-select"
                        >
                            {languages.map(lang => (
                                <option key={lang.code} value={lang.code}>
                                    {lang.icon} {lang.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </nav>
    );

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link to="/dashboard" className="navbar-logo">
                    <div className="navbar-logo-icon">M</div>
                    <span className="navbar-logo-text">MEDCLARE</span>
                </Link>
                <ul className="navbar-nav">
                    <li><Link to="/dashboard" className="navbar-link">{t('navbar.reports')}</Link></li>
                    <li><Link to="/upload" className="navbar-link">{t('navbar.upload')}</Link></li>
                    <li className="navbar-user">
                        <div className="lang-switcher" style={{ marginRight: '1rem' }}>
                            <select
                                value={i18n.language}
                                onChange={(e) => i18n.changeLanguage(e.target.value)}
                                className="lang-select"
                            >
                                {languages.map(lang => (
                                    <option key={lang.code} value={lang.code}>
                                        {lang.icon} {lang.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginRight: '1rem' }}>
                            {user.role === 'doctor' ? '' : '👤'} {user.name}
                        </span>
                        <button
                            onClick={logout}
                            className="btn btn-ghost"
                            style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}
                        >
                            {t('navbar.signOut')}
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
