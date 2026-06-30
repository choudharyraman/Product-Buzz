/**
 * Utility functions for Product Buzz
 */

/**
 * Convert a string to a URL-safe slug
 */
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Format a date as relative time ("2h ago", "Yesterday", "Jun 30")
 */
export function formatRelativeDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

/**
 * Truncate text to a max length with ellipsis
 */
export function truncate(text, maxLength = 120) {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
}

/**
 * Generate a deterministic "hash" from a date string for seeding
 */
export function dateHash(dateString) {
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Pick N items from an array deterministically using a seed
 */
export function seededPick(array, count, seed) {
  const shuffled = [...array];
  let s = seed;
  for (let i = shuffled.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

/**
 * Get today's date string as YYYY-MM-DD
 */
export function getTodayString() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Get a color for a product category (deterministic by category name)
 */
const CATEGORY_COLORS = {
  'B2B SaaS': '#6366F1',
  'Consumer App': '#EC4899',
  'Platform': '#8B5CF6',
  'Fintech': '#10B981',
  'E-Commerce': '#F59E0B',
  'HealthTech': '#EF4444',
  'EdTech': '#3B82F6',
  'Marketplace': '#F97316',
  'Developer Tools': '#14B8A6',
  'Productivity': '#A855F7',
  'default': '#6B7280',
};

export function getCategoryColor(category) {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS.default;
}

/**
 * Get initials from a product name (for logo placeholder)
 */
export function getInitials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

/**
 * Get a background color for initials avatar (deterministic by name)
 */
const AVATAR_COLORS = [
  '#7C3AED', '#6366F1', '#EC4899', '#F59E0B',
  '#10B981', '#3B82F6', '#EF4444', '#8B5CF6',
  '#F97316', '#14B8A6', '#A855F7', '#06B6D4',
];

export function getAvatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

/**
 * Capitalize first letter
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Check if a date is today
 */
export function isToday(dateString) {
  return dateString === getTodayString();
}
