import { useState } from 'react';
import FormStepper from './FormStepper';
import FormField, { ToggleField } from './FormField';
import ResultCard from './ResultCard';

const API_URL = 'http://localhost:8000';

const initialFormData = {
  age: '',
  num_sexual_partners: '',
  first_sexual_intercourse: '',
  num_pregnancies: '',
  smokes: 0,
  smokes_years: 0,
  smokes_packs_year: 0,
  hormonal_contraceptives: 0,
  hormonal_contraceptives_years: 0,
  iud: 0,
  iud_years: 0,
  stds: 0,
  stds_number: 0,
  stds_condylomatosis: 0,
  stds_cervical_condylomatosis: 0,
  stds_vaginal_condylomatosis: 0,
  stds_vulvo_perineal_condylomatosis: 0,
  stds_syphilis: 0,
  stds_pelvic_inflammatory_disease: 0,
  stds_genital_herpes: 0,
  stds_molluscum_contagiosum: 0,
  stds_aids: 0,
  stds_hiv: 0,
  stds_hepatitis_b: 0,
  stds_hpv: 0,
  stds_number_of_diagnosis: 0,
  dx_cancer: 0,
  dx_cin: 0,
  dx_hpv: 0,
  dx: 0,
  hinselmann: 0,
  schiller: 0,
  citology: 0,
};

