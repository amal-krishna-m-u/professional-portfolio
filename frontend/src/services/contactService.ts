/**
 * Contact Service
 * 
 * Handles contact form submission
 */

import { post } from './api';
import { API_ENDPOINTS } from '@/constants';
import type { ContactFormData, ApiResponse } from '@/types';

/**
 * Submit contact form
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<ApiResponse<{ message: string }>> {
  try {
    const response = await post<{ message: string }>(
      API_ENDPOINTS.CONTACT,
      data
    );
    
    if (response.success) {
      console.log('✅ Contact form submitted successfully');
    } else {
      console.error('❌ Contact form submission failed:', response.error);
    }
    
    return response;
  } catch (error) {
    console.error('❌ Contact form error:', error);
    return {
      success: false,
      error: 'Failed to send message. Please try again later.',
    };
  }
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
