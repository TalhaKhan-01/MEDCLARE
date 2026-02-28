import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();
    const year = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="footer-inner">
                <div className="footer-brand">
                    <Link to="/" className="footer-logo">
                        <img src="/Logo.png" alt="MEDCLARE" />
                        <span>MEDCLARE</span>
                    </Link>
                    <p className="footer-tagline">
                        Safe, transparent medical report interpretation powered by grounded AI reasoning.
                    </p>
                </div>
                <div className="footer-links">
                    <div className="footer-col">
                        <h4>Platform</h4>
                        <Link to="/dashboard">{t('navbar.reports') || 'Reports'}</Link>
                        <Link to="/upload">{t('navbar.upload') || 'Upload'}</Link>
                    </div>
                    <div className="footer-col">
                        <h4>Features</h4>
                        <span>AI Interpretation</span>
                        <span>Doctor Verification</span>
                        <span>Trend Analysis</span>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© {year} MEDCLARE. All rights reserved.</p>
                <p style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                    Not a substitute for professional medical advice.
                </p>
            </div>
        </footer>
    );
}
