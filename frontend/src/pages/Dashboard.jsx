import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listReports } from '../api';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
    const { user } = useAuth();
    const { t } = useTranslation();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        listReports()
            .then(res => setReports(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const stats = {
        total: reports.length,
        verified: reports.filter(r => r.verification_status === 'approved').length,
        pending: reports.filter(r => r.status === 'explained' && !r.verification_status).length,
        processing: reports.filter(r => ['uploaded', 'processing', 'extracted'].includes(r.status)).length
    };

    const formatDate = (d) => new Date(d).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
    });

    if (loading) return <div className="loading-spinner"><div className="spinner" /></div>;

    return (
        <div className="page">
            <div className="container">
                <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 className="page-title">
                            {user.role === 'doctor' ? t('dashboard.doctorTitle') : t('dashboard.title')}
                        </h1>
                        <p className="page-subtitle">
                            {user.role === 'doctor'
                                ? t('dashboard.doctorSubtitle')
                                : t('dashboard.subtitle')}
                        </p>
                    </div>
                    <Link to="/upload" className="btn btn-primary">
                        + {t('dashboard.uploadBtn')}
                    </Link>
                </div>

                <div className="dashboard-stats">
                    {[
                        { label: t('dashboard.total'), value: stats.total, color: 'var(--color-accent-blue)' },
                        { label: t('dashboard.verified'), value: stats.verified, color: 'var(--color-accent-green)' },
                        { label: t('dashboard.pending'), value: stats.pending, color: 'var(--color-accent-amber)' },
                        { label: t('dashboard.processing'), value: stats.processing, color: 'var(--color-accent-purple)' }
                    ].map((s, i) => (
                        <div key={i} className="card stat-card">
                            <div className="stat-label">{s.label}</div>
                            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
                        </div>
                    ))}
                </div>

                {reports.length === 0 ? (
                    <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
                        <h3 style={{ marginBottom: '0.5rem' }}>{t('dashboard.noReports')}</h3>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                            {t('dashboard.uploadFirst')}
                        </p>
                        <Link to="/upload" className="btn btn-primary">{t('dashboard.uploadBtn')}</Link>
                    </div>
                ) : (
                    <div className="reports-grid">
                        {reports.map(report => (
                            <Link
                                key={report.id}
                                to={user.role === 'doctor' ? `/review/${report.id}` : `/report/${report.id}`}
                                className="report-row"
                            >
                                <div>
                                    <div className="report-row-title">{report.title}</div>
                                    <div className="report-row-date">{formatDate(report.created_at)}</div>
                                </div>
                                <span className={`badge status-${report.status}`}>
                                    {t(`upload.pipeline.${report.status}`) || report.status}
                                </span>
                                {report.verification_status && (
                                    <span className={`badge ${report.verification_status === 'approved' ? 'badge-normal' : 'badge-critical'
                                        }`}>
                                        {report.verification_status === 'approved' ? `✓ ${t('dashboard.verified')}` : `✗ Rejected`}
                                    </span>
                                )}
                                {report.overall_confidence && (
                                    <span className="badge badge-info">
                                        {Math.round(report.overall_confidence * 100)}% {t('landing.confidence').toLowerCase()}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
