import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { getHistory, downloadReport } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { SeverityBadge, EmergencyAlert, ConfidenceMeter, DisclaimerBanner, Spinner, EmptyState } from '../components/UI';
import toast from 'react-hot-toast';
import { FiDownload, FiActivity, FiCheckCircle, FiClock, FiArrowLeft, FiUser, FiMail, FiSave } from 'react-icons/fi';
import { updateProfile } from '../services/api';

// ── Result Page ────────────────────────────────────────────────────────────────
export function ResultPage() {
  const location = useLocation();
  const navigate  = useNavigate();
  const result    = location.state?.result;

  useEffect(() => {
    if (!result) navigate('/checker');
  }, [result, navigate]);

  if (!result) return null;

  const displayName = n => n?.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  const handleDownload = async () => {
    try {
      const res = await downloadReport(result.prediction_id);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a   = document.createElement('a');
      a.href    = url;
      a.download = `MediCheck_Report_${result.prediction_id}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success('Report downloaded!');
    } catch {
      toast.error('Failed to download report');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button onClick={() => navigate('/checker')}
        className="flex items-center gap-2 text-slate-500 hover:text-primary mb-6 text-sm">
        <FiArrowLeft size={16} /> Back to Checker
      </button>

      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold text-slate-800 mb-2">Prediction Result</h1>
        <p className="text-slate-500">Based on your reported symptoms</p>
      </div>

      <DisclaimerBanner />

      {/* Emergency */}
      {result.emergency && (
        <div className="mt-4"><EmergencyAlert /></div>
      )}

      {/* Main Result Card */}
      <div className="card mt-4 border-primary/30">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
              Predicted Disease
            </p>
            <h2 className="text-2xl font-display font-bold text-slate-800">{result.disease}</h2>
          </div>
          <SeverityBadge level={result.severity_level} />
        </div>

        <ConfidenceMeter value={result.confidence} />

        {result.description && (
          <div className="mt-5 p-4 bg-slate-50 rounded-xl">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">About</p>
            <p className="text-slate-700 text-sm leading-relaxed">{result.description}</p>
          </div>
        )}

        {result.precautions?.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
              Recommended Precautions
            </p>
            <ul className="space-y-2">
              {result.precautions.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <FiCheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
                  {p.trim()}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Reported symptoms */}
        <div className="mt-5 pt-5 border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Reported Symptoms ({result.selected_symptoms?.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {result.selected_symptoms?.map(s => (
              <span key={s} className="bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full">
                {displayName(s)}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-5 border-t border-slate-100">
          <button onClick={handleDownload}
            className="btn-primary flex items-center justify-center gap-2">
            <FiDownload size={16} /> Download PDF Report
          </button>
          <Link to="/checker" className="btn-outline flex items-center justify-center gap-2">
            <FiActivity size={16} /> Check Again
          </Link>
        </div>
      </div>

      {/* Alternative predictions */}
      {result.all_probabilities?.length > 1 && (
        <div className="card mt-4">
          <h3 className="font-display font-semibold text-slate-800 mb-4">
            Alternative Predictions
          </h3>
          <div className="space-y-3">
            {result.all_probabilities.slice(1).map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-slate-400 w-4">{i + 2}</span>
                <span className="text-sm text-slate-700 flex-1">{item.disease}</span>
                <div className="w-24 bg-slate-100 rounded-full h-2">
                  <div className="bg-slate-400 h-2 rounded-full"
                    style={{ width: `${item.probability}%` }} />
                </div>
                <span className="text-xs font-mono text-slate-500 w-12 text-right">
                  {item.probability.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── History Page ───────────────────────────────────────────────────────────────
export function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHistory().then(r => setHistory(r.data)).catch(() => toast.error('Failed to load history'))
      .finally(() => setLoading(false));
  }, []);

  const handleDownload = async id => {
    try {
      const res = await downloadReport(id);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a   = document.createElement('a');
      a.href    = url;
      a.download = `MediCheck_Report_${id}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success('Report downloaded!');
    } catch {
      toast.error('Failed to download report');
    }
  };

  const displayName = n => n?.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-display font-bold text-slate-800 mb-2">Prediction History</h1>
      <p className="text-slate-500 mb-6">All your past AI symptom predictions</p>

      {loading ? <Spinner text="Loading your history..." /> :
       history.length === 0 ? (
        <div className="card text-center py-16">
          <EmptyState icon={FiClock} title="No predictions yet"
            description="Head to the Symptom Checker to run your first prediction." />
          <Link to="/checker" className="btn-primary inline-flex items-center gap-2 mt-4">
            <FiActivity /> Start Checking
          </Link>
        </div>
       ) : (
        <div className="space-y-4">
          {history.map(p => (
            <div key={p.id} className="card hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiActivity className="text-primary" size={18} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-slate-800">{p.predicted_disease}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {new Date(p.created_at).toLocaleString()} · {p.selected_symptoms?.length} symptoms
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {p.selected_symptoms?.slice(0,4).map(s => (
                        <span key={s}
                          className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full">
                          {displayName(s)}
                        </span>
                      ))}
                      {p.selected_symptoms?.length > 4 && (
                        <span className="text-xs text-slate-400">
                          +{p.selected_symptoms.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <p className="font-bold text-primary">{p.confidence_score?.toFixed(1)}%</p>
                    <p className="text-xs text-slate-400">confidence</p>
                  </div>
                  <button onClick={() => handleDownload(p.id)}
                    className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-all"
                    title="Download PDF">
                    <FiDownload size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
       )}
    </div>
  );
}

// ── Profile Page ───────────────────────────────────────────────────────────────
export function ProfilePage() {
  const { user, login } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', password: '', confirm: '' });
  const [saving, setSaving] = useState(false);

  const handleSave = async e => {
    e.preventDefault();
    if (form.password && form.password !== form.confirm) {
      toast.error('Passwords do not match'); return;
    }
    setSaving(true);
    try {
      const payload = { name: form.name };
      if (form.password) payload.password = form.password;
      await updateProfile(payload);
      toast.success('Profile updated!');
      setForm(f => ({ ...f, password: '', confirm: '' }));
    } catch (err) {
      toast.error(err.response?.data?.error || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-display font-bold text-slate-800 mb-2">Profile</h1>
      <p className="text-slate-500 mb-6">Manage your account settings</p>

      <div className="card">
        {/* Avatar */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-display font-bold text-2xl">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <h2 className="font-display font-bold text-slate-800 text-lg">{user?.name}</h2>
            <p className="text-slate-500 text-sm flex items-center gap-1">
              <FiMail size={13} /> {user?.email}
            </p>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full mt-1 inline-block
              ${user?.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
              {user?.role}
            </span>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
              <input type="text" value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="input pl-10" required />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
              New Password (leave blank to keep current)
            </label>
            <input type="password" value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              placeholder="New password"
              className="input" />
          </div>

          {form.password && (
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                Confirm New Password
              </label>
              <input type="password" value={form.confirm}
                onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
                placeholder="Confirm new password"
                className="input" />
            </div>
          )}

          <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
            <FiSave size={15} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
