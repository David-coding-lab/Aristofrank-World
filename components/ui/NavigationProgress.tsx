'use client'

/**
 * Top-of-page route progress bar: starts on same-origin link clicks and
 * completes when the App Router commits the new route.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

function isSameOriginAnchor(anchor: HTMLAnchorElement): boolean {
  const href = anchor.getAttribute('href') ?? ''
  return (
    !!href &&
    !href.startsWith('http') &&
    !href.startsWith('//') &&
    !href.startsWith('#') &&
    !href.startsWith('javascript:') &&
    !href.startsWith('mailto:') &&
    !href.startsWith('tel:') &&
    anchor.target !== '_blank'
  )
}

type BarState = 'idle' | 'running' | 'completing' | 'done'

export function NavigationProgress() {
  const pathname = usePathname()
  const [width, setWidth] = useState(0)
  const [barState, setBarState] = useState<BarState>('idle')

  const navigatingRef = useRef(false)
  const tickIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const doneTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function clearTick() {
    if (tickIntervalRef.current) {
      clearInterval(tickIntervalRef.current)
      tickIntervalRef.current = null
    }
  }

  function clearDone() {
    if (doneTimeoutRef.current) {
      clearTimeout(doneTimeoutRef.current)
      doneTimeoutRef.current = null
    }
  }

  const startProgress = useCallback(() => {
    clearTick()
    clearDone()
    navigatingRef.current = true
    setBarState('running')
    setWidth(15)

    tickIntervalRef.current = setInterval(() => {
      setWidth((prev) => {
        if (prev >= 90) return prev
        const inc = prev < 50
          ? Math.random() * 10 + 1
          : Math.random() * 5 + 1
        return Math.min(prev + inc, 90)
      })
    }, 750)
  }, [])

  const completeProgress = useCallback(() => {
    clearTick()
    clearDone()
    navigatingRef.current = false
    setBarState('completing')
    setWidth(100)

    doneTimeoutRef.current = setTimeout(() => {
      setBarState('done')
      doneTimeoutRef.current = setTimeout(() => {
        setBarState('idle')
        setWidth(0)
      }, 350)
    }, 350)
  }, [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest('a')
      if (!target || !(target instanceof HTMLAnchorElement)) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      if (!isSameOriginAnchor(target)) return
      startProgress()
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [startProgress])

  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (navigatingRef.current) {
      completeProgress()
    }
  }, [pathname, completeProgress])

  useEffect(() => () => { clearTick(); clearDone() }, [])

  if (barState === 'idle') return null

  return (
    <div
      aria-hidden
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(width)}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        width: `${width}%`,
        background: 'var(--color-accent)',
        zIndex: 9999,
        transition: barState === 'completing'
          ? 'width 0.25s ease-out, opacity 0.3s ease 0.25s'
          : 'width 0.4s ease-out',
        opacity: barState === 'done' ? 0 : 1,
        borderRadius: '0 2px 2px 0',
        boxShadow: '0 0 6px var(--color-accent)',
        pointerEvents: 'none',
      }}
    />
  )
}
