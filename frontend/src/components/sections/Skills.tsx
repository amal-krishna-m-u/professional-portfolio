/**
 * Skills Section
 * 
 * Responsive glassy grid layout for categorized skills.
 * Includes animations, hover glow, and elegant styling.
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/common/SectionTitle';
import SkillCategoryCard from '@/components/common/SkillCategoryCard';
import { getSkillsByCategory } from '@/services/contentService';
import type { SkillCategory } from '@/types';

export default function Skills() {
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const data = await getSkillsByCategory();
        setSkills(data);
      } catch {
        setError('Failed to load skills');
      } finally {
        setLoading(false);
      }
    };
    loadSkills();
  }, []);

  return (
    <section id="skills" className="py-24 px-6 bg-dark">
      <div className="max-w-7xl mx-auto">
        <SectionTitle>Skills</SectionTitle>

        {loading ? (
          <p className="text-text-secondary text-center">Loading skills...</p>
        ) : error ? (
          <p className="text-red-400 text-center">{error}</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {skills.map((category, index) => (
              <SkillCategoryCard
                key={category.category}
                category={category}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
