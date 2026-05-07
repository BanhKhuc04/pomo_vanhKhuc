import React, { useEffect, useMemo, useRef, useState } from 'react'
import { usePomo } from '../../context/PomoContext'
import { MODES } from '../../data/constants'

function loadYouTubeApi() {
  if (typeof window === 'undefined') return Promise.reject(new Error('no-window'))
  if (window.YT?.Player) return Promise.resolve(window.YT)

  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-youtube-api="true"]')
    if (!existing) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      script.async = true
      script.dataset.youtubeApi = 'true'
      script.onerror = () => reject(new Error('youtube-api-load-failed'))
      document.head.appendChild(script)
    }

    const previous = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      previous?.()
      resolve(window.YT)
    }

    const timeout = window.setTimeout(() => {
      if (window.YT?.Player) resolve(window.YT)
      else reject(new Error('youtube-api-timeout'))
    }, 10000)

    Promise.resolve().then(() => {
      if (window.YT?.Player) {
        window.clearTimeout(timeout)
        resolve(window.YT)
      }
    })
  })
}

export default function YouTubeMusicBridge() {
  const {
    settings,
    mode,
    isRunning,
    customMusicAction,
    musicResetSignal,
    setCustomMusicRuntime,
  } = usePomo()

  const mountRef = useRef(null)
  const playerRef = useRef(null)
  const previewingRef = useRef(false)
  const interactionTimeoutRef = useRef(null)
  const [apiReady, setApiReady] = useState(false)

  const source = useMemo(() => ({
    type: settings.customMusicType,
    url: settings.customMusicUrl,
    videoId: settings.customVideoId,
    playlistId: settings.customPlaylistId,
  }), [settings.customMusicType, settings.customMusicUrl, settings.customPlaylistId, settings.customVideoId])

  const isValidSource = Boolean(
    settings.customMusicEnabled &&
    source.type &&
    (source.videoId || source.playlistId)
  )

  const updateRuntime = (patch) => {
    setCustomMusicRuntime((prev) => ({ ...prev, ...patch }))
  }

  const syncRuntimeTitle = () => {
    try {
      const title = playerRef.current?.getVideoData?.().title || ''
      if (title) {
        updateRuntime({ title, error: '' })
      } else if (source.type === 'playlist') {
        updateRuntime({ title: 'Custom Playlist', error: '' })
      }
    } catch (error) {}
  }

  const setPlayerVolume = () => {
    try {
      if (!playerRef.current?.setVolume) return
      const volume = Math.round(Math.max(0, Math.min(1, settings.masterVolume)) * 100)
      playerRef.current.setVolume(volume)
    } catch (error) {}
  }

  const cueCurrentSource = () => {
    if (!playerRef.current || !source.type) return
    try {
      if (source.type === 'playlist' && source.playlistId) {
        playerRef.current.cuePlaylist({
          listType: 'playlist',
          list: source.playlistId,
          index: 0,
          startSeconds: 0,
        })
        updateRuntime({ title: 'Custom Playlist', status: 'ready', error: '' })
        return
      }
      if (source.videoId) {
        playerRef.current.cueVideoById({ videoId: source.videoId, startSeconds: 0 })
        updateRuntime({ status: 'ready', error: '' })
      }
    } catch (error) {
      updateRuntime({ status: 'error', error: 'load-failed' })
    }
  }

  const stopCurrentPlayback = () => {
    try {
      playerRef.current?.stopVideo?.()
      updateRuntime({ status: 'stopped', needsInteraction: false })
    } catch (error) {}
  }

  const pauseCurrentPlayback = () => {
    try {
      playerRef.current?.pauseVideo?.()
      updateRuntime({ status: 'paused' })
    } catch (error) {}
  }

  const playCurrentSource = () => {
    if (!playerRef.current || !isValidSource) return
    try {
      setPlayerVolume()
      if (source.type === 'playlist' && source.playlistId) {
        playerRef.current.loadPlaylist({
          listType: 'playlist',
          list: source.playlistId,
          index: 0,
          startSeconds: 0,
        })
      } else if (source.videoId) {
        playerRef.current.loadVideoById({ videoId: source.videoId, startSeconds: 0 })
      }
      updateRuntime({ status: 'loading', needsInteraction: false, error: '' })
      window.clearTimeout(interactionTimeoutRef.current)
      interactionTimeoutRef.current = window.setTimeout(() => {
        try {
          const state = playerRef.current?.getPlayerState?.()
          if (state !== window.YT?.PlayerState?.PLAYING) {
            updateRuntime({ needsInteraction: true, status: 'paused' })
          }
        } catch (error) {}
      }, 1200)
    } catch (error) {
      updateRuntime({ status: 'error', error: 'play-failed' })
    }
  }

  useEffect(() => {
    let mounted = true
    loadYouTubeApi()
      .then(() => {
        if (mounted) setApiReady(true)
      })
      .catch(() => {
        if (mounted) updateRuntime({ status: 'error', error: 'api-failed' })
      })
    return () => {
      mounted = false
      window.clearTimeout(interactionTimeoutRef.current)
      try {
        playerRef.current?.destroy?.()
      } catch (error) {}
      playerRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!apiReady || !mountRef.current || playerRef.current) return
    if (!source.videoId && !source.playlistId) return

    playerRef.current = new window.YT.Player(mountRef.current, {
      width: '0',
      height: '0',
      videoId: source.videoId || undefined,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
        iv_load_policy: 3,
        origin: window.location.origin,
        playlist: source.type === 'video' ? source.videoId || undefined : undefined,
        loop: source.type === 'video' ? 1 : 0,
        listType: source.type === 'playlist' ? 'playlist' : undefined,
        list: source.type === 'playlist' ? source.playlistId || undefined : undefined,
      },
      events: {
        onReady: () => {
          setPlayerVolume()
          cueCurrentSource()
          syncRuntimeTitle()
        },
        onStateChange: (event) => {
          const YT = window.YT
          if (!YT?.PlayerState) return

          if (event.data === YT.PlayerState.PLAYING) {
            updateRuntime({ status: 'playing', needsInteraction: false, error: '' })
            syncRuntimeTitle()
          } else if (event.data === YT.PlayerState.PAUSED) {
            updateRuntime({ status: 'paused' })
          } else if (event.data === YT.PlayerState.CUED) {
            updateRuntime({ status: 'ready', error: '' })
            syncRuntimeTitle()
          } else if (event.data === YT.PlayerState.ENDED) {
            if (source.type === 'playlist') {
              try {
                playerRef.current?.playVideoAt?.(0)
                return
              } catch (error) {}
            }
            if (source.type === 'video') {
              try {
                playerRef.current?.seekTo?.(0, true)
                playerRef.current?.playVideo?.()
                return
              } catch (error) {}
            }
            updateRuntime({ status: 'stopped' })
          }
        },
        onError: () => {
          updateRuntime({ status: 'error', error: 'invalid-source' })
        },
      },
    })
  }, [apiReady, source.playlistId, source.type, source.videoId])

  useEffect(() => {
    if (!playerRef.current) return
    setPlayerVolume()
  }, [settings.masterVolume])

  useEffect(() => {
    if (!playerRef.current) return
    cueCurrentSource()
  }, [source.type, source.videoId, source.playlistId, source.url])

  useEffect(() => {
    if (!playerRef.current) return
    if (!isValidSource || !settings.soundEnabled || settings.muted || mode !== MODES.FOCUS) {
      if (!previewingRef.current) {
        pauseCurrentPlayback()
      }
      return
    }
    if (isRunning) {
      previewingRef.current = false
      playCurrentSource()
    } else if (!previewingRef.current) {
      pauseCurrentPlayback()
    }
  }, [isRunning, mode, settings.soundEnabled, settings.muted, isValidSource])

  useEffect(() => {
    if (!playerRef.current || !customMusicAction) return
    if (customMusicAction.type === 'preview') {
      previewingRef.current = true
      playCurrentSource()
      return
    }
    if (customMusicAction.type === 'stop') {
      previewingRef.current = false
      stopCurrentPlayback()
    }
  }, [customMusicAction])

  useEffect(() => {
    if (!playerRef.current) return
    previewingRef.current = false
    stopCurrentPlayback()
  }, [musicResetSignal])

  useEffect(() => {
    if (!settings.customMusicEnabled || !source.type) {
      updateRuntime({ status: 'idle', title: '', error: '', needsInteraction: false })
      previewingRef.current = false
      stopCurrentPlayback()
    }
  }, [settings.customMusicEnabled, source.type])

  return <div className="hidden" aria-hidden="true"><div ref={mountRef} /></div>
}
