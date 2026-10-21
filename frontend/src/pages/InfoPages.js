import React, { useState } from 'react';
import {
  FiActivity, FiShield, FiAlertTriangle, FiMail,
  FiGithub, FiUser, FiCpu, FiDatabase, FiCode
} from 'react-icons/fi';

// ── About Page ─────────────────────────────────────────────────────────────────
export function AboutPage() {
  const techStack = [
    { icon: FiCode,     label: 'Frontend',  value: 'React.js + Tailwind CSS' },
    { icon: FiCpu,      label: 'Backend',   value: 'Python Flask + REST API' },
    { icon: FiDatabase, label: 'Database',  value: 'SQLite (dev) / PostgreSQL (prod)' },
    { icon: FiActivity, label: 'ML Model',  value: 'Random Forest Classifier (scikit-learn)' },
    { icon: FiShield,   label: 'Auth',      value: 'JWT Tokens + bcrypt hashing' },
    { icon: FiUser,     label: 'Reports',   value: 'ReportLab PDF generation' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold
                        px-4 py-2 rounded-full mb-4">
          <FiActivity size={14} /> MCA End-Term Project
        </div>
        <h1 className="text-4xl font-display font-bold text-slate-800 mb-4">
          About MediCheck AI
        </h1>
        <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
          An AI-powered Medical Symptom Checker built as a comprehensive MCA end-term project,
          demonstrating full-stack development with machine learning integration.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="card">
          <h2 className="font-display font-bold text-slate-800 mb-3 flex items-center gap-2">
            <FiAlertTriangle className="text-amber-500" /> Problem Statement
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Most people ignore early symptoms or panic unnecessarily due to lack of quick,
            accessible health information. A preliminary AI-based symptom checker can help users
            make informed decisions about whether to seek medical attention.
          </p>
        </div>
        <div className="card">
          <h2 className="font-display font-bold text-slate-800 mb-3 flex items-center gap-2">
            <FiShield className="text-primary" /> Objective
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Build a full-stack web application that uses machine learning to predict possible
            diseases from selected symptoms, providing users with confidence scores, severity
            levels, and precautionary advice — all with a clean, responsive UI.
          </p>
        </div>
        <div className="card">
          <h2 className="font-display font-bold text-slate-800 mb-3">ML Algorithm</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            <strong>Random Forest Classifier</strong> — an ensemble of 100 decision trees trained
            on a symptom-disease dataset covering 40+ diseases and 130+ symptoms. It provides
            probability scores for each disease class, enabling the confidence score feature.
          </p>
        </div>
        <div className="card">
          <h2 className="font-display font-bold text-slate-800 mb-3">Dataset</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            A curated symptom-disease dataset with 41 disease classes and up to 17 symptoms per
            disease. Each disease also has metadata including description, severity level,
            precautions, and emergency flag stored in the database.
          </p>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="card mb-8">
        <h2 className="font-display font-bold text-slate-800 mb-5 text-xl">Tech Stack</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {techStack.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{label}</p>
                <p className="text-sm font-medium text-slate-700">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Developer */}
      <div className="card text-center">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white
                        font-display font-bold text-2xl mx-auto mb-3">S</div>
        <h3 className="font-display font-bold text-slate-800 text-lg">MCA Student</h3>
        <p className="text-slate-500 text-sm mb-1">Final Year – Master of Computer Applications</p>
        <p className="text-slate-400 text-xs">AI Medical Symptom Checker — End-Term Project</p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="https://github.com" target="_blank" rel="noreferrer"
             className="flex items-center gap-1 text-slate-500 hover:text-primary text-sm">
            <FiGithub size={15} /> GitHub
          </a>
          <a href="mailto:student@college.edu"
             className="flex items-center gap-1 text-slate-500 hover:text-primary text-sm">
            <FiMail size={15} /> Email
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Contact Page ───────────────────────────────────────────────────────────────
export function ContactPage() {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setLoading(false);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-display font-bold text-slate-800 mb-3">Contact Us</h1>
        <p className="text-slate-500">Have questions or feedback? We'd love to hear from you.</p>
      </div>

      <div className="card">
        {sent ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiShield className="text-green-500" size={28} />
            </div>
            <h3 className="font-display font-bold text-slate-800 text-xl mb-2">Message Sent!</h3>
            <p className="text-slate-500 text-sm mb-4">
              Thank you for reaching out. This is a demo project, so no real email is sent.
            </p>
            <button onClick={() => setSent(false)} className="btn-outline">Send Another</button>
          </div>
        ) : (
          <form onSubmit={handle} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Name</label>
                <input type="text" required value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Your name" className="input" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Email</label>
                <input type="email" required value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com" className="input" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Subject</label>
              <input type="text" required value={form.subject}
                onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                placeholder="What is this about?" className="input" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Message</label>
              <textarea required rows={5} value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder="Your message..." className="input resize-none" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Sending...</>
              ) : (
                <><FiMail size={15} /> Send Message</>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div className="card text-center py-6">
          <FiMail className="text-primary mx-auto mb-2" size={24} />
          <p className="font-semibold text-slate-700 text-sm">Email</p>
          <p className="text-slate-400 text-xs">admin@medichecker.com</p>
        </div>
        <div className="card text-center py-6">
          <FiGithub className="text-slate-700 mx-auto mb-2" size={24} />
          <p className="font-semibold text-slate-700 text-sm">GitHub</p>
          <p className="text-slate-400 text-xs">github.com/medicheck-ai</p>
        </div>
      </div>
    </div>
  );
}

// ── Disclaimer Page ────────────────────────────────────────────────────────────
export function DisclaimerPage() {
  const sections = [
    {
      title: '1. Educational Purpose Only',
      content: `MediCheck AI is developed strictly for educational and demonstration purposes as part of an MCA
      (Master of Computer Applications) academic project. It is NOT intended to be used as a real medical tool,
      diagnostic system, or healthcare service of any kind.`
    },
    {
      title: '2. Not a Medical Device',
      content: `This application does not constitute the practice of medicine, nursing, or any other healthcare
      profession. The AI predictions generated by this system are based on a simplified machine learning model
      trained on a limited dataset and may not be accurate, complete, or applicable to any individual's
      specific health situation.`
    },
    {
      title: '3. Always Consult a Doctor',
      content: `The information provided by MediCheck AI should NEVER be used as a substitute for professional
      medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified
      healthcare provider with any questions you may have regarding a medical condition.`
    },
    {
      title: '4. Emergency Situations',
      content: `If you think you may have a medical emergency, call your local emergency services (such as 112
      or 911) immediately. Do not rely on this application for emergency medical guidance.`
    },
    {
      title: '5. Accuracy Limitation',
      content: `The ML model used in this application has inherent accuracy limitations. Disease predictions
      are probabilistic and may be incorrect. The confidence score reflects the model's internal probability,
      not clinical diagnostic accuracy.`
    },
    {
      title: '6. Data Privacy',
      content: `User data including symptom selections and prediction history are stored for demonstration
      purposes only. This application is run locally or on a demo server and should not contain any real
      personal health information.`
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiAlertTriangle className="text-amber-500" size={28} />
        </div>
        <h1 className="text-4xl font-display font-bold text-slate-800 mb-3">Medical Disclaimer</h1>
        <p className="text-slate-500">Please read this carefully before using MediCheck AI</p>
      </div>

      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 mb-8">
        <p className="font-bold text-amber-800 text-center text-lg">
          ⚠️ This application is for EDUCATIONAL PURPOSES ONLY and does NOT provide medical advice.
        </p>
      </div>

      <div className="space-y-4">
        {sections.map(({ title, content }) => (
          <div key={title} className="card">
            <h2 className="font-display font-semibold text-slate-800 mb-2">{title}</h2>
            <p className="text-slate-600 text-sm leading-relaxed">{content}</p>
          </div>
        ))}
      </div>

      <div className="card mt-6 bg-primary/5 border-primary/20">
        <p className="text-primary font-semibold text-center">
          By using MediCheck AI, you acknowledge that you have read and understood this disclaimer.
        </p>
      </div>
    </div>
  );
}
