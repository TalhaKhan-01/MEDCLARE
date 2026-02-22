import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getReport, verifyReport, editExplanation, getVersions, processReport } from '../api';
import { useTranslation } from 'react-i18next';

export default function DoctorReview() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [report, setReport] = useState(null);
    const [versions, setVersions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [editText, setEditText] = useState('');
    const [notes, setNotes] = useState('');
    const [actionLoading, setActionLoading] = useState('');

    useEffect(() => {
        Promise.all([getReport(id), getVersions(id)])
            .then(([rRes, vRes]) => {
                setReport(rRes.data);
                setVersions(vRes.data);
                setEditText(rRes.data.explanation_text || '');
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id]);

    const handleRegenerate = async () => {
        setActionLoading('regenerate');
        try {
            const res = await processReport(id, report.personalization_level, i18n.language);
            setReport(res.data);
            setEditText(res.data.explanation_text || '');
            const vRes = await getVersions(id);
            setVersions(vRes.data);
        } catch (err) {
            alert(err.response?.data?.detail || t('common.error'));
        } finally {
            setActionLoading('');
        }
    };

    const handleVerify = async (action) => {
        setActionLoading(action);
        try {
            const res = await verifyReport(id, action, notes);
            setReport(res.data);
            if (action === 'approve') {
                setTimeout(() => navigate('/dashboard'), 1000);
            }
        } catch (err) {
            alert(err.response?.data?.detail || t('common.error'));
        } finally {
            setActionLoading('');
        }
    };

    const handleEdit = async () => {
        setActionLoading('edit');
        try {
            const res = await editExplanation(id, editText, notes);
            setReport(res.data);
            setEditMode(false);
            const vRes = await getVersions(id);
            setVersions(vRes.data);
        } catch (err) {
            alert(err.response?.data?.detail || t('common.error'));
        } finally {
            setActionLoading('');
        }
    };

    if (loading) return <div className="loading-spinner"><div className="spinner" /></div>;
    if (!report) return <div className="page"><div className="container"><p>Report not found</p></div></div>;

    const abnormalFindings = (report.findings || []).filter(f => f.status !== 'normal');
    const langMismatch = report.lang && report.lang !== i18n.language;

    return (
        <div className="page">
            <div className="container">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                    <Link to="/dashboard" style={{ color: 'var(--color-text-muted)', fontSize: 'var(--fs-sm)' }}>← {t('report.backToReports')}</Link>
                </div>

                <div className="page-header">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h1 className="page-title">🩺 {t('dashboard.doctorTitle')}: {report.title}</h1>
                        {langMismatch && (
                            <button
                                className="btn btn-primary"
                                onClick={handleRegenerate}
                                disabled={!!actionLoading}
                                style={{ fontSize: 'var(--fs-xs)', padding: '0.4rem 0.8rem' }}
                            >
                                {actionLoading === 'regenerate' ? t('common.loading') : `✨ ${t('upload.analyzeBtn')}`}
                            </button>
                        )}
                    </div>
                    <div className="report-meta" style={{ marginTop: 'var(--space-2)' }}>
                        <span className={`badge status-${report.status}`}>{t(`upload.pipeline.${report.status}`) || report.status}</span>
                        {report.overall_confidence && (
                            <span className="badge badge-info">{Math.round(report.overall_confidence * 100)}% {t('landing.confidence').toLowerCase()}</span>
                        )}
                    </div>
                </div>

                {/* Quick Summary */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
                    <div className="card stat-card">
                        <div className="stat-label">{t('common.parameters') || 'Parameters'}</div>
                        <div className="stat-value" style={{ color: 'var(--color-accent-blue)' }}>{report.findings?.length || 0}</div>
                    </div>
                    <div className="card stat-card">
                        <div className="stat-label">{t('report.status.abnormal') || 'Abnormal'}</div>
                        <div className="stat-value" style={{ color: 'var(--color-accent-amber)' }}>{abnormalFindings.length}</div>
                    </div>
                    <div className="card stat-card">
                        <div className="stat-label">{t('report.versions') || 'Versions'}</div>
                        <div className="stat-value" style={{ color: 'var(--color-accent-purple)' }}>{versions.length}</div>
                    </div>
                    <div className="card stat-card">
                        <div className="stat-label">{t('report.table.status')}</div>
                        <div className="stat-value" style={{ color: report.verification_status === 'approved' ? 'var(--color-accent-green)' : 'var(--color-accent-amber)', fontSize: 'var(--fs-lg)' }}>
                            {report.verification_status === 'approved' ? t('dashboard.verified') : (report.verification_status || t('dashboard.pending'))}
                        </div>
                    </div>
                </div>

                {/* Findings Overview */}
                {abnormalFindings.length > 0 && (
                    <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
                        <h3 style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--fs-base)', fontWeight: 600 }}>⚠️ {t('report.status.abnormal') || 'Abnormal Findings'}</h3>
                        <table className="findings-table">
                            <thead>
                                <tr>
                                    <th>{t('report.table.parameter')}</th>
                                    <th>{t('report.table.value')}</th>
                                    <th>{t('report.table.range')}</th>
                                    <th>{t('report.table.status')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {abnormalFindings.map((f, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 500 }}>{f.test_name}</td>
                                        <td><span className={`finding-value ${f.status}`}>{f.value} {f.unit}</span></td>
                                        <td style={{ color: 'var(--color-text-muted)' }}>{f.reference_range}</td>
                                        <td>
                                            <span className={`badge badge-${f.status}`}>
                                                {f.status === 'critical' ? `⚠ ${t('report.status.critical') || 'Critical'}` :
                                                    f.status === 'high' ? `↑ ${t('report.status.high') || 'High'}` :
                                                        `↓ ${t('report.status.low') || 'Low'}`}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Explanation Review / Edit */}
                <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                        <h3 style={{ fontSize: 'var(--fs-base)', fontWeight: 600 }}>📝 {t('report.tabs.explanation')}</h3>
                        <button className="btn btn-ghost" onClick={() => setEditMode(!editMode)} style={{ fontSize: 'var(--fs-xs)' }}>
                            {editMode ? t('common.cancel') || 'Cancel' : `✏️ ${t('common.edit') || 'Edit'}`}
                        </button>
                    </div>
                    {editMode ? (
                        <div>
                            <textarea
                                className="input-field"
                                value={editText}
                                onChange={e => setEditText(e.target.value)}
                                rows={12}
                                style={{ width: '100%', fontFamily: 'var(--font-serif)', lineHeight: 1.8, resize: 'vertical' }}
                            />
                            <button className="btn btn-primary" onClick={handleEdit} disabled={actionLoading === 'edit'}
                                style={{ marginTop: 'var(--space-3)' }}>
                                {actionLoading === 'edit' ? t('common.loading') : t('common.save') || 'Save Edit'}
                            </button>
                        </div>
                    ) : (
                        <div style={{ fontFamily: 'var(--font-serif)', lineHeight: 1.8, fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)', whiteSpace: 'pre-wrap' }}>
                            {report.explanation_text || t('report.noExplanation') || 'No explanation generated yet.'}
                        </div>
                    )}
                </div>

                {/* Doctor Notes & Actions */}
                {report.status === 'explained' || report.status === 'edited' ? (
                    <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
                        <h3 style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--fs-base)', fontWeight: 600 }}>{t('report.verificationActions') || 'Verification Actions'}</h3>
                        <div className="input-group" style={{ marginBottom: 'var(--space-4)' }}>
                            <label>{t('report.doctorNotes') || 'Doctor Notes'}</label>
                            <textarea className="input-field" value={notes} onChange={e => setNotes(e.target.value)}
                                rows={3} placeholder={t('report.notesPlaceholder') || 'Add any notes for the patient...'} style={{ resize: 'vertical' }} />
                        </div>
                        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                            <button className="btn btn-success btn-lg" onClick={() => handleVerify('approve')}
                                disabled={!!actionLoading}>
                                {actionLoading === 'approve' ? t('common.loading') : `✓ ${t('report.approveBtn') || 'Approve'}`}
                            </button>
                            <button className="btn btn-danger" onClick={() => handleVerify('reject')}
                                disabled={!!actionLoading}>
                                {actionLoading === 'reject' ? t('common.loading') : `✗ ${t('report.rejectBtn') || 'Reject'}`}
                            </button>
                        </div>
                    </div>
                ) : report.verification_status === 'approved' ? (
                    <div className="verification-panel verification-approved">
                        <div className="verification-header">
                            <div className="verification-icon" style={{ background: 'var(--color-accent-green-dim)', color: 'var(--color-accent-green)' }}>✓</div>
                            <div>
                                <h3 style={{ fontSize: 'var(--fs-base)', fontWeight: 600, color: 'var(--color-accent-green)' }}>{t('dashboard.verified')}</h3>
                                <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)' }}>
                                    {t('report.verifiedOn')} {report.verified_at ? new Date(report.verified_at).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : null}

                {/* Version History */}
                {versions.length > 0 && (
                    <div className="card">
                        <h3 style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--fs-base)', fontWeight: 600 }}>📜 {t('report.versionHistory') || 'Version History'}</h3>
                        {versions.map((v, i) => (
                            <div key={v.id} style={{
                                padding: 'var(--space-4)', marginBottom: 'var(--space-3)',
                                background: 'var(--color-bg-card)', borderRadius: 'var(--radius-md)',
                                borderLeft: `3px solid ${v.edit_type === 'original' ? 'var(--color-accent-blue)' : 'var(--color-accent-purple)'}`
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                                    <span style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>{t('report.version')} {v.version}</span>
                                    <span className={`badge ${v.edit_type === 'original' ? 'badge-info' : 'badge-purple'}`}>
                                        {v.edit_type === 'original' ? t('report.original') || 'original' : t('report.edited') || 'edited'}
                                    </span>
                                </div>
                                <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-text-muted)' }}>
                                    {new Date(v.created_at).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
