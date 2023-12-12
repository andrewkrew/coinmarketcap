import { useCallback, useEffect, useRef } from 'react'

interface IUseTimeout {
	clearTimeout: () => void
	resetTimeout: () => void
}

export function useTimeout(callback: () => void, delay: number): IUseTimeout {
	const callbackRef = useRef(callback)
	const timeoutId = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		callbackRef.current = callback
	}, [callback])

	const startTimeout = useCallback(() => {
		timeoutId.current = setTimeout(() => callbackRef.current(), delay)
	}, [delay])

	const clearTimeout = useCallback(() => {
		if (timeoutId.current) {
		clearInterval(timeoutId.current)
  }
	}, [])

	const resetTimeout = useCallback(() => {
		clearTimeout()
		startTimeout()
	}, [startTimeout, clearTimeout])

	useEffect(() => {
		startTimeout()
		return clearTimeout
	}, [delay, clearTimeout, startTimeout])

	return {
		clearTimeout,
		resetTimeout
	}
}