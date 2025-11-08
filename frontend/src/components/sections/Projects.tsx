/**
 * Projects Section
 * 
 * Displays all portfolio projects in a responsive grid layout
 * with staggered animations and graceful loading states.
 */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/common/SectionTitle';
import ProjectCard from '@/components/common/ProjectCard';
import { getProjects } from '@/services/contentService';
import { Project } from '@/types';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  return (
    <section id="projects" className="py-24 px-6 bg-dark">
      <div className="max-w-7xl mx-auto">
        <SectionTitle>Projects</SectionTitle>

        {loading ? (
          <p className="text-text-secondary text-center">Loading projects...</p>
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
              visible: {
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
