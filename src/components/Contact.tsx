import { useRef, useState } from 'react';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setStatus('sending');

    // simulate sending
    setTimeout(() => {
      console.log(form); // you can see data in console
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });

      setTimeout(() => setStatus('idle'), 4000);
    }, 1000);
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-40" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="mb-16 text-center">
          <div className="section-tag mb-3">COMMUNICATIONS TERMINAL — OPEN CHANNEL</div>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#e0f7fa' }}>
            Establish <span style={{ color: 'var(--cyan)' }}>Contact</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          
          {/* LEFT SIDE (UNCHANGED) */}
          <div className="space-y-6">
            <div className="glass rounded-sm p-6 relative">
              <div className="section-tag mb-4">SIGNAL STATUS</div>
              <div className="space-y-4">
                {[
                  { label: 'Uplink', value: 'ACTIVE', ok: true },
                  { label: 'Encryption', value: 'ENABLED', ok: true },
                  { label: 'Response Time', value: '< 24 HRS', ok: true },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <span style={{ color: 'rgba(224,247,250,0.5)' }}>{item.label}</span>
                    <span style={{ color: item.ok ? '#00d4aa' : '#ff6b35' }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="glass rounded-sm p-6 relative">
            <div className="section-tag mb-6">TRANSMIT MESSAGE</div>

            {status === 'sent' ? (
              <div className="text-center py-12">
                <div className="text-sm font-bold mb-2" style={{ color: '#00d4aa' }}>
                  MESSAGE SENT ✅
                </div>
                <div className="text-xs">
                  (Frontend only — no backend connected)
                </div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3"
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3"
                />

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  required
                  rows={4}
                  className="w-full px-4 py-3"
                />

                <button type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>

              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}