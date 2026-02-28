import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getReport, processReport, getReportTrends, requestReview } from '../api';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

function MedicationsTable({ medications }) {
    const { t } = useTranslation();
    if (!medications || medications.length === 0) return null;

    return (
        <div className="findings-container">
            <div className="findings-header">
                <h2 className="findings-title">💊 {t('report.tabs.medications')}</h2>
                <span className="badge badge-purple">{medications.length} {t('common.items') || 'items'}</span>
            </div>
            <table className="findings-table">
                <thead>
                    <tr>
                        <th>{t('report.table.parameter')}</th>
                        <th>{t('report.dosage')}</th>
                        <th>{t('report.frequency')}</th>
                        <th>{t('report.duration')}</th>
                        <th>{t('report.instructions') || 'Instructions'}</th>
                    </tr>
                </thead>
                <tbody>
                    {medications.map((m, i) => (
                        <tr key={i}>
                            <td style={{ fontWeight: 600, color: 'var(--color-accent-blue)' }}>{m.name}</td>
                            <td>{m.dosage || 'N/A'}</td>
                            <td>{m.frequency || 'N/A'}</td>
                            <td>{m.duration || 'N/A'}</td>
                            <td style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-text-secondary)' }}>{m.instructions || 'None'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function FindingsTable({ findings }) {
    const { t } = useTranslation();
    if (!findings || findings.length === 0) return null;

    const grouped = {};
    findings.forEach(f => {
        const cat = f.category || 'General';
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(f);
    });

    return (
        <div className="findings-container">
            <div className="findings-header">
                <h2 className="findings-title">🔬 {t('report.tabs.findings')}</h2>
                <span className="badge badge-info">{findings.length} {t('common.parameters') || 'parameters'}</span>
            </div>
            {Object.entries(grouped).map(([category, catFindings]) => (
                <div key={category} style={{ marginBottom: 'var(--space-6)' }}>
                    <h3 style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {t(`report.categories.${category.toLowerCase().replace(/\s+/g, '_')}`) || category}
                    </h3>
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
                            {catFindings.map((f, i) => (
                                <tr key={i} id={`finding-${f.test_name?.replace(/\s+/g, '-')}`}>
                                    <td style={{ fontWeight: 500 }}>{f.test_name}</td>
                                    <td>
                                        <span className={`finding-value ${f.status}`}>
                                            {f.value} <span style={{ fontWeight: 400, opacity: 0.7 }}>{f.unit}</span>
                                        </span>
                                    </td>
                                    <td style={{ color: 'var(--color-text-muted)' }}>{f.reference_range || 'N/A'}</td>
                                    <td>
                                        <span className={`badge badge-${f.status}`}>
                                            {f.status === 'normal' ? `✓ ${t('report.status.normal') || 'Normal'}` :
                                                f.status === 'critical' ? `⚠ ${t('report.status.critical') || 'Critical'}` :
                                                    f.status === 'high' ? `↑ ${t('report.status.high') || 'High'}` :
                                                        `↓ ${t('report.status.low') || 'Low'}`}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

/* ── Feature 3: Source Mapping Tag ── */
function SourceTag({ mapping }) {
    if (!mapping) return null;
    const icons = { finding: '🧪', evidence: '📚', document: '📄' };
    const colors = {
        finding: 'var(--color-accent-blue)',
        evidence: 'var(--color-accent-green)',
        document: 'var(--color-accent-purple)'
    };

    const handleClick = (m) => {
        if (m.source_type === 'finding') {
            const el = document.getElementById(`finding-${m.source_ref?.replace(/\s+/g, '-')}`);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                el.style.transition = 'background 0.3s';
                el.style.background = 'rgba(59, 130, 246, 0.15)';
                setTimeout(() => { el.style.background = ''; }, 2000);
            }
        } else if (m.source_type === 'evidence') {
            const el = document.getElementById('citations-section');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: 'var(--space-2)' }}>
            {mapping.map((m, i) => (
                <button
                    key={i}
                    onClick={() => handleClick(m)}
                    title={`${m.source_type}: ${m.source_ref || ''}\n"${m.sentence || ''}"`}
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: '3px',
                        padding: '2px 6px', borderRadius: '4px', fontSize: '0.6rem',
                        background: 'rgba(255,255,255,0.05)', border: `1px solid ${colors[m.source_type] || 'var(--color-border)'}`,
                        color: colors[m.source_type] || 'var(--color-text-muted)',
                        cursor: 'pointer', transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.05)'}
                >
                    {icons[m.source_type] || '📌'} {m.source_ref || m.source_type}
                </button>
            ))}
        </div>
    );
}

/* ── Feature 4: Certainty Badge ── */
function CertaintyBadge({ level }) {
    if (!level) return null;
    const isEstablished = level === 'established';
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 600,
            background: isEstablished ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
            color: isEstablished ? 'var(--color-accent-green)' : 'var(--color-accent-amber)',
            border: `1px solid ${isEstablished ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
        }}>
            {isEstablished ? '🟢 Established Fact' : '🟡 AI Interpretation'}
        </span>
    );
}

/* ── Text-to-Speech: Hear Explanation ── */
function HearExplanation({ explanationText, sections, lang }) {
    const [speaking, setSpeaking] = useState(false);
    const [paused, setPaused] = useState(false);

    // Stop speech when navigating away from the page
    useEffect(() => {
        return () => {
            window.speechSynthesis?.cancel();
        };
    }, []);

    const buildFullText = () => {
        let text = '';
        if (explanationText) text += explanationText + '. ';
        if (sections) {
            sections.forEach(s => {
                text += (s.title || '') + '. ';
                // Strip citation markers like [1] for cleaner speech
                const clean = (s.content || '').replace(/\[\d+\]/g, '');
                text += clean + '. ';
            });
        }
        return text.trim();
    };

    const handlePlay = () => {
        if (!window.speechSynthesis) {
            alert('Sorry, your browser does not support text-to-speech.');
            return;
        }

        if (paused) {
            window.speechSynthesis.resume();
            setPaused(false);
            setSpeaking(true);
            return;
        }

        window.speechSynthesis.cancel();
        const fullText = buildFullText();
        if (!fullText) return;

        // Split into chunks of ~200 chars at sentence boundaries (browser limit workaround)
        const sentences = fullText.match(/[^.!?]+[.!?]+/g) || [fullText];
        const chunks = [];
        let current = '';
        sentences.forEach(s => {
            if ((current + s).length > 250) {
                if (current) chunks.push(current.trim());
                current = s;
            } else {
                current += s;
            }
        });
        if (current) chunks.push(current.trim());

        // Pick a voice matching the report language
        const voices = window.speechSynthesis.getVoices();
        const langCode = lang || 'en';
        const matchedVoice = voices.find(v => v.lang.startsWith(langCode)) || voices[0];

        let idx = 0;
        const speakNext = () => {
            if (idx >= chunks.length) {
                setSpeaking(false);
                setPaused(false);
                return;
            }
            const utter = new SpeechSynthesisUtterance(chunks[idx]);
            utter.rate = 0.9;   // Slightly slower for clarity
            utter.pitch = 1.0;
            if (matchedVoice) utter.voice = matchedVoice;
            utter.onend = () => { idx++; speakNext(); };
            utter.onerror = () => { setSpeaking(false); setPaused(false); };
            window.speechSynthesis.speak(utter);
        };

        setSpeaking(true);
        setPaused(false);
        speakNext();
    };

    const handlePause = () => {
        window.speechSynthesis.pause();
        setPaused(true);
        setSpeaking(false);
    };

    const handleStop = () => {
        window.speechSynthesis.cancel();
        setSpeaking(false);
        setPaused(false);
    };

    return (
        <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
            {!speaking && !paused && (
                <button onClick={handlePlay} className="btn btn-primary"
                    style={{ fontSize: 'var(--fs-sm)', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    🔊 Hear Explanation
                </button>
            )}
            {speaking && (
                <button onClick={handlePause} className="btn btn-ghost"
                    style={{ fontSize: 'var(--fs-sm)', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    ⏸️ Pause
                </button>
            )}
            {paused && (
                <button onClick={handlePlay} className="btn btn-primary"
                    style={{ fontSize: 'var(--fs-sm)', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    ▶️ Resume
                </button>
            )}
            {(speaking || paused) && (
                <button onClick={handleStop} className="btn btn-ghost"
                    style={{ fontSize: 'var(--fs-sm)', padding: '0.4rem 0.8rem', color: 'var(--color-accent-red)' }}>
                    ⏹ Stop
                </button>
            )}
            {speaking && (
                <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-accent-green)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-accent-green)', animation: 'pulse 1s infinite' }} />
                    Reading aloud...
                </span>
            )}
        </div>
    );
}

function ExplanationPanel({ sections, citations, explanationText, lang }) {
    const { t } = useTranslation();
    if (!sections && !explanationText) return null;

    return (
        <div className="explanation-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <h2 className="findings-title" style={{ margin: 0 }}>📋 {t('report.tabs.explanation')}</h2>
                <HearExplanation explanationText={explanationText} sections={sections} lang={lang} />
            </div>

            {explanationText && (
                <div className="card" style={{ marginBottom: 'var(--space-4)', fontFamily: 'var(--font-serif)', lineHeight: 1.8, fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)' }}>
                    {explanationText}
                </div>
            )}

            {sections && sections.map((section, i) => (
                <div key={i} className={`explanation-section severity-${section.severity || 'normal'}`}
                    style={section.certainty_level ? {
                        borderLeft: `3px solid ${section.certainty_level === 'established' ? 'var(--color-accent-green)' : 'var(--color-accent-amber)'}`
                    } : {}}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                        <h3 className="explanation-section-title">
                            {section.severity === 'concern' ? '⚠️' : section.severity === 'attention' ? '⚡' : '✓'} {section.title}
                        </h3>
                        <CertaintyBadge level={section.certainty_level} />
                    </div>
                    <div className="explanation-section-content">{section.content}</div>

                    {/* Feature 3: Source Mapping Tags */}
                    {section.source_mapping && section.source_mapping.length > 0 && (
                        <SourceTag mapping={section.source_mapping} />
                    )}

                    {section.findings_covered && (
                        <div style={{ marginTop: 'var(--space-3)', display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                            {section.findings_covered.map((f, j) => (
                                <span key={j} className="badge badge-purple" style={{ fontSize: '0.65rem' }}>{f}</span>
                            ))}
                        </div>
                    )}
                </div>
            ))}

            {citations && citations.length > 0 && (
                <div className="card" style={{ marginTop: 'var(--space-4)' }} id="citations-section">
                    <h4 style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, marginBottom: 'var(--space-3)', color: 'var(--color-text-muted)' }}>
                        📑 {t('report.sourcesCitations')}
                    </h4>
                    {citations.map((c, i) => (
                        <div key={i} style={{ marginBottom: 'var(--space-3)', paddingLeft: 'var(--space-4)', borderLeft: '2px solid var(--color-border)', fontSize: 'var(--fs-xs)', color: 'var(--color-text-secondary)' }}>
                            <strong style={{ color: 'var(--color-accent-blue)' }}>[{c.id || i + 1}]</strong> {c.source && <em>({c.source})</em>} {c.text}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function ConfidencePanel({ scores }) {
    const { t } = useTranslation();
    if (!scores) return null;
    const overall = Math.round((scores.overall || 0) * 100);
    const quality = scores.quality_label || 'moderate';

    return (
        <div className="confidence-container">
            <h2 className="findings-title" style={{ marginBottom: 'var(--space-4)' }}>📊 {t('report.confidenceAssessment') || 'Confidence Assessment'}</h2>
            <div className="card confidence-overall">
                <div className={`confidence-ring ${quality}`} style={{ '--pct': overall }}>
                    <span>{overall}%</span>
                </div>
                <div>
                    <div style={{ fontWeight: 600, fontSize: 'var(--fs-lg)', marginBottom: 'var(--space-1)' }}>
                        {quality === 'high' ? t('report.confidence.high') || 'High Confidence' :
                            quality === 'moderate' ? t('report.confidence.moderate') || 'Moderate Confidence' :
                                t('report.confidence.low') || 'Low Confidence'}
                    </div>
                    <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-sm)' }}>
                        {t('report.confidenceDesc')}
                    </div>
                </div>
            </div>
            {scores.stages && (
                <div className="confidence-stages">
                    {Object.entries(scores.stages).map(([key, val]) => (
                        <div key={key} className="confidence-stage">
                            <div className="confidence-stage-label">{t(`upload.pipeline.${key}`) || key.toUpperCase()}</div>
                            <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                                {Math.round(val * 100)}%
                            </div>
                            <div className="confidence-stage-bar">
                                <div className="confidence-stage-fill" style={{
                                    width: `${val * 100}%`,
                                    background: val >= 0.8 ? 'var(--color-accent-green)' : val >= 0.6 ? 'var(--color-accent-amber)' : 'var(--color-accent-red)'
                                }} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

/* ── Feature 2: Trends Panel ── */
function TrendsPanel({ trends }) {
    const { t } = useTranslation();
    if (!trends || !trends.has_history) return null;

    const directionIcon = (dir) => {
        if (dir === 'rising') return '📈';
        if (dir === 'falling') return '📉';
        return '➡️';
    };

    const directionColor = (dir, status) => {
        // Rising + high = bad, Rising + low = good, etc.
        if (status === 'high' || status === 'critical') {
            return dir === 'rising' ? 'var(--color-accent-red)' : dir === 'falling' ? 'var(--color-accent-green)' : 'var(--color-accent-blue)';
        }
        if (status === 'low') {
            return dir === 'falling' ? 'var(--color-accent-red)' : dir === 'rising' ? 'var(--color-accent-green)' : 'var(--color-accent-blue)';
        }
        return 'var(--color-accent-blue)';
    };

    return (
        <div style={{ marginBottom: 'var(--space-8)' }}>
            <h2 className="findings-title" style={{ marginBottom: 'var(--space-4)' }}>📈 {t('report.trends') || 'Historical Trends'}</h2>

            {/* Summary Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <div className="card stat-card">
                    <div className="stat-label">Reports</div>
                    <div className="stat-value" style={{ color: 'var(--color-accent-blue)' }}>{trends.report_count}</div>
                </div>
                <div className="card stat-card">
                    <div className="stat-label">Improving</div>
                    <div className="stat-value" style={{ color: 'var(--color-accent-green)' }}>{trends.improving_count || 0}</div>
                </div>
                <div className="card stat-card">
                    <div className="stat-label">Needs Attention</div>
                    <div className="stat-value" style={{ color: 'var(--color-accent-amber)' }}>{trends.worsening_count || 0}</div>
                </div>
                <div className="card stat-card">
                    <div className="stat-label">Stable</div>
                    <div className="stat-value" style={{ color: 'var(--color-text-secondary)' }}>{trends.stable_count || 0}</div>
                </div>
            </div>

            {/* Summary text */}
            <div className="card" style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)' }}>
                {trends.summary}
            </div>

            {/* Trends Table */}
            {trends.trends.length > 0 && (
                <div className="card">
                    <table className="findings-table">
                        <thead>
                            <tr>
                                <th>{t('report.table.parameter') || 'Parameter'}</th>
                                <th>Trend</th>
                                <th>Change</th>
                                <th>Current</th>
                                <th>Previous</th>
                                <th>Range</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trends.trends.map((tr, i) => (
                                <tr key={i}>
                                    <td style={{ fontWeight: 500 }}>{tr.parameter}</td>
                                    <td>
                                        <span style={{ fontSize: 'var(--fs-lg)' }}>{directionIcon(tr.direction)}</span>
                                        <span style={{
                                            marginLeft: '4px', fontSize: 'var(--fs-xs)', fontWeight: 600,
                                            color: directionColor(tr.direction, tr.current_status),
                                            textTransform: 'capitalize'
                                        }}>
                                            {tr.direction}
                                        </span>
                                    </td>
                                    <td>
                                        <span style={{
                                            fontWeight: 600,
                                            color: directionColor(tr.direction, tr.current_status)
                                        }}>
                                            {tr.change_percent > 0 ? '+' : ''}{tr.change_percent}%
                                        </span>
                                    </td>
                                    <td>{tr.current_value} {tr.unit}</td>
                                    <td style={{ color: 'var(--color-text-muted)' }}>{tr.previous_value} {tr.unit}</td>
                                    <td style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-text-muted)' }}>
                                        {tr.stats && `${tr.stats.min} — ${tr.stats.max}`}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

function VerificationStatus({ report }) {
    const { t } = useTranslation();
    if (!report.verification_status && report.status !== 'explained') return null;

    const isVerified = report.verification_status === 'approved';
    const isRejected = report.verification_status === 'rejected' || report.verification_status === 'reject';
    const isPending = !report.verification_status && report.status === 'explained';

    return (
        <div className={`verification-panel ${isVerified ? 'verification-approved' : isPending ? 'verification-pending' : 'verification-rejected'}`}>
            <div className="verification-header">
                <div className="verification-icon" style={{
                    background: isVerified ? 'var(--color-accent-green-dim)' : isPending ? 'var(--color-accent-amber-dim)' : 'var(--color-accent-red-dim)',
                    color: isVerified ? 'var(--color-accent-green)' : isPending ? 'var(--color-accent-amber)' : 'var(--color-accent-red)'
                }}>
                    {isVerified ? '✓' : isPending ? '⏳' : '✗'}
                </div>
                <div>
                    <h3 style={{ fontSize: 'var(--fs-base)', fontWeight: 600 }}>
                        {isVerified ? t('report.doctorVerified') : isPending ? t('report.pendingVerification') || 'Pending Verification' : t('report.needsRevision') || 'Needs Revision'}
                    </h3>
                    <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)' }}>
                        {isVerified
                            ? `${t('report.verifiedOn') || 'Verified on'} ${new Date(report.verified_at).toLocaleDateString()}`
                            : isPending
                                ? t('report.pendingDesc') || 'This interpretation is awaiting professional review'
                                : t('report.rejectedDesc') || 'A healthcare professional has requested changes'}
                    </p>
                </div>
            </div>
            {report.doctor_notes && (
                <div style={{ padding: 'var(--space-4)', background: 'rgba(0,0,0,0.15)', borderRadius: 'var(--radius-md)', fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                    "{report.doctor_notes}"
                </div>
            )}
        </div>
    );
}

function ReviewRequestPanel({ report, onRequested }) {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const [note, setNote] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            await requestReview(report.id, note);
            onRequested();
            setShowModal(false);
        } catch (err) {
            alert(err.response?.data?.detail || 'Failed to request review');
        } finally {
            setSubmitting(false);
        }
    };

    if (report.review_requested) {
        return (
            <div className="card" style={{ marginBottom: 'var(--space-6)', borderLeft: '4px solid var(--color-accent-purple)' }}>
                <h3 style={{ fontSize: 'var(--fs-base)', fontWeight: 600, color: 'var(--color-accent-purple)', marginBottom: 'var(--space-2)' }}>
                    🏥 {t('report.reviewStatus') || 'Review Requested'}
                </h3>
                {report.patient_note && (
                    <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                        "{report.patient_note}"
                    </div>
                )}
            </div>
        );
    }

    return (
        <div style={{ marginBottom: 'var(--space-6)' }}>
            <button className="btn btn-primary" onClick={() => setShowModal(true)} style={{ width: '100%', background: 'var(--color-accent-purple)', borderColor: 'var(--color-accent-purple)', justifyContent: 'center', height: '3.5rem' }}>
                衣 Request Doctor Interpretation
            </button>

            {showModal && (
                <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-6)' }}>
                    <div className="card" style={{ maxWidth: '500px', width: '100%', padding: 'var(--space-6)' }}>
                        <h2 style={{ marginBottom: 'var(--space-4)' }}>Ask a Doctor</h2>
                        <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                            Your report will be shared with our medical professional. Add a specific question or concern below:
                        </p>
                        <textarea
                            className="input-field"
                            style={{ width: '100%', minHeight: '120px', marginBottom: 'var(--space-4)', padding: 'var(--space-3)' }}
                            placeholder="e.g. I'm worried about my Hemoglobin levels being slightly low..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end' }}>
                            <button className="btn btn-ghost" onClick={() => setShowModal(false)} disabled={submitting}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting || !note.trim()}>
                                {submitting ? 'Sending...' : 'Send to Doctor'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ReportView() {
    const { id } = useParams();
    const { user } = useAuth();
    const { t, i18n } = useTranslation();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reprocessing, setReprocessing] = useState(false);
    const [trends, setTrends] = useState(null);

    useEffect(() => {
        Promise.all([
            getReport(id),
            getReportTrends(id).catch(() => ({ data: null }))
        ])
            .then(([rRes, tRes]) => {
                setReport(rRes.data);
                setTrends(tRes.data);
            })
            .catch(err => setError(err.response?.data?.detail || t('common.error')))
            .finally(() => setLoading(false));
    }, [id, t]);

    const handleRegenerate = async () => {
        setReprocessing(true);
        try {
            const res = await processReport(id, report.personalization_level, i18n.language);
            setReport(res.data);
            // Refresh trends after reprocessing
            const tRes = await getReportTrends(id).catch(() => ({ data: null }));
            setTrends(tRes.data);
        } catch (err) {
            alert(err.response?.data?.detail || t('common.error'));
        } finally {
            setReprocessing(false);
        }
    };

    if (loading) return <div className="loading-spinner"><div className="spinner" /></div>;
    if (error) return (
        <div className="page"><div className="container">
            <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
                <p style={{ color: 'var(--color-accent-red)' }}>{error}</p>
                <Link to="/dashboard" className="btn btn-ghost" style={{ marginTop: '1rem' }}>{t('report.backToReports')}</Link>
            </div>
        </div></div>
    );

    const langMismatch = report.lang && report.lang !== i18n.language;

    return (
        <div className="page">
            <div className="container">
                {/* Report Header */}
                <div className="report-header">
                    <div className="report-header-info">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                            <Link to="/dashboard" style={{ color: 'var(--color-text-muted)', fontSize: 'var(--fs-sm)' }}>← {t('navbar.reports')}</Link>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <h1>{report.title}</h1>
                            {langMismatch && (
                                <button
                                    className="btn btn-primary"
                                    onClick={handleRegenerate}
                                    disabled={reprocessing}
                                    style={{ fontSize: 'var(--fs-xs)', padding: '0.4rem 0.8rem' }}
                                >
                                    {reprocessing ? t('common.loading') : `✨ ${t('upload.analyzeBtn')}`}
                                </button>
                            )}
                        </div>
                        <div className="report-meta">
                            <span className="report-meta-item">📅 {new Date(report.created_at).toLocaleDateString()}</span>
                            <span className={`badge status-${report.status}`}>{t(`upload.pipeline.${report.status}`) || report.status}</span>
                            <span className="badge badge-ghost" style={{ textTransform: 'uppercase', fontSize: '0.65rem' }}>
                                {report.report_type?.replace('_', ' ')}
                            </span>
                            {report.ocr_confidence && (
                                <span className="report-meta-item">🔍 {t('upload.pipeline.ocr')}: {Math.round(report.ocr_confidence * 100)}%</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* 1. Verification Status */}
                <VerificationStatus report={report} />

                {/* 1.5. Review Request (Option C) */}
                {user.role === 'patient' && (
                    <ReviewRequestPanel report={report} onRequested={() => getReport(id).then(res => setReport(res.data))} />
                )}

                {user.role === 'doctor' && report.review_requested && (
                    <div className="card" style={{ marginBottom: 'var(--space-6)', borderLeft: '4px solid var(--color-accent-purple)' }}>
                        <h3 style={{ fontSize: 'var(--fs-base)', fontWeight: 600, color: 'var(--color-accent-purple)', marginBottom: 'var(--space-2)' }}>
                            📩 Patient's Note
                        </h3>
                        <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                            "{report.patient_note || 'No specific note provided.'}"
                        </div>
                    </div>
                )}

                {/* 2. Structured Findings / Medications */}
                {report.report_type === 'prescription' ? (
                    <MedicationsTable medications={report.medications} />
                ) : (
                    <FindingsTable findings={report.findings} />
                )}

                {/* 3. Grounded Explanation (with Evidence Annotations + Certainty Badges) */}
                <ExplanationPanel
                    sections={report.explanation_sections}
                    citations={report.citations}
                    explanationText={report.explanation_text}
                    lang={report.lang || i18n.language}
                />

                {/* 4. Confidence Assessment */}
                <ConfidencePanel scores={report.confidence_scores} />

                {/* 5. Historical Trends (Feature 2) */}
                <TrendsPanel trends={trends} />

                {/* 6. Guardrail Flags */}
                {report.guardrail_flags && report.guardrail_flags.length > 0 && (
                    <div className="card" style={{ marginBottom: 'var(--space-8)' }}>
                        <h3 style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, marginBottom: 'var(--space-3)', color: 'var(--color-text-muted)' }}>
                            🛡️ {t('report.trustSafety')}
                        </h3>
                        {report.guardrail_flags.map((flag, i) => (
                            <div key={i} style={{
                                padding: 'var(--space-3)', marginBottom: 'var(--space-2)',
                                background: flag.severity === 'warning' ? 'var(--color-accent-amber-dim)' : 'var(--color-accent-blue-dim)',
                                borderRadius: 'var(--radius-md)', fontSize: 'var(--fs-xs)'
                            }}>
                                <strong style={{ color: flag.severity === 'warning' ? 'var(--color-accent-amber)' : 'var(--color-accent-blue)' }}>
                                    {flag.type}
                                </strong>: {flag.message}
                            </div>
                        ))}
                    </div>
                )}

                {/* 7. Disclaimer */}
                <div className="disclaimer">
                    <span className="disclaimer-icon">⚠️</span>
                    <div>
                        <strong style={{ color: 'var(--color-accent-amber)' }}>{t('report.disclaimerTitle') || 'Medical Disclaimer'}</strong>
                        <p style={{ marginTop: 'var(--space-1)' }}>
                            {t('report.disclaimerDesc') || 'This interpretation is generated by an AI system...'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
