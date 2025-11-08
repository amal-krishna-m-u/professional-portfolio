import { useState, useEffect } from 'react';
import { 
  getProjects, 
  getExperience, 
  getSkillsByCategory,
  checkApiHealth 
} from '@/services';
import type { Project, Experience, SkillCategory } from '@/types';

export default function TestPage() {
  const [isApiHealthy, setIsApiHealthy] = useState<boolean | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runTests = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Check API health
      console.log('🏥 Checking API health...');
      const healthy = await checkApiHealth();
      setIsApiHealthy(healthy);
      console.log(`API Status: ${healthy ? '✅ Healthy' : '❌ Unavailable'}`);
      
      // Load projects
      console.log('📦 Loading projects...');
      const projectsData = await getProjects();
      setProjects(projectsData);
      console.log('✅ Projects loaded:', projectsData);
      
      // Load experience
      console.log('💼 Loading experience...');
      const experienceData = await getExperience();
      setExperience(experienceData);
      console.log('✅ Experience loaded:', experienceData);
      
      // Load skills
      console.log('🎯 Loading skills...');
      const skillsData = await getSkillsByCategory();
      setSkills(skillsData);
      console.log('✅ Skills loaded:', skillsData);
      
      console.log('✅ All tests passed!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('❌ Test failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runTests();
  }, []);

  return (
    <div className="min-h-screen bg-bg-dark text-text-primary p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-accent-blue mb-2">
            🧪 Services Test Page
          </h1>
          <p className="text-text-secondary font-mono">
            Testing API services with fallback to mock data
          </p>
        </div>

        {/* Environment Info */}
        <div className="glass-bg p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4 text-accent-blue">
            Environment Configuration
          </h2>
          <div className="space-y-2 font-mono text-sm">
            <div>
              <span className="text-text-secondary">Environment:</span>{' '}
              <span className="text-text-primary">
                {import.meta.env.VITE_ENVIRONMENT}
              </span>
            </div>
            <div>
              <span className="text-text-secondary">API Base URL:</span>{' '}
              <span className="text-text-primary">
                {import.meta.env.VITE_API_BASE_URL}
              </span>
            </div>
            <div>
              <span className="text-text-secondary">Using Mock Data:</span>{' '}
              <span className="text-text-primary">
                {import.meta.env.VITE_USE_MOCK_DATA}
              </span>
            </div>
            <div>
              <span className="text-text-secondary">API Health:</span>{' '}
              <span className={isApiHealthy ? 'text-green-500' : 'text-red-500'}>
                {isApiHealthy === null ? '⏳ Checking...' : isApiHealthy ? '✅ Healthy' : '❌ Unavailable'}
              </span>
            </div>
          </div>
        </div>

        {/* Test Controls */}
        <div className="mb-6">
          <button
            onClick={runTests}
            disabled={loading}
            className="px-6 py-3 bg-accent-blue text-bg-dark rounded-lg font-mono font-semibold hover:opacity-80 disabled:opacity-50 transition-opacity"
          >
            {loading ? 'Testing...' : 'Re-run Tests'}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-900/20 border border-red-500 text-red-400 p-4 rounded-lg mb-6">
            <strong>❌ Error:</strong> {error}
          </div>
        )}

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Projects */}
          <div className="glass-bg p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-accent-blue">
              Projects ({projects.length})
            </h3>
            <div className="space-y-2">
              {projects.map(project => (
                <div key={project.id} className="text-sm">
                  <div className="font-mono text-text-primary">
                    {project.icon} {project.title}
                  </div>
                  <div className="text-text-secondary text-xs">
                    {project.tech_stack.slice(0, 3).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="glass-bg p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-accent-blue">
              Experience ({experience.length})
            </h3>
            <div className="space-y-2">
              {experience.map(exp => (
                <div key={exp.id} className="text-sm">
                  <div className="font-mono text-text-primary">
                    {exp.position}
                  </div>
                  <div className="text-text-secondary text-xs">
                    {exp.company} {exp.is_current && '(Current)'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="glass-bg p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-accent-blue">
              Skills ({skills.length} categories)
            </h3>
            <div className="space-y-2">
              {skills.map((category, idx) => (
                <div key={idx} className="text-sm">
                  <div className="font-mono text-text-primary">
                    {category.category}
                  </div>
                  <div className="text-text-secondary text-xs">
                    {category.skills.length} skills
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* JSON Output (Collapsible) */}
        <details className="mt-8 glass-bg p-6 rounded-lg">
          <summary className="cursor-pointer text-accent-blue font-mono font-semibold">
            📋 View Raw JSON Data
          </summary>
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-text-secondary mb-2">Projects:</h4>
              <pre className="bg-bg-dark p-4 rounded overflow-auto text-xs">
                {JSON.stringify(projects, null, 2)}
              </pre>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text-secondary mb-2">Experience:</h4>
              <pre className="bg-bg-dark p-4 rounded overflow-auto text-xs">
                {JSON.stringify(experience, null, 2)}
              </pre>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text-secondary mb-2">Skills:</h4>
              <pre className="bg-bg-dark p-4 rounded overflow-auto text-xs">
                {JSON.stringify(skills, null, 2)}
              </pre>
            </div>
          </div>
        </details>

        {/* Instructions */}
        <div className="mt-8 text-text-secondary text-sm font-mono">
          <p>💡 Tips:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Open DevTools Console (F12) to see detailed logs</li>
            <li>Data is automatically loaded from mock JSON files</li>
            <li>API calls will fail gracefully and use mock data</li>
            <li>Check localStorage to see cached data</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
