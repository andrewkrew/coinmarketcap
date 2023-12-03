import { useState } from "react";
import { useLocation } from "react-router-dom";

export const useCustomPagination = () => {
	const location = useLocation();
	const COINS_NUMBER = 3000;
	const EXCHANGES_NUMBER = 250;
	const [page, setPage] = useState(+location.search?.split('=')[1] || 1);
	const [itemQty, setItemQty] = useState('25');

	return {
		location,
		COINS_NUMBER,
		EXCHANGES_NUMBER,
		page,
		setPage,
		itemQty,
		setItemQty,
	}
}