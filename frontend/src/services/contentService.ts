/**
 * Content Service
 * 
 * Handles fetching portfolio content with intelligent fallback:
 * 1. Try to fetch from API
 * 2. If API fails, load from local JSON files
 * 3. Cache successful responses
 */

import { get } from './api';
import { API_ENDPOINTS, FEATURES } from '@/constants';
import type { Project, Experience, Skill, SkillCategory } from '@/types';

// Import mock data
import projectsData from '@/data/projects.json';
import experienceData from '@/data/experience.json';
import skillsData from '@/data/skills.json';

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Load data with fallback to mock JSON
 */
async function fetchWithFallback<T>(
  apiEndpoint: string,
  mockData: T,
  cacheKey?: string
): Promise<T> {
  // If mock data mode is enabled, use mock data immediately
  if (FEATURES.USE_MOCK_DATA) {
    console.log(`�� Using mock data for ${apiEndpoint}`);
    return mockData;
  }

  try {
    // Try to fetch from API
    const response = await get<T>(apiEndpoint);
    
    if (response.success && response.data) {
      console.log(`✅ Loaded data from API: ${apiEndpoint}`);
      
      // Cache successful response if cache key provided
      if (cacheKey) {
        localStorage.setItem(cacheKey, JSON.stringify(response.data));
      }
      
      return response.data;
    } else {
      // API responded but with error
      console.warn(`⚠️ API error, using mock data: ${apiEndpoint}`);
      return mockData;
    }
  } catch (error) {
    // Network error or API unavailable
    console.warn(`⚠️ Failed to fetch from API, using mock data: ${apiEndpoint}`, error);
    
    // Try to load from cache if available
    if (cacheKey) {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        console.log(`📦 Using cached data for ${apiEndpoint}`);
        return JSON.parse(cached) as T;
      }
    }
    
    return mockData;
  }
}

/**
 * Group skills by category
 */
function groupSkillsByCategory(skills: Skill[]): SkillCategory[] {
  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return Object.entries(grouped).map(([category, skills]) => ({
    category,
    skills: skills.sort((a, b) => a.display_order - b.display_order),
  }));
}

// ============================================
// PUBLIC API
// ============================================

/**
 * Fetch all projects
 */
export async function getProjects(): Promise<Project[]> {
  const projects = await fetchWithFallback<Project[]>(
    API_ENDPOINTS.PROJECTS,
    projectsData as Project[],
    'portfolio_cached_projects'
  );
  
  // Sort by display order
  return projects.sort((a, b) => a.display_order - b.display_order);
}

/**
 * Fetch single project by ID
 */
export async function getProjectById(id: number): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find(p => p.id === id) || null;
}

/**
 * Fetch featured projects only
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter(p => p.is_featured);
}

/**
 * Fetch all experience entries
 */
export async function getExperience(): Promise<Experience[]> {
  const experience = await fetchWithFallback<Experience[]>(
    API_ENDPOINTS.EXPERIENCE,
    experienceData as Experience[],
    'portfolio_cached_experience'
  );
  
  // Sort by display order (most recent first)
  return experience.sort((a, b) => a.display_order - b.display_order);
}

/**
 * Fetch all skills
 */
export async function getSkills(): Promise<Skill[]> {
  const skills = await fetchWithFallback<Skill[]>(
    API_ENDPOINTS.SKILLS,
    skillsData as Skill[],
    'portfolio_cached_skills'
  );
  
  return skills;
}

/**
 * Fetch skills grouped by category
 */
export async function getSkillsByCategory(): Promise<SkillCategory[]> {
  const skills = await getSkills();
  return groupSkillsByCategory(skills);
}

/**
 * Health check - test if API is available
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await get(API_ENDPOINTS.HEALTH);
    return response.success;
  } catch {
    return false;
  }
}
