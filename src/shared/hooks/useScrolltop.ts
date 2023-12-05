import { useEffect } from "react";

export const  useScrollTop = () => {
	useEffect(() => {
		setTimeout(() => {
			window.scrollTo({
				top: 0,
			});
		}, 10)
	}, [])
}
