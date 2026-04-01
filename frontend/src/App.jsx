import './App.css';
import PredictionForm from './components/PredictionForm';

function App() {
  return (
    <div className="min-h-screen bg-surface-950 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary-600/5 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent-600/5 blur-3xl" />
        <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] rounded-full bg-primary-400/3 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative border-b border-surface-800/50 backdrop-blur-sm bg-surface-950/80 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-primary-500/20">
              <img src="/logo.png" alt="CerviCare Logo" className="w-19 h-19 object-contain" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">
                Cervi<span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">Care</span>
              </h1>
              <p className="text-xs text-surface-400 font-medium">Cervical Cancer Risk Assessment</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-800/60 border border-surface-700/50">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-surface-400 font-medium">ML Model Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-16 pb-6 sm:pb-8 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
            <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">AI-Powered Analysis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
            Cervical Cancer{' '}
            <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-clip-text text-transparent animate-gradient">
              Risk Assessment
            </span>
          </h2>
          <p className="text-surface-400 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            Complete the assessment form below to receive an AI-powered risk analysis
            based on clinical and behavioral risk factors using our <strong className="text-surface-300">voting ensemble model</strong>.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative px-4 sm:px-6 pb-16">
        <PredictionForm />
      </main>

      {/* Footer */}
      <footer className="relative border-t border-surface-800/50 py-6 text-center">
        <p className="text-xs text-white">
          CerviCare © {new Date().getFullYear()} — For educational purposes only. Not a substitute for medical advice.
        </p>
      </footer>
    </div>
  );
}

export default App;
