/**
 * Quick test of services
 * Run this in browser console or delete after testing
 */

import { getProjects, getExperience, getSkillsByCategory } from './contentService';

export async function testServices() {
  console.log('🧪 Testing services...');
  
  const projects = await getProjects();
  console.log('Projects:', projects);
  
  const experience = await getExperience();
  console.log('Experience:', experience);
  
  const skills = await getSkillsByCategory();
  console.log('Skills by category:', skills);
  
  console.log('✅ All services working!');
}
