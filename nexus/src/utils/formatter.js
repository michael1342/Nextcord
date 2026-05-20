// import { useAuth } from "../hooks/useAuthGuard"

// const {user} = useAuth()


/**
 * Format large numbers: 1400 -> 1.4k, 2,1000,00 -> 2.1M
*/

export function formatCount(num) {
  //if (num >= 1_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${(num / 1_000)}K`
  return String(num)
}

/** 
  * Relative time: '5 mins ago', '2 hrs ago', '3 days ago'
*/

export function timeAgo(date) {
  const diff = (Date.now() - new Date(date).getTime()) / 1000
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)}days ago`

  return new Date(date).toLocaleDateString('en-US', {month: 'short', day: '2-digit'})
}

/**
 * generate user's Display new

*/

export function displayName(user) {
  if(!user) return 'Unknown'
  if (user.firstName && user.lastName) return `${user.firstName} ${user.lastName}`
  return user.name || user.username || 'User'
}

/**
 * generate Avatar initial
*/

export function initials(name = '') {
  return name.split(' ').map(w => w[0]).slice(0,2).join('').toUpperCase()
}

/* 
* Truncate long text
*/

export function clamp(text, max = 120) {
  if (text.length > max) return text.slice(0, max) + '...'
}

