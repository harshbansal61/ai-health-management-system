import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSymptoms, predict } from '../services/api';
import { DisclaimerBanner, Spinner } from '../components/UI';
import toast from 'react-hot-toast';
import { FiSearch, FiX, FiActivity, FiAlertCircle } from 'react-icons/fi';

export default function SymptomCheckerPage() {
  const navigate = useNavigate();

  const [allSymptoms,     setAllSymptoms]     = useState([]);
  const [filtered,        setFiltered]        = useState([]);
  const [selected,        setSelected]        = useState([]);
  const [search,          setSearch]          = useState('');
  const [loadingSymptoms, setLoadingSymptoms] = useState(true);
  const [predicting,      setPredicting]      = useState(false);

  useEffect(() => {
    getSymptoms()
      .then(r => {
        setAllSymptoms(r.data);
        setFiltered(r.data);
      })
      .catch(() => toast.error('Failed to load symptoms'))
      .finally(() => setLoadingSymptoms(false));
  }, []);

  useEffect(() => {
    const q = search.toLowerCase().trim();
    if (!q) { setFiltered(allSymptoms); return; }
    setFiltered(allSymptoms.filter(s =>
      s.symptom_name.replace(/_/g,' ').toLowerCase().includes(q)
    ));
  }, [search, allSymptoms]);

  const toggle = sym => {
    setSelected(prev =>
      prev.includes(sym.symptom_name)
        ? prev.filter(s => s !== sym.symptom_name)
        : [...prev, sym.symptom_name]
    );
  };

  const handlePredict = async () => {
    if (selected.length < 1) {
      toast.error('Please select at least one symptom');
      return;
    }
    setPredicting(true);
    try {
      const res = await predict({ symptoms: selected });
      navigate('/result', { state: { result: res.data } });
    } catch (err) {
      toast.error(err.response?.data?.error || 'Prediction failed');
    } finally {
      setPredicting(false);
    }
  };

  const displayName = name => name.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  if (loadingSymptoms) return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <Spinner text="Loading symptoms database..." />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold text-slate-800 mb-2">Symptom Checker</h1>
        <p className="text-slate-500">Select all symptoms you are experiencing, then click Predict.</p>
      </div>

      <DisclaimerBanner />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: Symptom selector */}
        <div className="lg:col-span-2">
          {/* Search */}
          <div className="relative mb-4">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search symptoms (e.g. headache, fever...)"
              className="input pl-10"
            />
            {search && (
              <button onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <FiX size={16} />
              </button>
            )}
          </div>

          <p className="text-xs text-slate-400 mb-3">
            Showing {filtered.length} of {allSymptoms.length} symptoms
          </p>

          {/* Grid of checkboxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[60vh] overflow-y-auto pr-1">
            {filtered.map(sym => {
              const isSelected = selected.includes(sym.symptom_name);
              return (
                <label key={sym.id}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer
                    transition-all duration-150 select-none
                    ${isSelected
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'}`}
                  onClick={() => toggle(sym)}
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0
                    ${isSelected ? 'border-primary bg-primary' : 'border-slate-300'}`}>
                    {isSelected && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L4 7L9 1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-medium">{displayName(sym.symptom_name)}</span>
                </label>
              );
            })}
            {filtered.length === 0 && (
              <div className="col-span-2 text-center py-10 text-slate-400">
                <FiSearch size={28} className="mx-auto mb-2 opacity-50" />
                No symptoms found for "{search}"
              </div>
            )}
          </div>
        </div>

        {/* Right: Selected panel */}
        <div className="lg:col-span-1">
          <div className="card sticky top-20">
            <h3 className="font-display font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <FiActivity size={16} className="text-primary" />
              Selected Symptoms
              <span className="ml-auto bg-primary text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {selected.length}
              </span>
            </h3>

            {selected.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-sm">
                <FiAlertCircle size={24} className="mx-auto mb-2 opacity-50" />
                No symptoms selected yet
              </div>
            ) : (
              <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                {selected.map(s => (
                  <div key={s}
                    className="flex items-center justify-between bg-primary/5 rounded-lg px-3 py-2">
                    <span className="text-sm text-primary font-medium">{displayName(s)}</span>
                    <button onClick={() => toggle({ symptom_name: s })}
                      className="text-primary/60 hover:text-red-500 transition-colors ml-2">
                      <FiX size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {selected.length > 0 && (
              <button onClick={() => setSelected([])}
                className="w-full text-xs text-red-400 hover:text-red-600 mb-3 text-center">
                Clear all
              </button>
            )}

            <button
              onClick={handlePredict}
              disabled={selected.length === 0 || predicting}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {predicting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <FiActivity size={16} />
                  Predict Disease
                </>
              )}
            </button>

            <p className="text-xs text-slate-400 text-center mt-3">
              Select at least 1 symptom to predict
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
