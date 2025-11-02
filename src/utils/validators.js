export const validateUsername = (username) => {
  if (!username || username.length < 3) {
    return 'Username must be at least 3 characters'
  }
  if (username.length > 20) {
    return 'Username must be less than 20 characters'
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return 'Username can only contain letters, numbers, and underscores'
  }
  return null
}

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || !emailRegex.test(email)) {
    return 'Please enter a valid email address'
  }
  return null
}

export const validateScore = (score) => {
  if (typeof score !== 'number' || score < 0) {
    return 'Invalid score'
  }
  return null
}