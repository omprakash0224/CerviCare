const riskConfig = {
  low: {
    color: 'risk-low',
    gradient: 'from-emerald-500/20 to-teal-500/10',
    border: 'border-emerald-500/30',
    ringColor: 'ring-emerald-400',
    label: 'Low Risk',
    emoji: '✅',
    textColor: 'text-emerald-400',
    bgGlow: 'shadow-emerald-500/20',
    description: 'Based on the provided information, the model indicates a low probability of cervical cancer risk. However, regular screenings remain important regardless of risk level.',
    recommendations: [
      'Continue regular Pap smear screenings as recommended (every 3 years for ages 21-65)',
      'Consider HPV vaccination if eligible',
      'Practice safe sexual behavior',
      'Maintain regular gynecological check-ups',
      'Stay informed about cervical cancer prevention',
    ],
  },
  moderate: {
    color: 'risk-moderate',
    gradient: 'from-amber-500/20 to-orange-500/10',
    border: 'border-amber-500/30',
    ringColor: 'ring-amber-400',
    label: 'Moderate Risk',
    emoji: '⚠️',
    textColor: 'text-amber-400',
    bgGlow: 'shadow-amber-500/20',
    description: 'The model has identified an elevated probability of cervical cancer risk based on the provided factors. This does not mean cancer is present, but further clinical evaluation is recommended.',
    recommendations: [
      'Schedule an appointment with a gynecologist for a detailed examination',
      'Consider more frequent Pap smear and HPV testing',
      'Discuss HPV co-testing with your healthcare provider',
      'Evaluate and address modifiable risk factors (e.g., smoking cessation)',
      'Consider colposcopy if recommended by your doctor',
      'Discuss STD treatment options if applicable',
    ],
  },
  critical: {
    color: 'risk-critical',
    gradient: 'from-red-500/20 to-rose-500/10',
    border: 'border-red-500/30',
    ringColor: 'ring-red-400',
    label: 'High Risk',
    emoji: '🚨',
    textColor: 'text-red-400',
    bgGlow: 'shadow-red-500/20',
    description: 'The model indicates a significantly elevated probability of cervical cancer risk. Immediate medical consultation is strongly advised. Early detection through proper clinical testing is critical for positive outcomes.',
    recommendations: [
      'Seek immediate consultation with a gynecological oncologist',
      'Undergo comprehensive screening including Pap smear, HPV test, and colposcopy',
      'Discuss biopsy options with your healthcare provider if not already done',
      'Comprehensive STD testing and treatment if applicable',
      'Explore all available treatment and intervention options',
      'Consider second medical opinion for treatment planning',
      'Ensure emotional and psychological support systems are in place',
    ],
  },
};

function RiskGauge({ probability }) {
  const percentage = Math.round(probability * 100);
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (probability * circumference);

  let gaugeColor = '#10b981';
  if (probability >= 0.6) gaugeColor = '#ef4444';
  else if (probability >= 0.25) gaugeColor = '#f59e0b';

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        {/* Background circle */}
        <circle
          cx="60" cy="60" r="54"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-surface-800"
        />
        {/* Animated progress circle */}
        <circle
          cx="60" cy="60" r="54"
          fill="none"
          stroke={gaugeColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
          style={{ filter: `drop-shadow(0 0 8px ${gaugeColor}50)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-white">{percentage}%</span>
        <span className="text-xs text-surface-400 font-medium">Probability</span>
      </div>
    </div>
  );
}

export default function ResultCard({ result, onReset }) {
  const risk = riskConfig[result.risk_level] || riskConfig.low;

  return (
    <div className="animate-fade-in-up max-w-3xl mx-auto">
      {/* Main Result Card */}
      <div className={`
        relative overflow-hidden rounded-2xl
        bg-gradient-to-br ${risk.gradient}
        border ${risk.border}
        backdrop-blur-xl
        shadow-2xl ${risk.bgGlow}
        p-8
      `}>
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/5 to-transparent rounded-full blur-3xl -translate-y-32 translate-x-32" />

        {/* Header */}
        <div className="relative flex flex-col sm:flex-row items-center gap-6 mb-8">
          <RiskGauge probability={result.probability} />

          <div className="text-center sm:text-left flex-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <span className="text-2xl">{risk.emoji}</span>
              <h2 className={`text-2xl font-bold ${risk.textColor}`}>
                {risk.label}
              </h2>
            </div>
            <p className="text-surface-300 text-sm leading-relaxed max-w-md">
              {risk.description}
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="relative grid grid-cols-3 gap-4 mb-8">
          <div className="bg-surface-900/50 rounded-xl p-4 text-center border border-surface-700/50">
            <p className="text-xs text-surface-400 mb-1 font-medium uppercase tracking-wider">Prediction</p>
            <p className={`text-sm font-bold ${risk.textColor}`}>{result.prediction}</p>
          </div>
          <div className="bg-surface-900/50 rounded-xl p-4 text-center border border-surface-700/50">
            <p className="text-xs text-surface-400 mb-1 font-medium uppercase tracking-wider">Threshold</p>
            <p className="text-sm font-bold text-white">{(result.threshold * 100).toFixed(0)}%</p>
          </div>
          <div className="bg-surface-900/50 rounded-xl p-4 text-center border border-surface-700/50">
            <p className="text-xs text-surface-400 mb-1 font-medium uppercase tracking-wider">Model</p>
            <p className="text-sm font-bold text-white truncate">{result.model_version}</p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="relative">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Recommendations
          </h3>
          <ul className="space-y-3">
            {risk.recommendations.map((rec, i) => (
              <li
                key={i}
                className="flex items-start gap-3 animate-slide-in-right"
                style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
              >
                <span className={`flex-shrink-0 w-6 h-6 rounded-full bg-surface-800 border ${risk.border} flex items-center justify-center mt-0.5`}>
                  <span className={`text-xs font-bold ${risk.textColor}`}>{i + 1}</span>
                </span>
                <p className="text-sm text-surface-300 leading-relaxed">{rec}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 p-4 rounded-xl bg-surface-900/80 border border-surface-700/50 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-amber-400 mb-1">Medical Disclaimer</p>
            <p className="text-xs text-surface-400 leading-relaxed">
              This tool is for <strong className="text-surface-300">educational and informational purposes only</strong>. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for any medical concerns. Machine learning predictions are probabilistic and should not be the sole basis for clinical decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={onReset}
          className="
            px-8 py-3 rounded-xl
            bg-gradient-to-r from-primary-600 to-accent-600
            hover:from-primary-500 hover:to-accent-500
            text-white font-semibold text-sm
            shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40
            transition-all duration-300 ease-out
            hover:scale-[1.02] active:scale-[0.98]
            cursor-pointer
          "
        >
          ← New Assessment
        </button>
      </div>
    </div>
  );
}
