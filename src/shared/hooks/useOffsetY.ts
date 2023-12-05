import { useState } from "react"

export const useOffsetY = () => {
	const [offsetY, setOffsetY] = useState<number>(0);

	return {offsetY, setOffsetY}
}