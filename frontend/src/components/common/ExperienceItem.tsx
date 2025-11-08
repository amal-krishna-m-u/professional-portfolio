/**
 * ExperienceItem Component
 * 
 * Renders a single timeline entry for the Experience section.
 */

import { motion } from 'framer-motion';
import { Experience } from '@/types';

interface ExperienceItemProps {
  experience: Experience;
  index: number;
}

export default function ExperienceItem({ experience, index }: ExperienceItemProps) {
  // Format date range
  const startDate = new Date(experience.start_date).toLocaleString('default', {
    month: 'short',
    year: 'numeric',
  });
  const endDate = experience.is_current
    ? 'Present'
    : experience.end_date
    ? new Date(experience.end_date).toLocaleString('default', {
        month: 'short',
        year: 'numeric',
      })
    : 'N/A';

  return (
    <motion.div
      className="relative pl-8 mb-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {/* Timeline Dot */}
      <span className="absolute left-0 top-2 w-3 h-3 bg-accent-blue rounded-full shadow-[0_0_0_4px_rgba(0,217,255,0.2)]" />

      {/* Date */}
      <p className="text-accent-blue font-mono text-sm mb-1">
        {startDate} - {endDate}
      </p>

      {/* Position */}
      <h3 className="text-lg md:text-xl font-semibold text-white mb-1">
        {experience.position}
      </h3>

      {/* Company + Location */}
      <p className="text-text-secondary mb-2 text-sm">
        {experience.company} • {experience.location}
      </p>

      {/* Description */}
      <p className="text-text-secondary leading-relaxed text-sm md:text-base">
        {experience.description}
      </p>
    </motion.div>
  );
}