export default function PredictionForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === '' ? '' : Number(value),
    }));
  };

  const nextStep = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setStep((s) => Math.min(s + 1, 4));
  };
  const prevStep = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Build the payload — convert empty strings to 0
    const payload = {};
    for (const key in formData) {
      payload[key] = formData[key] === '' ? 0 : Number(formData[key]);
    }

    try {
      const res = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.detail || `Server error (${res.status})`);
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to connect to the server. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setFormData(initialFormData);
    setStep(1);
    setError(null);
  };

  // Show result
  if (result) {
    return <ResultCard result={result} onReset={handleReset} />;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <FormStepper currentStep={step} />

      {/* Form Card */}
      <div className="
        relative overflow-hidden rounded-2xl
        bg-surface-900/80 border border-surface-700/50
        backdrop-blur-xl shadow-2xl shadow-black/20
        p-6 sm:p-8
      ">
        {/* Decorative corner gradient */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-3xl -translate-x-24 -translate-y-24" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-accent-500/10 to-transparent rounded-full blur-3xl translate-x-24 translate-y-24" />

        <div className="relative">
          {/* Step 1: Demographics */}
          {step === 1 && (
            <div className="animate-fade-in-up">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-2xl">👤</span> Demographics & Reproductive History
                </h2>
                <p className="text-sm text-surface-400 mt-1">Basic patient information and reproductive background.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField
                  label="Age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min={0}
                  max={120}
                  required
                  tooltip="Patient's current age in years"
                />
                <FormField
                  label="Number of Sexual Partners"
                  name="num_sexual_partners"
                  value={formData.num_sexual_partners}
                  onChange={handleChange}
                  required
                  tooltip="Lifetime number of sexual partners"
                />
                <FormField
                  label="Age at First Sexual Intercourse"
                  name="first_sexual_intercourse"
                  value={formData.first_sexual_intercourse}
                  onChange={handleChange}
                  required
                  tooltip="Age when first sexual intercourse occurred"
                />
                <FormField
                  label="Number of Pregnancies"
                  name="num_pregnancies"
                  value={formData.num_pregnancies}
                  onChange={handleChange}
                  required
                  tooltip="Total number of pregnancies"
                />
              </div>
            </div>
          )}

          {/* Step 2: Lifestyle & Contraceptives */}
          {step === 2 && (
            <div className="animate-fade-in-up">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-2xl">🩺</span> Lifestyle & Contraceptives
                </h2>
                <p className="text-sm text-surface-400 mt-1">Smoking habits and contraceptive usage history.</p>
              </div>

              {/* Smoking Section */}
              <div className="mb-6 p-4 rounded-xl bg-surface-800/40 border border-surface-700/30">
                <h3 className="text-sm font-semibold text-surface-300 mb-4 uppercase tracking-wider">Smoking</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <ToggleField
                    label="Smokes"
                    name="smokes"
                    value={formData.smokes}
                    onChange={handleChange}
                    tooltip="Currently a smoker?"
                  />
                  <FormField
                    label="Smoking Years"
                    name="smokes_years"
                    value={formData.smokes_years}
                    onChange={handleChange}
                    tooltip="Number of years smoking"
                  />
                  <FormField
                    label="Packs per Year"
                    name="smokes_packs_year"
                    value={formData.smokes_packs_year}
                    onChange={handleChange}
                    tooltip="Average number of packs smoked per year"
                  />
                </div>
              </div>

              {/* Contraceptives Section */}
              <div className="mb-6 p-4 rounded-xl bg-surface-800/40 border border-surface-700/30">
                <h3 className="text-sm font-semibold text-surface-300 mb-4 uppercase tracking-wider">Hormonal Contraceptives</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <ToggleField
                    label="Uses Hormonal Contraceptives"
                    name="hormonal_contraceptives"
                    value={formData.hormonal_contraceptives}
                    onChange={handleChange}
                  />
                  <FormField
                    label="Years of Use"
                    name="hormonal_contraceptives_years"
                    value={formData.hormonal_contraceptives_years}
                    onChange={handleChange}
                    tooltip="Duration of hormonal contraceptive usage"
                  />
                </div>
              </div>

              {/* IUD Section */}
              <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/30">
                <h3 className="text-sm font-semibold text-surface-300 mb-4 uppercase tracking-wider">Intrauterine Device (IUD)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <ToggleField
                    label="Uses IUD"
                    name="iud"
                    value={formData.iud}
                    onChange={handleChange}
                  />
                  <FormField
                    label="IUD Years"
                    name="iud_years"
                    value={formData.iud_years}
                    onChange={handleChange}
                    tooltip="Duration of IUD usage in years"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: STD History */}
          {step === 3 && (
            <div className="animate-fade-in-up">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-2xl">🔬</span> STD History
                </h2>
                <p className="text-sm text-surface-400 mt-1">History of sexually transmitted diseases and infections.</p>
              </div>

              <div className="mb-6 p-4 rounded-xl bg-surface-800/40 border border-surface-700/30">
                <h3 className="text-sm font-semibold text-surface-300 mb-4 uppercase tracking-wider">General</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <ToggleField
                    label="Any STDs"
                    name="stds"
                    value={formData.stds}
                    onChange={handleChange}
                    tooltip="Has had any STDs"
                  />
                  <FormField
                    label="Number of STDs"
                    name="stds_number"
                    value={formData.stds_number}
                    onChange={handleChange}
                    tooltip="How many different STDs"
                  />
                  <FormField
                    label="Number of Diagnoses"
                    name="stds_number_of_diagnosis"
                    value={formData.stds_number_of_diagnosis}
                    onChange={handleChange}
                    tooltip="Total STD diagnosis count"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/30">
                <h3 className="text-sm font-semibold text-surface-300 mb-4 uppercase tracking-wider">Specific STDs</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ToggleField label="Condylomatosis" name="stds_condylomatosis" value={formData.stds_condylomatosis} onChange={handleChange} />
                  <ToggleField label="Cervical Condylomatosis" name="stds_cervical_condylomatosis" value={formData.stds_cervical_condylomatosis} onChange={handleChange} />
                  <ToggleField label="Vaginal Condylomatosis" name="stds_vaginal_condylomatosis" value={formData.stds_vaginal_condylomatosis} onChange={handleChange} />
                  <ToggleField label="Vulvo-Perineal Condylomatosis" name="stds_vulvo_perineal_condylomatosis" value={formData.stds_vulvo_perineal_condylomatosis} onChange={handleChange} />
                  <ToggleField label="Syphilis" name="stds_syphilis" value={formData.stds_syphilis} onChange={handleChange} />
                  <ToggleField label="Pelvic Inflammatory Disease" name="stds_pelvic_inflammatory_disease" value={formData.stds_pelvic_inflammatory_disease} onChange={handleChange} />
                  <ToggleField label="Genital Herpes" name="stds_genital_herpes" value={formData.stds_genital_herpes} onChange={handleChange} />
                  <ToggleField label="Molluscum Contagiosum" name="stds_molluscum_contagiosum" value={formData.stds_molluscum_contagiosum} onChange={handleChange} />
                  <ToggleField label="AIDS" name="stds_aids" value={formData.stds_aids} onChange={handleChange} />
                  <ToggleField label="HIV" name="stds_hiv" value={formData.stds_hiv} onChange={handleChange} />
                  <ToggleField label="Hepatitis B" name="stds_hepatitis_b" value={formData.stds_hepatitis_b} onChange={handleChange} />
                  <ToggleField label="HPV" name="stds_hpv" value={formData.stds_hpv} onChange={handleChange} />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Diagnostics */}
          {step === 4 && (
            <div className="animate-fade-in-up">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-2xl">📋</span> Diagnostic History
                </h2>
                <p className="text-sm text-surface-400 mt-1">Previous diagnostic tests and findings.</p>
              </div>

              <div className="mb-6 p-4 rounded-xl bg-surface-800/40 border border-surface-700/30">
                <h3 className="text-sm font-semibold text-surface-300 mb-4 uppercase tracking-wider">Previous Diagnoses</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ToggleField label="Diagnosed with Cancer" name="dx_cancer" value={formData.dx_cancer} onChange={handleChange} tooltip="Previous cancer diagnosis" />
                  <ToggleField label="Diagnosed with CIN" name="dx_cin" value={formData.dx_cin} onChange={handleChange} tooltip="Cervical Intraepithelial Neoplasia" />
                  <ToggleField label="Diagnosed with HPV" name="dx_hpv" value={formData.dx_hpv} onChange={handleChange} tooltip="Previous HPV diagnosis" />
                  <ToggleField label="Any Diagnosis (Dx)" name="dx" value={formData.dx} onChange={handleChange} tooltip="Any previous relevant diagnosis" />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/30">
                <h3 className="text-sm font-semibold text-surface-300 mb-4 uppercase tracking-wider">Screening Tests</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <ToggleField label="Hinselmann Test" name="hinselmann" value={formData.hinselmann} onChange={handleChange} tooltip="Colposcopy using acetic acid" />
                  <ToggleField label="Schiller Test" name="schiller" value={formData.schiller} onChange={handleChange} tooltip="Iodine-based cervical test" />
                  <ToggleField label="Citology" name="citology" value={formData.citology} onChange={handleChange} tooltip="Pap smear / cytological examination" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 animate-fade-in-up">
            <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-red-400">Error</p>
              <p className="text-xs text-red-300/80 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={(e) => prevStep(e)}
            disabled={step === 1}
            className={`
              px-6 py-2.5 rounded-xl text-sm font-medium
              transition-all duration-300 ease-out
              cursor-pointer
              ${step === 1
                ? 'opacity-0 pointer-events-none'
                : 'bg-surface-800 hover:bg-surface-700 text-surface-300 hover:text-white border border-surface-600 hover:border-surface-500'
              }
            `}
          >
            ← Previous
          </button>

          {step < 4 ? (
            <button
              type="button"
              onClick={(e) => nextStep(e)}
              className="
                px-6 py-2.5 rounded-xl text-sm font-semibold
                bg-gradient-to-r from-primary-600 to-accent-600
                hover:from-primary-500 hover:to-accent-500
                text-white
                shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40
                transition-all duration-300 ease-out
                hover:scale-[1.02] active:scale-[0.98]
                cursor-pointer
              "
            >
              Next →
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="
                px-8 py-2.5 rounded-xl text-sm font-semibold
                bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600
                hover:from-primary-500 hover:via-accent-500 hover:to-primary-500
                text-white
                shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40
                transition-all duration-300 ease-out
                hover:scale-[1.02] active:scale-[0.98]
                animate-gradient
                disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
                cursor-pointer
                flex items-center gap-2
              "
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Analyzing...
                </>
              ) : (
                <>🔍 Assess Risk</>
              )}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
