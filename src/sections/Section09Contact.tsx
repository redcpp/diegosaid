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
  { key: 'name', label: 'name', type: 'text', placeholder: 'Your name', required: true },
  { key: 'email', label: 'email', type: 'email', placeholder: 'diego@camgrupo.com', required: true },
  { key: 'subject', label: 'subject', type: 'text', placeholder: 'System Architecture Consulting Inquiry', required: true },
  { key: 'message', label: 'message', type: 'textarea', placeholder: 'Briefly describe your project, timeline, and budget.', required: true, rows: 6 },
  { key: 'engagement_type', label: 'engagement_type', type: 'select', placeholder: '', required: false, options: ['Full-Time Engineering', 'Contract Consulting', 'System Architecture Review', 'DeFi Protocol Audit', 'Other'] },
];

const QUICK_CONTACT = [
  { label: 'EMAIL', value: 'diego@camgrupo.com', href: 'mailto:diego@camgrupo.com' },
  { label: 'PHONE', value: '+52 322 111 7595', href: 'tel:+523221117595' },
  { label: 'LINKEDIN', value: 'linkedin.com/in/redcpp', href: 'https://linkedin.com/in/redcpp' },
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
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      }
    );

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.stamp-row'),
      { x: 20, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
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
      className="w-full bg-creme py-20 lg:py-24 px-6 lg:px-20 texture-grid relative overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto relative z-10">
        <SectionEyebrow text="SEND A MESSAGE" />
        <div className="mt-4 mb-14">
          <h2 className="font-headline font-bold text-[36px] sm:text-display-lg uppercase text-ink leading-[0.95] tracking-[-0.015em]">
            PROJECT<br />
            <span className="text-cobalt">INQUIRY FORM</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Form */}
          <div className="lg:col-span-8">
            {submitted ? (
              <div
                className="flex flex-col items-start gap-4 animate-in fade-in duration-500"
                aria-live="polite"
                aria-atomic="true"
              >
                <div className="bg-ink rounded-sm p-7 font-mono text-mono-text text-left w-full max-w-xl border border-ink shadow-[0_24px_48px_-24px_rgba(26,26,26,0.45)]">
                  <p className="text-creme">
                    Message sent. Reply within ~24 hours.
                  </p>
                </div>
                <MechanicalButton onClick={reset} variant="outline" className="mt-2">
                  SEND ANOTHER &rarr;
                </MechanicalButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7" noValidate>
                {FIELDS.map((field) => (
                  <div key={field.key} className="form-field opacity-0">
                    <label
                      className="flex items-baseline gap-3 mb-2"
                      htmlFor={field.key}
                    >
                      <span className="font-mono text-[12px] tracking-[0.04em] text-cobalt">
                        $ {field.label}:
                        {field.required && (
                          <span className="text-oxblood ml-1" aria-hidden="true">
                            *
                          </span>
                        )}
                      </span>
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        id={field.key}
                        name={field.key}
                        rows={field.rows || 4}
                        placeholder={field.placeholder}
                        value={formData[field.key] || ''}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, [field.key]: e.target.value }))
                        }
                        onBlur={(e) => handleBlur(field.key, e.target.value)}
                        aria-invalid={!!errors[field.key]}
                        aria-describedby={
                          errors[field.key] ? `${field.key}-error` : undefined
                        }
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
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, [field.key]: e.target.value }))
                        }
                        className="w-full bg-transparent border-0 border-b-2 border-stone px-0 py-3 font-body text-[16px] text-ink focus:outline-none focus:border-cobalt transition-colors duration-300 appearance-none cursor-pointer"
                      >
                        <option value="">Select...</option>
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id={field.key}
                        name={field.key}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.key] || ''}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, [field.key]: e.target.value }))
                        }
                        onBlur={(e) => handleBlur(field.key, e.target.value)}
                        aria-invalid={!!errors[field.key]}
                        aria-describedby={
                          errors[field.key] ? `${field.key}-error` : undefined
                        }
                        required={field.required}
                        className={`w-full bg-transparent border-0 border-b-2 px-0 py-3 font-body text-[16px] text-ink placeholder:text-stone-text placeholder:italic focus:outline-none transition-colors duration-300 focus:border-cobalt ${
                          errors[field.key] ? 'border-oxblood' : 'border-stone'
                        }`}
                      />
                    )}
                    {errors[field.key] && (
                      <p
                        id={`${field.key}-error`}
                        className="font-mono text-[13px] text-oxblood mt-1"
                      >
                        {errors[field.key]}
                      </p>
                    )}
                  </div>
                ))}

                <div className="form-field opacity-0 pt-6">
                  <MechanicalButton type="submit" variant="filled" className="w-full">
                    TRANSMIT MESSAGE &rarr;
                  </MechanicalButton>
                </div>
              </form>
            )}
          </div>

          {/* Quick-contact stamp panel */}
          <aside className="lg:col-span-4 relative">
            <div className="sticky top-24">
              <div className="bg-parchment border border-ink/15 p-6 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="font-headline font-bold text-[18px] uppercase text-ink tracking-[0.005em]">
                    Prefer to skip the form?
                  </h3>
                  <p className="font-body text-[13px] text-ink/70 mt-2 leading-[1.6]">
                    Reach me on any of these channels.
                  </p>

                  <ul className="mt-5 border-t border-ink/15">
                    {QUICK_CONTACT.map((row) => (
                      <li
                        key={row.label}
                        className="stamp-row opacity-0 border-b border-ink/10"
                      >
                        <a
                          href={row.href}
                          target={row.href.startsWith('http') ? '_blank' : undefined}
                          rel={
                            row.href.startsWith('http')
                              ? 'noopener noreferrer'
                              : undefined
                          }
                          className="flex flex-col py-3 group"
                        >
                          <span className="font-mono text-[10px] tracking-[0.18em] text-ink/50 uppercase">
                            {row.label}
                          </span>
                          <span className="font-headline font-medium text-[14px] text-ink mt-1 group-hover:text-cobalt transition-colors flex items-center gap-2">
                            {row.value}
                            <span className="text-cobalt opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                              →
                            </span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
