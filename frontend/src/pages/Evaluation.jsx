import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listReports, runEvaluation, getEvaluationBenchmark } from '../api';
import { useTranslation } from 'react-i18next';

function ScoreCard({ label, value, icon, color }) {
    const pct = Math.round(value * 100);
    return (
        <div className="card stat-card">
            <div className="stat-label">{icon} {label}</div>
            <div className="stat-value" style={{ color }}>{pct}%</div>
            <div style={{
                height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.1)',
                marginTop: 'var(--space-2)', overflow: 'hidden'
            }}>
                <div style={{
                    height: '100%', width: `${pct}%`, borderRadius: '2px',
                    background: color, transition: 'width 0.6s ease'
                }} />
            </div>
        </div>
    );
}

function GradeBadge({ grade }) {
    const colors = { A: '#10b981', B: '#3b82f6', C: '#f59e0b', D: '#f97316', F: '#ef4444' };
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '48px', height: '48px', borderRadius: 'var(--radius-lg)',
            background: colors[grade] || '#6b7280', color: '#fff',
            fontWeight: 700, fontSize: 'var(--fs-xl)'
        }}>
            {grade}
        </span>
    );
}

export default function Evaluation() {
    const { t } = useTranslation();
    const [reports, setReports] = useState([]);
    const [benchmark, setBenchmark] = useState([]);
    const [selectedReport, setSelectedReport] = useState('');
    const [goldStandard, setGoldStandard] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        Promise.all([listReports(), getEvaluationBenchmark()])
            .then(([rRes, bRes]) => {
                const processedReports = rRes.data.filter(r =>
                    ['explained', 'verified', 'edited'].includes(r.status)
                );
                setReports(processedReports);
                setBenchmark(bRes.data);
            })
            .catch(console.error)
            .finally(() => setPageLoading(false));
    }, []);

    const handleRun = async () => {
        if (!selectedReport) return;
        setLoading(true);
        setResult(null);
        try {
            const res = await runEvaluation(selectedReport, goldStandard || null);
            setResult(res.data);
            // Refresh benchmark
            const bRes = await getEvaluationBenchmark();
            setBenchmark(bRes.data);
        } catch (err) {
            alert(err.response?.data?.detail || 'Evaluation failed');
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) return <div className="loading-spinner"><div className="spinner" /></div>;

    return (
        <div className="page">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">🧪 AI Output Evaluation</h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-sm)' }}>
                        Evaluate AI-generated explanations for quality, safety, and groundedness
                    </p>
                </div>

                {/* Run Evaluation Form */}
                <div className="card" style={{ marginBottom: 'var(--space-8)' }}>
                    <h3 style={{ fontSize: 'var(--fs-base)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                        Run New Evaluation
                    </h3>
                    <div className="input-group" style={{ marginBottom: 'var(--space-4)' }}>
                        <label>Select Report</label>
                        <select
                            className="input-field"
                            value={selectedReport}
                            onChange={e => setSelectedReport(e.target.value)}
                        >
                            <option value="">— Choose a processed report —</option>
                            {reports.map(r => (
                                <option key={r.id} value={r.id}>
                                    {r.title} ({new Date(r.created_at).toLocaleDateString()}) — {r.status}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group" style={{ marginBottom: 'var(--space-4)' }}>
                        <label>Gold Standard Reference (Optional)</label>
                        <textarea
                            className="input-field"
                            value={goldStandard}
                            onChange={e => setGoldStandard(e.target.value)}
                            rows={4}
                            placeholder="Paste a reference explanation or list of expected findings for comparison..."
                            style={{ resize: 'vertical' }}
                        />
                        <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>
                            Providing a gold standard improves the completeness score accuracy
                        </span>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={handleRun}
                        disabled={!selectedReport || loading}
                    >
                        {loading ? '⏳ Evaluating...' : '🔬 Run Evaluation'}
                    </button>
                </div>

                {/* Evaluation Result */}
                {result && (
                    <div style={{ marginBottom: 'var(--space-8)' }}>
                        <h3 style={{ fontSize: 'var(--fs-base)', fontWeight: 600, marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                            <GradeBadge grade={result.grade} />
                            <span>Evaluation Result — Grade {result.grade} ({Math.round(result.overall_score * 100)}%)</span>
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                            <ScoreCard label="Completeness" value={result.completeness_score} icon="📋" color="var(--color-accent-blue)" />
                            <ScoreCard label="Safety" value={result.safety_score} icon="🛡️" color="var(--color-accent-green)" />
                            <ScoreCard label="Citation Density" value={result.citation_density} icon="📑" color="var(--color-accent-purple)" />
                            <ScoreCard label="Groundedness" value={1 - result.hallucination_risk} icon="🎯" color="var(--color-accent-amber)" />
                        </div>

                        {/* Details */}
                        {result.details && (
                            <div className="card">
                                <h4 style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, marginBottom: 'var(--space-3)' }}>Detailed Breakdown</h4>

                                {result.details.findings_missed?.length > 0 && (
                                    <div style={{ marginBottom: 'var(--space-4)' }}>
                                        <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 600, color: 'var(--color-accent-amber)', marginBottom: 'var(--space-2)' }}>
                                            ⚠️ Findings Not Covered ({result.details.findings_missed.length})
                                        </div>
                                        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                                            {result.details.findings_missed.map((f, i) => (
                                                <span key={i} className="badge badge-amber">{f}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {result.details.safety_issues?.length > 0 && (
                                    <div style={{ marginBottom: 'var(--space-4)' }}>
                                        <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 600, color: 'var(--color-accent-red)', marginBottom: 'var(--space-2)' }}>
                                            🚨 Safety Issues ({result.details.safety_issues.length})
                                        </div>
                                        {result.details.safety_issues.map((s, i) => (
                                            <div key={i} style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-text-secondary)', padding: 'var(--space-1) 0' }}>
                                                • {s}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {result.details.uncited_sections?.length > 0 && (
                                    <div>
                                        <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 600, color: 'var(--color-accent-purple)', marginBottom: 'var(--space-2)' }}>
                                            📑 Sections Without Citations ({result.details.uncited_sections.length})
                                        </div>
                                        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                                            {result.details.uncited_sections.map((s, i) => (
                                                <span key={i} className="badge badge-purple">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {result.details.safety_issues?.length === 0 &&
                                    result.details.findings_missed?.length === 0 &&
                                    result.details.uncited_sections?.length === 0 && (
                                        <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-accent-green)' }}>
                                            ✓ No issues detected — excellent AI output quality
                                        </div>
                                    )}
                            </div>
                        )}
                    </div>
                )}

                {/* Benchmark Table */}
                {benchmark.length > 0 && (
                    <div className="card">
                        <h3 style={{ fontSize: 'var(--fs-base)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                            📊 Evaluation Benchmark History
                        </h3>
                        <div style={{ overflowX: 'auto' }}>
                            <table className="findings-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Grade</th>
                                        <th>Completeness</th>
                                        <th>Safety</th>
                                        <th>Citations</th>
                                        <th>Groundedness</th>
                                        <th>Overall</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {benchmark.map((e, i) => (
                                        <tr key={e.id || i}>
                                            <td style={{ fontSize: 'var(--fs-xs)' }}>
                                                {new Date(e.created_at).toLocaleDateString()}
                                            </td>
                                            <td><GradeBadge grade={e.grade} /></td>
                                            <td>{Math.round(e.completeness_score * 100)}%</td>
                                            <td>{Math.round(e.safety_score * 100)}%</td>
                                            <td>{Math.round(e.citation_density * 100)}%</td>
                                            <td>{Math.round((1 - e.hallucination_risk) * 100)}%</td>
                                            <td style={{ fontWeight: 600 }}>{Math.round(e.overall_score * 100)}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {benchmark.length >= 2 && (
                            <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', fontSize: 'var(--fs-xs)', color: 'var(--color-text-muted)' }}>
                                📈 Average Score: {Math.round(benchmark.reduce((a, b) => a + b.overall_score, 0) / benchmark.length * 100)}%
                                {' '} | {' '}
                                Evaluations Run: {benchmark.length}
                            </div>
                        )}
                    </div>
                )}

                {benchmark.length === 0 && !result && (
                    <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
                        <div style={{ fontSize: '3rem', marginBottom: 'var(--space-3)' }}>🧪</div>
                        <p>No evaluations yet. Select a report above to run your first evaluation.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
