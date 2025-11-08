/**
 * SkillCategoryCard Component
 * 
 * Displays a skill category card with hover glow,
 * gradient bar, and smooth entry animations.
 */

import { motion } from 'framer-motion';
import type { SkillCategory } from '@/types';

interface SkillCategoryCardProps {
  category: SkillCategory;
  index: number;
}

export default function SkillCategoryCard({ category, index }: SkillCategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative glass-bg rounded-xl border border-white/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent-blue/20 hover:border-accent-blue before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-accent-blue before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
    >
      {/* Category Title */}
      <h3 className="text-accent-blue font-mono text-lg mb-4 flex items-center gap-2">
        <span>&gt;</span> {category.category}
      </h3>

      {/* Skills List */}
      <ul className="list-none space-y-2">
        {category.skills.map((skill) => (
          <li
            key={skill.id}
            className="text-text-secondary relative pl-4 text-sm before:content-['▹'] before:absolute before:left-0 before:text-accent-blue before:opacity-80"
          >
            {skill.name}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
