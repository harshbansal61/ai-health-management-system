import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiActivity, FiShield, FiClock, FiDownload,
  FiArrowRight, FiCheckCircle, FiAlertTriangle, FiUser
} from 'react-icons/fi';

const features = [
  { icon: FiActivity, title: 'AI-Powered Diagnosis',    desc: 'Advanced Random Forest algorithm trained on thousands of symptom-disease patterns.' },
  { icon: FiShield,   title: 'Confidence Scores',       desc: 'Know how confident the AI is in its prediction with percentage scores.' },
  { icon: FiClock,    title: 'Prediction History',      desc: 'All your past predictions saved and accessible anytime in your dashboard.' },
  { icon: FiDownload, title: 'Downloadable Reports',    desc: 'Generate professional PDF reports of each prediction for your records.' },
  { icon: FiAlertTriangle, title: 'Emergency Alerts',   desc: 'Instant warnings when symptoms may indicate life-threatening conditions.' },
  { icon: FiCheckCircle,   title: 'Precaution Advice',  desc: 'Get actionable precautions and recommendations alongside every result.' },
];

const steps = [
  { num: '01', title: 'Create Account',    desc: 'Register for free in seconds.' },
  { num: '02', title: 'Select Symptoms',   desc: 'Choose from 130+ symptoms via search.' },
  { num: '03', title: 'Get AI Prediction', desc: 'Our model instantly analyzes your symptoms.' },
  { num: '04', title: 'Download Report',   desc: 'Save your result as a PDF report.' },
];

export default function HomePage() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-primary-dark to-primary py-24 md:py-32 px-4">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10  w-64 h-64 bg-accent  rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20
                          text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <FiActivity size={14} /> AI-Powered Medical Symptom Checker
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
            Check Your Symptoms with<br />
            <span className="text-accent">Artificial Intelligence</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Describe your symptoms and get instant AI-powered predictions for 40+ diseases —
            with confidence scores, severity levels, and expert precautions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {user ? (
              <Link to="/checker" className="inline-flex items-center gap-2 bg-white text-primary
                font-bold px-8 py-4 rounded-xl hover:bg-slate-100 transition-all shadow-xl
                hover:shadow-2xl active:scale-95 text-base">
                Start Checking <FiArrowRight />
              </Link>
            ) : (
              <>
                <Link to="/register" className="inline-flex items-center gap-2 bg-white text-primary
                  font-bold px-8 py-4 rounded-xl hover:bg-slate-100 transition-all shadow-xl
                  hover:shadow-2xl active:scale-95 text-base">
                  Get Started Free <FiArrowRight />
                </Link>
                <Link to="/login" className="inline-flex items-center gap-2 border-2 border-white/40
                  text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all text-base">
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Disclaimer */}
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30
                          text-amber-200 text-xs px-4 py-2 rounded-full">
            <FiAlertTriangle size={12} />
            For educational purposes only — NOT a substitute for professional medical advice
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-800 mb-4">
              Everything You Need
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              A complete AI-powered health companion designed for smart, informed decisions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title}
                className="group p-6 rounded-2xl border border-slate-100 hover:border-primary/30
                           hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4
                                group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Icon size={22} className="text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display font-semibold text-slate-800 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-800 mb-4">
              How It Works
            </h2>
            <p className="text-slate-500">Get your AI prediction in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ num, title, desc }, i) => (
              <div key={num} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r
                                  from-primary/40 to-transparent -ml-4 z-0" />
                )}
                <div className="relative z-10 text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center
                                  text-white font-display font-bold text-lg mx-auto mb-4">
                    {num}
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-1">{title}</h3>
                  <p className="text-slate-500 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      {!user && (
        <section className="py-20 px-4 bg-primary">
          <div className="max-w-3xl mx-auto text-center">
            <FiUser size={40} className="text-white/60 mx-auto mb-4" />
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Ready to Try MediCheck AI?
            </h2>
            <p className="text-white/70 mb-8">
              Create a free account and get your first AI symptom analysis in under a minute.
            </p>
            <Link to="/register" className="inline-flex items-center gap-2 bg-white text-primary
              font-bold px-8 py-4 rounded-xl hover:bg-slate-100 transition-all active:scale-95">
              Start for Free <FiArrowRight />
            </Link>
          </div>
        </section>
      )}

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-4 text-center text-sm">
        <div className="flex items-center justify-center gap-2 text-white font-display font-bold text-lg mb-3">
          <FiActivity /> MediCheck<span className="text-accent">AI</span>
        </div>
        <p className="mb-2">© {new Date().getFullYear()} MediCheck AI — MCA End-Term Project</p>
        <p className="text-xs text-slate-500 max-w-lg mx-auto">
          This application is built for educational and demonstration purposes only.
          It does not provide real medical advice, diagnosis, or treatment.
          Always consult a qualified healthcare professional.
        </p>
        <div className="flex justify-center gap-6 mt-4 text-xs">
          <Link to="/about"      className="hover:text-white transition-colors">About</Link>
          <Link to="/contact"    className="hover:text-white transition-colors">Contact</Link>
          <Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
        </div>
      </footer>
    </div>
  );
}
