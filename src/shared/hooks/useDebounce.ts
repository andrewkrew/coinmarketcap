import { useEffect } from 'react';
import { useTimeout } from "./useTimeout";

export function useDebounce<T>(
	callback: () => void,
	delay: number,
	dependencies: T[]
):void {

	const { resetTimeout, clearTimeout } = useTimeout(callback, delay)

	useEffect(resetTimeout, [...dependencies, resetTimeout])

	useEffect(clearTimeout, [])
}