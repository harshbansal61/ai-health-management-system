import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getHistory } from '../services/api';
import { SeverityBadge, ConfidenceMeter, Spinner, EmptyState } from '../components/UI';
import { FiActivity, FiClock, FiArrowRight, FiTrendingUp } from 'react-icons/fi';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#1e40af','#06b6d4','#22c55e','#f59e0b','#ef4444','#7c3aed'];

export default function DashboardPage() {
  const { user }          = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHistory().then(r => setHistory(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  // Build pie chart data
  const diseaseCount = history.reduce((acc, p) => {
    acc[p.predicted_disease] = (acc[p.predicted_disease] || 0) + 1;
    return acc;
  }, {});
  const pieData = Object.entries(diseaseCount)
    .sort((a,b) => b[1]-a[1])
    .slice(0, 6)
    .map(([name, value]) => ({ name, value }));

  const recentPredictions = history.slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-800">
            Welcome back, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-slate-500 mt-1">Here's your health activity summary</p>
        </div>
        <Link to="/checker" className="btn-primary inline-flex items-center gap-2">
          <FiActivity size={16} /> Check Symptoms
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Checks',    value: history.length,
            icon: FiActivity, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'This Month',
            value: history.filter(p => new Date(p.created_at).getMonth() === new Date().getMonth()).length,
            icon: FiTrendingUp, color: 'text-accent', bg: 'bg-cyan-50' },
          { label: 'Avg. Confidence',
            value: history.length
              ? (history.reduce((s,p) => s + p.confidence_score, 0) / history.length).toFixed(1) + '%'
              : '—',
            icon: FiClock, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Unique Diseases',
            value: new Set(history.map(p => p.predicted_disease)).size,
            icon: FiActivity, color: 'text-amber-500', bg: 'bg-amber-50' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="card flex items-center gap-3">
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <Icon size={18} className={color} />
            </div>
            <div>
              <p className="text-xl font-bold font-display text-slate-800">{value}</p>
              <p className="text-xs text-slate-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Predictions */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-semibold text-slate-800">Recent Predictions</h2>
            <Link to="/history" className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
              View all <FiArrowRight size={14} />
            </Link>
          </div>

          {loading ? <Spinner text="Loading history..." /> :
           recentPredictions.length === 0 ? (
            <EmptyState icon={FiActivity} title="No predictions yet"
              description="Start by checking your symptoms to get your first AI prediction." />
           ) : (
            <div className="space-y-3">
              {recentPredictions.map(p => (
                <div key={p.id} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiActivity className="text-primary" size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 text-sm truncate">{p.predicted_disease}</p>
                    <p className="text-xs text-slate-400">
                      {new Date(p.created_at).toLocaleDateString()} · {p.selected_symptoms?.length} symptoms
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-primary">{p.confidence_score?.toFixed(1)}%</p>
                  </div>
                </div>
              ))}
            </div>
           )}
        </div>

        {/* Pie Chart */}
        <div className="card">
          <h2 className="font-display font-semibold text-slate-800 mb-5">Disease Distribution</h2>
          {pieData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={70}
                    dataKey="value" paddingAngle={3}>
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v, n) => [v, n]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-3">
                {pieData.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-sm flex-shrink-0"
                         style={{ background: COLORS[i % COLORS.length] }} />
                    <span className="truncate text-slate-600">{d.name}</span>
                    <span className="ml-auto font-semibold text-slate-700">{d.value}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <EmptyState icon={FiActivity} title="No data yet"
              description="Run your first prediction to see the distribution." />
          )}
        </div>
      </div>
    </div>
  );
}
