const steps = [
  { id: 1, label: 'Demographics', icon: '👤' },
  { id: 2, label: 'Lifestyle', icon: '🩺' },
  { id: 3, label: 'STD History', icon: '🔬' },
  { id: 4, label: 'Diagnostics', icon: '📋' },
];

export default function FormStepper({ currentStep }) {
  return (
    <div className="flex items-center justify-between mb-10 px-2">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center flex-1">
          {/* Step circle */}
          <div className="flex flex-col items-center relative">
            <div
              className={`
                w-11 h-11 rounded-full flex items-center justify-center text-base font-semibold
                transition-all duration-500 ease-out relative z-10
                ${currentStep > step.id
                  ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/30'
                  : currentStep === step.id
                    ? 'bg-gradient-to-br from-primary-500 to-accent-600 text-white shadow-lg shadow-primary-500/40 scale-110'
                    : 'bg-surface-800 text-surface-400 border border-surface-600'
                }
              `}
            >
              {currentStep > step.id ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span>{step.icon}</span>
              )}
            </div>
            {/* Active ring pulse */}
            {currentStep === step.id && (
              <div className="absolute inset-0 w-11 h-11 rounded-full bg-primary-400/20 animate-ring-pulse" />
            )}
            <span
              className={`
                mt-2 text-xs font-medium whitespace-nowrap hidden sm:block
                ${currentStep >= step.id ? 'text-primary-300' : 'text-surface-500'}
              `}
            >
              {step.label}
            </span>
          </div>

          {/* Connector line */}
          {index < steps.length - 1 && (
            <div className="flex-1 mx-3 h-0.5 rounded-full bg-surface-700 relative overflow-hidden mt-[-18px] sm:mt-0">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: currentStep > step.id ? '100%' : '0%' }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
