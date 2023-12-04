import { useEffect } from 'react';
import { useTimeout } from "./useTimeout";

export function useDebounce<T>(
	callback: Function,
	delay: number,
	dependencies: T[]
):void {

	const { resetTimeout, clearTimeout } = useTimeout(callback, delay)

	useEffect(resetTimeout, [...dependencies, resetTimeout])

	useEffect(clearTimeout, [])
}