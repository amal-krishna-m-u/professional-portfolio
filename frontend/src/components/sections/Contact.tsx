/**
 * Contact Section
 *
 * Glassmorphism contact form with accent-blue labels,
 * focus glow, and simple toast notifications.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/common/SectionTitle';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Textarea from '@/components/common/Textarea';
import { submitContactForm, isValidEmail } from '@/services/contactService';
import type { ContactFormData } from '@/types';


export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(
    null
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in all fields.', 'error');
      return;
    }

    if (!isValidEmail(formData.email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    setStatus('loading');
    const response = await submitContactForm(formData);

    if (response.success) {
      showToast('✅ Message sent successfully!', 'success');
      setFormData({ name: '', email: '', message: '' });
    } else {
      showToast('❌ Failed to send message. Please try again later.', 'error');
    }

    setStatus('idle');
  };

  return (
    <section id="contact" className="py-24 px-6 bg-dark relative">
      <div className="max-w-xl mx-auto">
        <SectionTitle>Contact</SectionTitle>

        {/* Toast Notification */}
        {toast && (
          <div
            className={`fixed top-6 right-6 z-50 px-4 py-2 rounded-lg text-sm font-medium shadow-lg backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-green-500/10 border border-green-400 text-green-400'
                : 'bg-red-500/10 border border-red-400 text-red-400'
            }`}
          >
            {toast.message}
          </div>
        )}

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-bg border border-white/10 rounded-xl p-6 md:p-8 shadow-lg backdrop-blur-lg"
        >
          {/* Name */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-accent-blue font-mono text-sm uppercase tracking-wide"
            >
              name:
            </label>
            <Input
              id="name"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-accent-blue font-mono text-sm uppercase tracking-wide"
            >
              email:
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Message */}
          <div className="mb-8">
            <label
              htmlFor="message"
              className="block mb-2 text-accent-blue font-mono text-sm uppercase tracking-wide"
            >
              message:
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Your message..."
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={status === 'loading'}
            className={`w-full font-mono ${
              status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {status === 'loading' ? 'sending...' : 'send_message()'}
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
