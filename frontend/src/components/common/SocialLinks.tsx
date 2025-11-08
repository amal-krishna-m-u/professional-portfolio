/**
 * SocialLinks Component
 *
 * Displays animated glassy social icons with hover glow.
 */

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

interface SocialLinksProps {
  className?: string;
}

export default function SocialLinks({ className = '' }: SocialLinksProps) {
  const socials = [
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: 'https://www.linkedin.com/in/amal-krishna-m-u-4055a1185/',
      label: 'LinkedIn',
    },
    {
      icon: <Github className="w-5 h-5" />,
      href: 'https://github.com/amal-krishna-m-u',
      label: 'GitHub',
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: 'mailto:amalkrishnam3@gmail.com',
      label: 'Email',
    },
  ];

  return (
    <motion.div
      className={`flex justify-center gap-5 mt-10 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {socials.map((item) => (
        <motion.a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          className="w-12 h-12 rounded-full glass-bg border border-white/10 flex items-center justify-center text-accent-blue hover:bg-accent-blue hover:text-bg-dark transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(0,217,255,0.3)]"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {item.icon}
        </motion.a>
      ))}
    </motion.div>
  );
}
