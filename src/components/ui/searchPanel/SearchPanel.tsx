import { useState } from "react";
import { AutocompleteTokens } from "../autocompleteTokens"
import { TokensAddTransaction } from "../../../shared/api/types";

export const SearchPanel = () => {

	const [token, setToken] = useState<TokensAddTransaction>({} as TokensAddTransaction);
	const [operation, setOperation] = useState<number>(2);

	return (
		<AutocompleteTokens
			setToken={setToken}
			operation={operation}
		/>
	)
}