import React from 'react';
import { FiAlertTriangle, FiCheckCircle, FiInfo, FiAlertOctagon } from 'react-icons/fi';

// ── Severity Badge ─────────────────────────────────────────────────────────────
export function SeverityBadge({ level }) {
  const map = {
    LOW:      { cls: 'badge-low',      label: 'Low',      Icon: FiCheckCircle },
    MEDIUM:   { cls: 'badge-medium',   label: 'Medium',   Icon: FiInfo },
    HIGH:     { cls: 'badge-high',     label: 'High',     Icon: FiAlertTriangle },
    CRITICAL: { cls: 'badge-critical', label: 'Critical', Icon: FiAlertOctagon },
    UNKNOWN:  { cls: 'bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-full',
                label: 'Unknown', Icon: FiInfo },
  };
  const { cls, label, Icon } = map[level?.toUpperCase()] || map.UNKNOWN;
  return (
    <span className={`inline-flex items-center gap-1 ${cls}`}>
      <Icon size={12} /> {label}
    </span>
  );
}

// ── Emergency Alert ────────────────────────────────────────────────────────────
export function EmergencyAlert() {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-4 flex gap-3 animate-pulse-slow">
      <FiAlertOctagon className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
      <div>
        <p className="font-bold text-red-700">⚠️ Emergency Situation Detected</p>
        <p className="text-red-600 text-sm mt-1">
          Your symptoms may indicate a serious or life-threatening condition.
          Please call emergency services (112/911) or visit the nearest hospital immediately.
        </p>
      </div>
    </div>
  );
}

// ── Disclaimer Banner ──────────────────────────────────────────────────────────
export function DisclaimerBanner() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
      <FiAlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={18} />
      <p className="text-amber-800 text-sm">
        <strong>Medical Disclaimer:</strong> This tool uses AI for educational purposes only.
        It is <strong>NOT</strong> a substitute for professional medical advice, diagnosis, or treatment.
        Always consult a qualified healthcare provider.
      </p>
    </div>
  );
}

// ── Confidence Meter ───────────────────────────────────────────────────────────
export function ConfidenceMeter({ value }) {
  const color = value >= 70 ? 'bg-green-500' : value >= 40 ? 'bg-amber-500' : 'bg-red-400';
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium text-slate-500">Confidence</span>
        <span className="text-sm font-bold text-slate-700">{value?.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2.5">
        <div className={`${color} h-2.5 rounded-full transition-all duration-700`}
             style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
    </div>
  );
}

// ── Loading Spinner ────────────────────────────────────────────────────────────
export function Spinner({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      <p className="text-slate-500 text-sm">{text}</p>
    </div>
  );
}

// ── Empty State ────────────────────────────────────────────────────────────────
export function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
        <Icon size={28} className="text-slate-400" />
      </div>
      <h3 className="font-semibold text-slate-600">{title}</h3>
      <p className="text-slate-400 text-sm max-w-xs">{description}</p>
    </div>
  );
}

// ── Stat Card ──────────────────────────────────────────────────────────────────
export function StatCard({ label, value, icon: Icon, color = 'text-primary', bg = 'bg-primary/10' }) {
  return (
    <div className="card flex items-center gap-4">
      <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
        <Icon size={22} className={color} />
      </div>
      <div>
        <p className="text-2xl font-bold font-display text-slate-800">{value}</p>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
      </div>
    </div>
  );
}
