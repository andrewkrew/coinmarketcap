import { useEffect, Dispatch, SetStateAction } from "react";

export const useListenerY = (setOffsetY: Dispatch<SetStateAction<number>>) => {
	
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
    return () => {
			window.removeEventListener('scroll', handleScroll);
    };
  });
	
	const handleScroll = () => {
		const position = window.scrollY;
		setOffsetY(() => position);
	};
}