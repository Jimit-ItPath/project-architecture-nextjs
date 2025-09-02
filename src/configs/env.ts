/**
 * Environment Configuration
 *
 * This module centralizes all environment variable access and provides
 * type checking and default values for environment variables.
 */

// Environment type (development, production, staging)
export const ENV = process.env.NEXT_PUBLIC_NODE_ENV || 'development';

// Application metadata
export const APP = {};

// API configuration
export const API = {
  URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
};

// Server configuration
export const SERVER = {
  PORT: parseInt(process.env.NEXT_PUBLIC_PORT || '3000', 10),
  URL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
};

// Database configuration
export const DATABASE = {
  URL: process.env.NEXT_PUBLIC_DATABASE_URL || '',
};

// Sentry configuration
export const SENTRY = {
  DSN: process.env.NEXT_PUBLIC_SENTRY_DSN || '',
  ORG: process.env.NEXT_PUBLIC_SENTRY_ORG || '',
  PROJECT: process.env.NEXT_PUBLIC_SENTRY_PROJECT || '',
};

// Feature flags
export const FEATURES = {
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  ENABLE_MONITORING: process.env.NEXT_PUBLIC_ENABLE_MONITORING === 'true',
  ENABLE_DEBUG: process.env.NEXT_PUBLIC_DEBUG === 'true',
  LOG_LEVEL: process.env.NEXT_PUBLIC_LOG_LEVEL || 'info',
};

// Check if we're running in development mode
export const IS_DEV = process.env.NEXT_PUBLIC_NODE_ENV === 'development';

// Check if we're running in production mode
export const IS_PROD = process.env.NEXT_PUBLIC_NODE_ENV === 'production';

// Check if we're running in staging mode
export const IS_STAGING = process.env.NEXT_PUBLIC_NODE_ENV === 'staging';
