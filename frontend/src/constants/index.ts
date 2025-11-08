/**
 * Application Constants
 * Centralized configuration for the entire application
 */

// ============================================
// API CONFIGURATION
// ============================================

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Public endpoints
  HEALTH: '/api/health',
  PROJECTS: '/api/content/projects',
  EXPERIENCE: '/api/content/experience',
  SKILLS: '/api/content/skills',
  ABOUT: '/api/content/about',
  CONTACT: '/api/contact',
  ANALYTICS: '/api/analytics/track',
  RESUME_DOWNLOAD: '/api/resume/download',
  
  // Admin endpoints (will be used later)
  ADMIN_LOGIN: '/api/admin/login',
  ADMIN_REFRESH: '/api/admin/refresh',
  ADMIN_PROJECTS: '/api/admin/projects',
  ADMIN_EXPERIENCE: '/api/admin/experience',
  ADMIN_SKILLS: '/api/admin/skills',
} as const;

// ============================================
// FEATURE FLAGS
// ============================================

export const FEATURES = {
  USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA === 'true',
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT || 'development',
} as const;

// ============================================
// UI CONSTANTS
// ============================================

export const UI = {
  // Animation durations (in milliseconds)
  ANIMATION: {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
    TERMINAL_TYPING: 150, // Changed to 150ms per character (much slower)
    TERMINAL_LINE_DELAY: 10000, // 1 second pause between lines
  },
  
  // Breakpoints (matches Tailwind defaults)
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
  },
  
  // Z-index layers
  Z_INDEX: {
    DROPDOWN: 1000,
    STICKY: 1020,
    FIXED: 1030,
    MODAL_BACKDROP: 1040,
    MODAL: 1050,
    POPOVER: 1060,
    TOOLTIP: 1070,
  },
} as const;

// ============================================
// SOCIAL LINKS
// ============================================

export const SOCIAL_LINKS = {
  LINKEDIN: 'https://linkedin.com/in/your-profile', // TODO: Update with your actual links
  GITHUB: 'https://github.com/your-username',
  EMAIL: 'mailto:your.email@example.com',
  TWITTER: 'https://twitter.com/your-handle', // Optional
} as const;

// ============================================
// CONTACT INFORMATION
// ============================================

export const CONTACT_INFO = {
  EMAIL: 'your.email@example.com', // TODO: Update
  LOCATION: 'Kochi, Kerala, India',
  AVAILABILITY: 'Open to opportunities',
} as const;

// ============================================
// HERO SECTION CONTENT
// ============================================

export const HERO_CONTENT = {
  COMMAND_1: 'whoami',
  RESPONSE_1: 'Versatile Full-Stack Engineer',
  COMMAND_2: 'cat mission.txt',
  RESPONSE_2_LINE_1: 'Building enterprise solutions at Big 4 | Engineered ETL pipelines',
  RESPONSE_2_LINE_2: 'processing 300K+ documents into AI-ready knowledge artifacts',
  CTA_BUTTONS: [
    { text: 'view_projects()', href: '#projects', primary: true },
    { text: 'download_resume()', href: '/api/resume/download', primary: false },
    { text: 'contact_me()', href: '#contact', primary: false },
  ],
} as const;

// ============================================
// SECTION TITLES
// ============================================

export const SECTION_TITLES = {
  PROJECTS: 'Projects',
  EXPERIENCE: 'Experience',
  SKILLS: 'Skills',
  CONTACT: 'Contact',
  ABOUT: 'About Me',
} as const;

// ============================================
// FORM VALIDATION
// ============================================

export const VALIDATION = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
    PATTERN: /^[a-zA-Z\s]+$/,
    ERROR_MESSAGES: {
      REQUIRED: 'Name is required',
      MIN_LENGTH: 'Name must be at least 2 characters',
      MAX_LENGTH: 'Name must not exceed 100 characters',
      PATTERN: 'Name can only contain letters and spaces',
    },
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    ERROR_MESSAGES: {
      REQUIRED: 'Email is required',
      INVALID: 'Please enter a valid email address',
    },
  },
  MESSAGE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 1000,
    ERROR_MESSAGES: {
      REQUIRED: 'Message is required',
      MIN_LENGTH: 'Message must be at least 10 characters',
      MAX_LENGTH: 'Message must not exceed 1000 characters',
    },
  },
} as const;

// ============================================
// ERROR MESSAGES
// ============================================

export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  API_ERROR: 'Unable to fetch data. Using cached content.',
  NOT_FOUND: 'The requested resource was not found.',
  UNAUTHORIZED: 'You are not authorized to access this resource.',
  SERVER_ERROR: 'Server error. Please try again later.',
} as const;

// ============================================
// SUCCESS MESSAGES
// ============================================

export const SUCCESS_MESSAGES = {
  CONTACT_FORM: 'Thank you! Your message has been sent successfully.',
  RESUME_DOWNLOAD: 'Resume downloaded successfully.',
} as const;

// ============================================
// LOCAL STORAGE KEYS
// ============================================

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'portfolio_auth_token',
  REFRESH_TOKEN: 'portfolio_refresh_token',
  USER_PREFERENCES: 'portfolio_user_prefs',
  CACHED_PROJECTS: 'portfolio_cached_projects',
  CACHED_EXPERIENCE: 'portfolio_cached_experience',
  CACHED_SKILLS: 'portfolio_cached_skills',
} as const;

// ============================================
// ROUTES
// ============================================

export const ROUTES = {
  HOME: '/',
  TEST: '/test',
  ADMIN: '/admin',
  ADMIN_LOGIN: '/admin/login',
  NOT_FOUND: '*',
} as const;
