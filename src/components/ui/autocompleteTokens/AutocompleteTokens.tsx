import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { TokensAddTransaction, searchCoinsData} from '../../../shared/api/types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useAppSelector } from '../../../shared/hooks/useRedux';
import { portfolioDataSelector } from '../../../redux/selectors';
import { changeAutocompleteDataType, getIdList } from '../../../utilits';
import { Box } from '@mui/material';
import { useDebounce } from '../../../shared/hooks/useDebounce';

export const AutocompleteTokens = (
	{
		setToken,
		operation,
	}
	:{
		setToken: Dispatch<SetStateAction<TokensAddTransaction>>, 
		operation: number,
	}
) => {
		
	const {tokens} = useAppSelector(portfolioDataSelector);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly searchCoinsData[]>([]);
  const loading = open && options.length === 0;

	const [value, setValue] = useState<searchCoinsData | null>(options[0] || null);
  const [inputValue, setInputValue] = useState('');

	useEffect(() => {
		setInputValue('')
		setValue(null)
	}, [operation])

	const fetchData: () => void = () => {
		
		if (!tokens.length && operation === 1) {
			return;
		}

		if (!inputValue && operation === 0) {
			fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false&locale=en&per_page=50&page=1&x_cg_demo_api_key=CG-LxtsanKr45RpMiLLJDJgKJed')
				.then(res => res.json())
				.then(res => {
					setOptions(changeAutocompleteDataType(res));
				})
		} else {
			fetch(`https://api.coingecko.com/api/v3/search?query=${inputValue}&x_cg_demo_api_key=CG-LxtsanKr45RpMiLLJDJgKJed`)
				.then(res => res.json())
				.then(res => {
					if (operation === 1) { //sell
						setOptions(getIdList(tokens, res.coins));
						return;
					}
					if(!res.coins.length) return;
					setOptions(res.coins);				
				})
			}
	}

	useDebounce(fetchData, 1000, [loading, inputValue, value, operation]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
			value={value}
			inputValue={inputValue}
			onInputChange={(_, newInputValue) => {
				setInputValue(newInputValue);
			}}
			id="async__select"
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);		
      }}
			onChange={async (_, newValue: searchCoinsData | null) => {
				if (!newValue) {
					setInputValue('')
					setValue(null)
					return;
				} 		
				setValue(newValue);
				setToken({
					id: newValue.id,
					name: newValue.name,
					symbol: newValue.symbol,
				})
			}}

      isOptionEqualToValue={(option, value) => {	
		if (!value.id) return false		
		return option.id === value.id || option.name === value.name
		}}

			getOptionLabel={(option) => `${option.symbol} ${option.name}`}
			renderOption={(props, option) => (
        <Box
					key={`${option.id}`}
          component="li"
          sx={{ "& > img": { mr: 3, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
						srcSet={option.thumb}
            src={option.thumb}
            alt={option.id}
          />
          {option.symbol} {option.name}
        </Box>
      )}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select token"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
								{!(!tokens.length && operation === 1) 
									? loading ? <CircularProgress color="inherit" size={20} /> : null
									: ''
								}
                {params.InputProps.endAdornment} 
              </>
            ),
          }}
        />
      )}
    />
  );
}