import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import apps from '@/data/apps';
import BinaryConsoleApp from '../Components/BinaryConsoleApp.jsx';
import DoctorChatbotApp from '../Components/DoctorChatbotApp.jsx';

const appComponents = {
  'binary-console': BinaryConsoleApp,
  'doctor-chatbot': DoctorChatbotApp,
};

function AppCard({ app, active, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group text-left rounded-2xl border p-5 transition-colors ${
        active
          ? 'border-emerald-500/50 bg-emerald-500/10'
          : 'border-slate-800 bg-slate-900/30 hover:border-slate-700'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className={active ? 'w-4 h-4 text-emerald-400' : 'w-4 h-4 text-slate-500'} />
            <h2 className="text-sm font-semibold text-slate-100">{app.name}</h2>
          </div>
          <p className="mt-3 text-sm text-slate-500 leading-relaxed">{app.description}</p>
        </div>
        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-emerald-400">
          {app.status}
        </span>
      </div>
    </button>
  );
}

function Apps() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (id && !apps.some((app) => app.id === id)) {
    return <Navigate to="/404" replace />;
  }

  const activeApp = apps.find((app) => app.id === id) || apps[0];
  const ActiveAppComponent = appComponents[activeApp.id];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-emerald-400">
          On-site Apps
        </div>
        <h1 className="mt-5 text-3xl sm:text-4xl font-bold text-slate-50 tracking-tight">
          Small tools that run right here.
        </h1>
        <p className="mt-4 text-slate-500 leading-relaxed">
          Little utilities, generators, and experiments hosted directly on the site. Pick an app below to launch it.
        </p>
      </div>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Apps</h2>
          <span className="text-xs text-slate-600">{apps.length} available</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {apps.map((app) => (
            <AppCard
              key={app.id}
              app={app}
              active={app.id === activeApp.id}
              onSelect={() => navigate(`/apps/${app.id}`)}
            />
          ))}
        </div>
      </section>

      <ActiveAppComponent />

      <section className="mt-10 max-w-3xl">
        <h2 className="text-xl font-bold text-slate-50 tracking-tight">About {activeApp.name}</h2>
        <div className="mt-4 space-y-4">
          {activeApp.body.map((paragraph) => (
            <p key={paragraph} className="text-slate-400 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Apps;
