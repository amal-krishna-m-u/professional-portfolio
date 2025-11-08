/**
 * Analytics Service
 * 
 * Tracks user interactions and events
 */

import { post } from './api';
import { API_ENDPOINTS, FEATURES } from '@/constants';
import type { AnalyticsEvent, AnalyticsEventType, EventData } from '@/types';

/**
 * Track an analytics event
 */
export async function trackEvent(
  eventType: AnalyticsEventType,
  eventData?: EventData
): Promise<void> {
  // Skip if analytics disabled
  if (!FEATURES.ENABLE_ANALYTICS) {
    console.log('📊 Analytics disabled, skipping event:', eventType);
    return;
  }

  const event: AnalyticsEvent = {
    event_type: eventType,
    event_data: eventData,
    referrer: document.referrer,
    created_at: new Date().toISOString(),
  };

  try {
    await post(API_ENDPOINTS.ANALYTICS, event);
    console.log('📊 Analytics event tracked:', eventType);
  } catch (error) {
    // Fail silently - don't disrupt user experience
    console.warn('⚠️ Failed to track analytics event:', error);
  }
}

/**
 * Track page view
 */
export function trackPageView(pageName: string): void {
  trackEvent('page_view', { page: pageName });
}

/**
 * Track resume download
 */
export function trackResumeDownload(): void {
  trackEvent('resume_download', { timestamp: Date.now() });
}

/**
 * Track project click
 */
export function trackProjectClick(projectId: number, projectTitle: string): void {
  trackEvent('project_click', { 
    project_id: projectId, 
    project_title: projectTitle 
  });
}

/**
 * Track contact form submission
 */
export function trackContactSubmit(): void {
  trackEvent('contact_submit', { timestamp: Date.now() });
}
