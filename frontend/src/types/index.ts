/**
 * Type definitions for the Portfolio application
 * These interfaces define the structure of our data
 */

// ============================================
// PROJECT TYPES
// ============================================

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tech_stack: string[];
  impact?: string;
  github_url?: string;
  live_url?: string;
  image_url?: string;
  icon?: string; // For the project icon (emoji or text)
  is_featured: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

// ============================================
// EXPERIENCE TYPES
// ============================================

export interface Experience {
  id: number;
  company: string;
  position: string;
  location: string;
  start_date: string; // ISO date string: "2023-06-01"
  end_date?: string; // null if current position
  is_current: boolean;
  description: string;
  achievements?: string[];
  tech_stack?: string[];
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

// ============================================
// SKILLS TYPES
// ============================================

export interface Skill {
  id: number;
  name: string;
  category: string; // "Languages", "Frontend", "Backend", etc.
  proficiency_level?: string; // "Expert", "Advanced", "Intermediate"
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

// Grouped skills for display
export interface SkillCategory {
  category: string;
  skills: Skill[];
}

// ============================================
// CONTACT FORM TYPES
// ============================================

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactSubmission extends ContactFormData {
  id?: number;
  ip_address?: string;
  user_agent?: string;
  is_read?: boolean;
  submitted_at?: string;
}

// ============================================
// ANALYTICS TYPES
// ============================================

export type AnalyticsEventType = 'page_view' | 'resume_download' | 'project_click' | 'contact_submit';

// Generic event data - can contain any key-value pairs
export type EventData = Record<string, string | number | boolean | null | undefined>;

export interface AnalyticsEvent {
  event_type: AnalyticsEventType;
  event_data?: EventData;
  ip_address?: string;
  user_agent?: string;
  referrer?: string;
  created_at?: string;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  message: string;
  status?: number;
  details?: Record<string, unknown>; // Changed from 'any' to 'unknown'
}

// ============================================
// HERO TYPES
// ============================================

export interface HeroLine {
  id: number;
  type: 'command' | 'response';
  content: string;
  delay: string;
  show_cursor?: boolean;
  display_order: number;
}

export interface HeroButton {
  text: string;
  href: string;
  primary: boolean;
}

export interface HeroContent {
  lines: HeroLine[];
  cta_buttons: HeroButton[];
  scroll_text: string;
}

// ============================================
// ABOUT ME TYPES
// ============================================

export interface AboutMe {
  id: number;
  headline: string;
  subheadline: string;
  content: string;
  updated_at?: string;
}

// ============================================
// ADMIN TYPES
// ============================================

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
  last_login?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
}
