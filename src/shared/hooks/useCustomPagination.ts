import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "./useRedux";
import { paginationSelector } from "../../redux/selectors";

export const useCustomPagination = () => {
	const location = useLocation();
	const COINS_NUMBER = 3000;
	const EXCHANGES_NUMBER = 250;
	const [page, setPage] = useState(+location.search?.split('=')[1] || 1);
	const {coinsQnty, exchangesQnty} = useAppSelector(paginationSelector);

	return {
		location,
		COINS_NUMBER,
		EXCHANGES_NUMBER,
		page,
		setPage,
		coinsQnty,
		exchangesQnty,
	}
}