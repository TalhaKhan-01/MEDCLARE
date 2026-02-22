import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadReport, processReport } from '../api';
import { useTranslation } from 'react-i18next';

export default function Upload() {
    const { t, i18n } = useTranslation();
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [level, setLevel] = useState('standard');
    const [dragover, setDragover] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [currentStage, setCurrentStage] = useState(-1);
    const [error, setError] = useState('');
    const fileRef = useRef();
    const navigate = useNavigate();

    const PIPELINE_STAGES = [
        { key: 'upload', label: t('upload.pipeline.upload'), icon: '📤' },
        { key: 'ocr', label: t('upload.pipeline.ocr'), icon: '🔍' },
        { key: 'extract', label: t('upload.pipeline.extract'), icon: '🧬' },
        { key: 'retrieve', label: t('upload.pipeline.retrieve'), icon: '📚' },
        { key: 'explain', label: t('upload.pipeline.explain'), icon: '📝' },
        { key: 'guardrail', label: t('upload.pipeline.guardrail'), icon: '🛡️' },
        { key: 'personalize', label: t('upload.pipeline.personalize'), icon: '🎯' },
        { key: 'complete', label: t('upload.pipeline.complete'), icon: '✓' }
    ];

    const handleFile = (f) => {
        const allowed = ['.pdf', '.png', '.jpg', '.jpeg', '.tiff'];
        const ext = f.name.substring(f.name.lastIndexOf('.')).toLowerCase();
        if (!allowed.includes(ext)) {
            setError(`Unsupported file type. Allowed: ${allowed.join(', ')}`);
            return;
        }
        setFile(f);
        setError('');
        if (!title) setTitle(f.name.replace(/\.[^/.]+$/, ''));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragover(false);
        if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    };

    const handleSubmit = async () => {
        if (!file) return;
        setProcessing(true);
        setError('');
        try {
            // Stage 1: Upload
            setCurrentStage(0);
            const uploadRes = await uploadReport(file, title);
            const reportId = uploadRes.data.id;

            // Stage 2-7: Processing pipeline
            setCurrentStage(1);
            const timer = setInterval(() => {
                setCurrentStage(prev => {
                    if (prev >= 6) { clearInterval(timer); return prev; }
                    return prev + 1;
                });
            }, 1500);

            const result = await processReport(reportId, level, i18n.language);
            clearInterval(timer);
            setCurrentStage(7);

            setTimeout(() => navigate(`/report/${reportId}`), 1200);
        } catch (err) {
            setError(err.response?.data?.detail || t('common.error'));
            setProcessing(false);
            setCurrentStage(-1);
        }
    };

    return (
        <div className="page">
            <div className="container" style={{ maxWidth: 700 }}>
                <div className="page-header" style={{ textAlign: 'center' }}>
                    <h1 className="page-title">{t('upload.title')}</h1>
                    <p className="page-subtitle">{t('upload.subtitle')}</p>
                </div>

                {!processing ? (
                    <div className="card">
                        <div
                            className={`upload-zone ${dragover ? 'dragover' : ''}`}
                            onDragOver={e => { e.preventDefault(); setDragover(true); }}
                            onDragLeave={() => setDragover(false)}
                            onDrop={handleDrop}
                            onClick={() => fileRef.current?.click()}
                        >
                            <input ref={fileRef} type="file" hidden accept=".pdf,.png,.jpg,.jpeg,.tiff"
                                onChange={e => e.target.files[0] && handleFile(e.target.files[0])} />
                            <div className="upload-zone-icon">
                                <span style={{ fontSize: '2rem' }}>📄</span>
                            </div>
                            {file ? (
                                <>
                                    <h3 style={{ color: 'var(--color-accent-green)' }}>✓ {file.name}</h3>
                                    <p>{(file.size / 1024).toFixed(1)} KB — Click to change</p>
                                </>
                            ) : (
                                <>
                                    <h3>{t('upload.dropzone')}</h3>
                                    <p>{t('upload.orClick')} — {t('upload.formatHint')}</p>
                                </>
                            )}
                        </div>

                        {file && (
                            <div style={{ marginTop: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                                <div className="input-group">
                                    <label>{t('upload.reportTitle')}</label>
                                    <input className="input-field" value={title}
                                        onChange={e => setTitle(e.target.value)} placeholder="e.g. Annual Blood Work 2025" />
                                </div>
                                <div className="input-group">
                                    <label>{t('upload.detailLevel')}</label>
                                    <select className="input-field" value={level} onChange={e => setLevel(e.target.value)}>
                                        <option value="simple">{t('upload.levels.simple')}</option>
                                        <option value="standard">{t('upload.levels.standard')}</option>
                                        <option value="detailed">{t('upload.levels.detailed')}</option>
                                    </select>
                                </div>
                                {error && (
                                    <div style={{
                                        padding: '0.75rem 1rem', background: 'var(--color-accent-red-dim)',
                                        borderRadius: 'var(--radius-md)', color: 'var(--color-accent-red)', fontSize: 'var(--fs-sm)'
                                    }}>{error}</div>
                                )}
                                <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}
                                    onClick={handleSubmit}>
                                    🔬 {t('upload.analyzeBtn')}
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="card">
                        <h3 style={{ textAlign: 'center', marginBottom: 'var(--space-6)', fontSize: 'var(--fs-lg)' }}>
                            {t('upload.processingTitle')}
                        </h3>
                        <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)', fontSize: 'var(--fs-sm)' }}>
                            Running the deterministic interpretation pipeline...
                        </p>
                        {PIPELINE_STAGES.map((stage, i) => (
                            <div key={stage.key} className={`processing-stage ${i === currentStage ? 'active' : i < currentStage ? 'complete' : 'waiting'
                                }`}>
                                <div className={`processing-stage-icon ${i === currentStage ? 'active' : i < currentStage ? 'complete' : ''
                                    }`}>
                                    {i < currentStage ? '✓' : stage.icon}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>{stage.label}</div>
                                </div>
                            </div>
                        ))}
                        {error && (
                            <div style={{
                                marginTop: 'var(--space-4)', padding: '0.75rem 1rem',
                                background: 'var(--color-accent-red-dim)', borderRadius: 'var(--radius-md)',
                                color: 'var(--color-accent-red)', fontSize: 'var(--fs-sm)'
                            }}>{error}</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
