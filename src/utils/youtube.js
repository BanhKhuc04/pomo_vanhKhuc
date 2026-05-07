function safeUrl(raw) {
  try {
    return new URL(raw)
  } catch (error) {
    return null
  }
}

export function parseYouTubeMusicUrl(rawUrl) {
  const trimmed = typeof rawUrl === 'string' ? rawUrl.trim() : ''
  if (!trimmed) {
    return {
      isValid: false,
      error: 'empty',
      type: '',
      canonicalUrl: '',
      videoId: '',
      playlistId: '',
      label: '',
    }
  }

  const url = safeUrl(trimmed)
  if (!url) {
    return {
      isValid: false,
      error: 'invalid',
      type: '',
      canonicalUrl: trimmed,
      videoId: '',
      playlistId: '',
      label: '',
    }
  }

  const hostname = url.hostname.replace(/^www\./, '')
  const isYouTube =
    hostname === 'youtube.com' ||
    hostname === 'm.youtube.com' ||
    hostname === 'youtu.be'

  if (!isYouTube) {
    return {
      isValid: false,
      error: 'invalid',
      type: '',
      canonicalUrl: trimmed,
      videoId: '',
      playlistId: '',
      label: '',
    }
  }

  const playlistId = url.searchParams.get('list') || ''
  let videoId = ''

  if (hostname === 'youtu.be') {
    videoId = url.pathname.replace(/\//g, '').trim()
  } else if (url.pathname === '/watch') {
    videoId = url.searchParams.get('v') || ''
  } else if (url.pathname.startsWith('/shorts/')) {
    videoId = url.pathname.split('/')[2] || ''
  } else if (url.pathname.startsWith('/embed/')) {
    videoId = url.pathname.split('/')[2] || ''
  }

  if (playlistId) {
    return {
      isValid: true,
      error: '',
      type: 'playlist',
      canonicalUrl: `https://www.youtube.com/playlist?list=${playlistId}`,
      videoId,
      playlistId,
      label: 'Custom Playlist',
    }
  }

  if (videoId) {
    return {
      isValid: true,
      error: '',
      type: 'video',
      canonicalUrl: `https://www.youtube.com/watch?v=${videoId}`,
      videoId,
      playlistId: '',
      label: 'YouTube Video',
    }
  }

  return {
    isValid: false,
    error: 'invalid',
    type: '',
    canonicalUrl: trimmed,
    videoId: '',
    playlistId: '',
    label: '',
  }
}
