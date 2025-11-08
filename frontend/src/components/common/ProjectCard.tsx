/**
 * ProjectCard Component
 * 
 * Displays a single project card using the shared Card component.
 * Includes hover glow, icons, description, and tech tags.
 */

import { Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from './Card';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25 }}
    >
      <Card
        gradient
        hover
        onClick={onClick}
        className="cursor-pointer border border-white/10 flex flex-col justify-between"
      >
        {/* Top Section */}
        <div>
          {/* Icon */}
          {project.icon && (
            <div className="w-10 h-10 bg-accent-blue/10 rounded-lg flex items-center justify-center mb-4 text-xl">
              {project.icon}
            </div>
          )}

          {/* Title & Subtitle */}
          <h3 className="text-lg font-semibold text-white mb-1">{project.title}</h3>
          <p className="text-accent-blue font-mono text-sm mb-3">{project.subtitle}</p>

          {/* Description */}
          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tech_stack?.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-accent-blue/10 border border-accent-blue/30 rounded text-accent-blue text-xs font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer (Links) */}
        {(project.github_url || project.live_url) && (
          <div className="flex gap-3 mt-5 text-accent-blue">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        )}
      </Card>
    </motion.div>
  );
}
