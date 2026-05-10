import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionEyebrow from '@/components/SectionEyebrow';
import MechanicalButton from '@/components/MechanicalButton';
import useReducedMotion from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

interface FormField {
  key: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  rows?: number;
  options?: string[];
}

const FIELDS: FormField[] = [
  { key: 'name', label: 'name', type: 'text', placeholder: 'Diego Said Anaya Mancilla', required: true },
  { key: 'email', label: 'email', type: 'email', placeholder: 'diego@camgrupo.com', required: true },
  { key: 'subject', label: 'subject', type: 'text', placeholder: 'System Architecture Consulting Inquiry', required: true },
  { key: 'message', label: 'message', type: 'textarea', placeholder: 'Describe your project with the same rigor you\'d use in a technical specification document...', required: true, rows: 6 },
  { key: 'engagement_type', label: 'engagement_type', type: 'select', placeholder: '', required: false, options: ['Full-Time Engineering', 'Contract Consulting', 'System Architecture Review', 'DeFi Protocol Audit', 'Other'] },
];

export default function Section09Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || reducedMotion) return;

    const fields = sectionRef.current.querySelectorAll('.form-field');
    gsap.fromTo(
      fields,
      { x: -20, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      }
    );
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  const validate = (key: string, value: string) => {
    if (key === 'email') {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(value)) return 'Please enter a valid email address';
    }
    if (FIELDS.find((f) => f.key === key)?.required && !value.trim()) {
      return `Please enter your ${key}`;
    }
    return '';
  };

  const handleBlur = (key: string, value: string) => {
    const err = validate(key, value);
    setErrors((prev) => ({ ...prev, [key]: err }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    FIELDS.forEach((field) => {
      if (field.required) {
        const err = validate(field.key, formData[field.key] || '');
        if (err) newErrors[field.key] = err;
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    }
  };

  const reset = () => {
    setSubmitted(false);
    setFormData({});
    setErrors({});
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="w-full bg-creme py-32 lg:py-40 px-6 lg:px-20 texture-grid"
    >
      <div className="max-w-[640px] mx-auto relative z-10">
        <SectionEyebrow text="SEND A MESSAGE" />
        <h2 className="font-headline font-bold text-[28px] sm:text-display-md uppercase text-ink text-center mt-4">
          PROJECT INQUIRY FORM
        </h2>
        <p className="font-body text-[14px] text-ink/65 italic text-center mt-3">
          Fill out this form with the precision of a technical specification.
        </p>

        {submitted ? (
          <div className="mt-12 flex flex-col items-center text-center gap-4 animate-in fade-in duration-500" aria-live="polite" aria-atomic="true">
            {/* Terminal success state */}
            <div className="bg-ink rounded-xl p-6 font-mono text-mono-text text-left w-full max-w-md">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#28c840]" />
                <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
                <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
              </div>
              <div className="space-y-1 text-creme">
                <p><span className="text-sage">$</span> transmit_message</p>
                <p className="text-cobalt">&gt;&gt; PACKET SENT</p>
                <p className="text-cobalt">&gt;&gt; Response: ACK</p>
                <p className="text-cobalt">&gt;&gt; ETA: ~24 hours</p>
                <p className="animate-cursor-blink">_</p>
              </div>
            </div>
            <MechanicalButton onClick={reset} variant="outline" className="mt-4">
              SEND ANOTHER &rarr;
            </MechanicalButton>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-12 space-y-6" noValidate>
            {FIELDS.map((field) => (
              <div key={field.key} className="form-field opacity-0">
                <label className="font-mono text-[12px] tracking-[0.04em] text-cobalt block mb-2" htmlFor={field.key}>
                  $ {field.label}:
                  {field.required && <span className="text-oxblood ml-1" aria-hidden="true">*</span>}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.key}
                    name={field.key}
                    rows={field.rows || 4}
                    placeholder={field.placeholder}
                    value={formData[field.key] || ''}
                    onChange={(e) => setFormData((p) => ({ ...p, [field.key]: e.target.value }))}
                    onBlur={(e) => handleBlur(field.key, e.target.value)}
                    aria-invalid={!!errors[field.key]}
                    aria-describedby={errors[field.key] ? `${field.key}-error` : undefined}
                    required={field.required}
                    className={`w-full bg-transparent border-0 border-b-2 px-0 py-3 font-body text-[16px] text-ink placeholder:text-stone-text placeholder:italic resize-y focus:outline-none transition-colors duration-300 focus:border-cobalt ${
                      errors[field.key] ? 'border-oxblood' : 'border-stone'
                    }`}
                  />
                ) : field.type === 'select' ? (
                  <select
                    id={field.key}
                    name={field.key}
                    value={formData[field.key] || ''}
                    onChange={(e) => setFormData((p) => ({ ...p, [field.key]: e.target.value }))}
                    className="w-full bg-transparent border-0 border-b-2 border-stone px-0 py-3 font-body text-[16px] text-ink focus:outline-none focus:border-cobalt transition-colors duration-300 appearance-none cursor-pointer"
                  >
                    <option value="">Select...</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={field.key}
                    name={field.key}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.key] || ''}
                    onChange={(e) => setFormData((p) => ({ ...p, [field.key]: e.target.value }))}
                    onBlur={(e) => handleBlur(field.key, e.target.value)}
                    aria-invalid={!!errors[field.key]}
                    aria-describedby={errors[field.key] ? `${field.key}-error` : undefined}
                    required={field.required}
                    className={`w-full bg-transparent border-0 border-b-2 px-0 py-3 font-body text-[16px] text-ink placeholder:text-stone-text placeholder:italic focus:outline-none transition-colors duration-300 focus:border-cobalt ${
                      errors[field.key] ? 'border-oxblood' : 'border-stone'
                    }`}
                  />
                )}
                {errors[field.key] && (
                  <p id={`${field.key}-error`} className="font-mono text-[13px] text-oxblood mt-1">{errors[field.key]}</p>
                )}
              </div>
            ))}

            <div className="form-field opacity-0 pt-8">
              <MechanicalButton type="submit" variant="filled" className="w-full">
                TRANSMIT MESSAGE &rarr;
              </MechanicalButton>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
