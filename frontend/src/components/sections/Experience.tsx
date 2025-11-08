/**
 * Experience Section
 * 
 * Displays professional experience in a vertical timeline layout
 * with subtle glassmorphism and Framer Motion animations.
 */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/common/SectionTitle';
import ExperienceItem from '@/components/common/ExperienceItem';
import { getExperience } from '@/services/contentService';
import type { Experience } from '@/types';


export default function Experience() {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadExperience = async () => {
      try {
        const data = await getExperience();
        setExperience(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to load experience');
      } finally {
        setLoading(false);
      }
    };
    loadExperience();
  }, []);

  return (
    <section id="experience" className="py-24 px-6 bg-dark">
      <div className="max-w-5xl mx-auto">
        <SectionTitle>Experience</SectionTitle>

        {loading ? (
          <p className="text-text-secondary text-center">Loading experience...</p>
        ) : error ? (
          <p className="text-red-400 text-center">{error}</p>
        ) : (
          <motion.div
            className="relative border-l-2 border-accent-blue/30 pl-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {experience.map((exp, index) => (
              <ExperienceItem key={exp.id} experience={exp} index={index} />
            ))}

            {/* Timeline gradient line */}
            <motion.div
              className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent-blue to-transparent"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              viewport={{ once: true }}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
