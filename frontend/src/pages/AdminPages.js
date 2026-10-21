import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  adminStats, adminUsers, adminPredictions, adminSymptoms,
  adminDiseases, adminAddSymptom, adminDeleteSymptom,
  adminAddDisease, adminDeleteDisease, adminDeleteUser, adminLogs
} from '../services/api';
import { StatCard, Spinner, SeverityBadge } from '../components/UI';
import toast from 'react-hot-toast';
import {
  FiUsers, FiActivity, FiList, FiAlertCircle,
  FiPlus, FiTrash2, FiShield, FiClock, FiSettings
} from 'react-icons/fi';

// ── Admin Dashboard ────────────────────────────────────────────────────────────
export function AdminDashboard() {
  const [stats,   setStats]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminStats().then(r => setStats(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="max-w-6xl mx-auto px-4 py-16"><Spinner /></div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
          <FiShield className="text-purple-600" size={20} />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-800">Admin Panel</h1>
          <p className="text-slate-500 text-sm">Manage MediCheck AI system</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Users"       value={stats?.total_users}       icon={FiUsers}    color="text-primary"     bg="bg-primary/10" />
        <StatCard label="Total Predictions" value={stats?.total_predictions} icon={FiActivity} color="text-cyan-500"    bg="bg-cyan-50" />
        <StatCard label="Symptoms"          value={stats?.total_symptoms}    icon={FiList}     color="text-green-500"   bg="bg-green-50" />
        <StatCard label="Diseases"          value={stats?.total_diseases}    icon={FiAlertCircle} color="text-amber-500" bg="bg-amber-50" />
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { to: '/admin/users',       label: 'Manage Users',       Icon: FiUsers,       color: 'bg-primary/10 text-primary' },
          { to: '/admin/predictions', label: 'All Predictions',    Icon: FiActivity,    color: 'bg-cyan-50 text-cyan-600' },
          { to: '/admin/symptoms',    label: 'Manage Symptoms',    Icon: FiList,        color: 'bg-green-50 text-green-600' },
          { to: '/admin/diseases',    label: 'Manage Diseases',    Icon: FiAlertCircle, color: 'bg-amber-50 text-amber-600' },
        ].map(({ to, label, Icon, color }) => (
          <Link key={to} to={to}
            className="card flex flex-col items-center gap-3 py-8 hover:shadow-md transition-all group">
            <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
              <Icon size={22} />
            </div>
            <span className="font-medium text-slate-700 text-sm text-center">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ── Admin Users ────────────────────────────────────────────────────────────────
export function AdminUsersPage() {
  const [users,   setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => adminUsers().then(r => setUsers(r.data)).catch(() => toast.error('Load failed'))
    .finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const deleteUser = async id => {
    if (!window.confirm('Delete this user?')) return;
    try { await adminDeleteUser(id); toast.success('User deleted'); load(); }
    catch (e) { toast.error(e.response?.data?.error || 'Delete failed'); }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-display font-bold text-slate-800 mb-6">Manage Users</h1>
      {loading ? <Spinner /> : (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {['ID','Name','Email','Role','Joined','Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-400 font-mono text-xs">{u.id}</td>
                  <td className="px-4 py-3 font-medium">{u.name}</td>
                  <td className="px-4 py-3 text-slate-500">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full
                      ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-xs">
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    {u.role !== 'admin' && (
                      <button onClick={() => deleteUser(u.id)}
                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                        <FiTrash2 size={14} />
                      </button>
                    )}
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

// ── Admin Predictions ──────────────────────────────────────────────────────────
export function AdminPredictionsPage() {
  const [predictions, setPredictions] = useState([]);
  const [loading,     setLoading]     = useState(true);

  useEffect(() => {
    adminPredictions().then(r => setPredictions(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-display font-bold text-slate-800 mb-6">All Predictions</h1>
      {loading ? <Spinner /> : (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {['ID','User','Disease','Confidence','Symptoms','Date'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {predictions.map(p => (
                <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-400 font-mono text-xs">{p.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{p.user_name}</p>
                    <p className="text-xs text-slate-400">{p.user_email}</p>
                  </td>
                  <td className="px-4 py-3 font-medium">{p.predicted_disease}</td>
                  <td className="px-4 py-3">
                    <span className="font-bold text-primary">{p.confidence_score?.toFixed(1)}%</span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{p.selected_symptoms?.length}</td>
                  <td className="px-4 py-3 text-xs text-slate-400">
                    {new Date(p.created_at).toLocaleDateString()}
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

// ── Admin Symptoms ─────────────────────────────────────────────────────────────
export function AdminSymptomsPage() {
  const [symptoms, setSymptoms] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [form,     setForm]     = useState({ symptom_name: '', description: '' });
  const [adding,   setAdding]   = useState(false);

  const load = () => adminSymptoms().then(r => setSymptoms(r.data)).catch(() => {}).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const add = async e => {
    e.preventDefault();
    setAdding(true);
    try {
      await adminAddSymptom(form);
      toast.success('Symptom added!');
      setForm({ symptom_name: '', description: '' });
      load();
    } catch (e) { toast.error(e.response?.data?.error || 'Failed'); }
    finally { setAdding(false); }
  };

  const del = async id => {
    if (!window.confirm('Delete this symptom?')) return;
    try { await adminDeleteSymptom(id); toast.success('Deleted'); load(); }
    catch { toast.error('Delete failed'); }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-display font-bold text-slate-800 mb-6">Manage Symptoms</h1>

      {/* Add form */}
      <div className="card mb-6">
        <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
          <FiPlus size={16} className="text-primary" /> Add New Symptom
        </h3>
        <form onSubmit={add} className="flex flex-col sm:flex-row gap-3">
          <input type="text" placeholder="Symptom name (e.g. chest_pain)" required
            value={form.symptom_name}
            onChange={e => setForm(f => ({ ...f, symptom_name: e.target.value }))}
            className="input flex-1" />
          <input type="text" placeholder="Description (optional)"
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            className="input flex-1" />
          <button type="submit" disabled={adding} className="btn-primary whitespace-nowrap">
            {adding ? 'Adding...' : 'Add Symptom'}
          </button>
        </form>
      </div>

      {/* List */}
      {loading ? <Spinner /> : (
        <div className="card overflow-x-auto">
          <p className="text-sm text-slate-500 mb-4">{symptoms.length} symptoms in database</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">ID</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Symptom</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Description</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {symptoms.map(s => (
                <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-4 py-2.5 text-slate-400 font-mono text-xs">{s.id}</td>
                  <td className="px-4 py-2.5 font-medium text-slate-700">{s.symptom_name}</td>
                  <td className="px-4 py-2.5 text-slate-500 text-xs">{s.description || '—'}</td>
                  <td className="px-4 py-2.5">
                    <button onClick={() => del(s.id)}
                      className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                      <FiTrash2 size={14} />
                    </button>
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

// ── Admin Diseases ─────────────────────────────────────────────────────────────
export function AdminDiseasesPage() {
  const [diseases, setDiseases] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form,     setForm]     = useState({
    disease_name: '', description: '', precautions: '', severity_level: 'LOW', emergency: false
  });
  const [adding, setAdding] = useState(false);

  const load = () => adminDiseases().then(r => setDiseases(r.data)).catch(() => {}).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const add = async e => {
    e.preventDefault();
    setAdding(true);
    try {
      await adminAddDisease(form);
      toast.success('Disease added!');
      setForm({ disease_name:'', description:'', precautions:'', severity_level:'LOW', emergency:false });
      setShowForm(false);
      load();
    } catch (e) { toast.error(e.response?.data?.error || 'Failed'); }
    finally { setAdding(false); }
  };

  const del = async id => {
    if (!window.confirm('Delete this disease?')) return;
    try { await adminDeleteDisease(id); toast.success('Deleted'); load(); }
    catch { toast.error('Delete failed'); }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-slate-800">Manage Diseases</h1>
        <button onClick={() => setShowForm(f => !f)} className="btn-primary flex items-center gap-2">
          <FiPlus size={15} /> Add Disease
        </button>
      </div>

      {showForm && (
        <div className="card mb-6 animate-slide-up">
          <h3 className="font-semibold text-slate-700 mb-4">Add New Disease</h3>
          <form onSubmit={add} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input required placeholder="Disease Name" value={form.disease_name}
              onChange={e => setForm(f => ({...f, disease_name: e.target.value}))} className="input" />
            <select value={form.severity_level}
              onChange={e => setForm(f => ({...f, severity_level: e.target.value}))} className="input">
              {['LOW','MEDIUM','HIGH','CRITICAL'].map(l => <option key={l}>{l}</option>)}
            </select>
            <textarea placeholder="Description" value={form.description}
              onChange={e => setForm(f => ({...f, description: e.target.value}))}
              className="input sm:col-span-2 h-20 resize-none" />
            <textarea placeholder="Precautions (semicolon-separated)" value={form.precautions}
              onChange={e => setForm(f => ({...f, precautions: e.target.value}))}
              className="input sm:col-span-2 h-20 resize-none" />
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" checked={form.emergency}
                onChange={e => setForm(f => ({...f, emergency: e.target.checked}))} />
              Emergency condition
            </label>
            <button type="submit" disabled={adding} className="btn-primary">
              {adding ? 'Adding...' : 'Add Disease'}
            </button>
          </form>
        </div>
      )}

      {loading ? <Spinner /> : (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {['ID','Disease','Severity','Emergency','Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {diseases.map(d => (
                <tr key={d.id} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-400 font-mono text-xs">{d.id}</td>
                  <td className="px-4 py-3 font-medium">{d.disease_name}</td>
                  <td className="px-4 py-3"><SeverityBadge level={d.severity_level} /></td>
                  <td className="px-4 py-3">
                    {d.emergency
                      ? <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">Yes</span>
                      : <span className="text-xs text-slate-400">No</span>}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => del(d.id)}
                      className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                      <FiTrash2 size={14} />
                    </button>
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
