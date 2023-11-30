import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { TokensAddTransaction} from '../../../shared/api/types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useAppSelector } from '../../../shared/hooks/useRedux';
import { portfolioDataSelector } from '../../../redux/selectors';
import { getIdList } from '../../../utilits';

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
		
	const {tokens} = useAppSelector(portfolioDataSelector)
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly TokensAddTransaction[]>([]);
  const loading = open && options.length === 0;

	useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
			if (!tokens.length && operation === 1) {
				return;
			}
			fetch('https://api.coingecko.com/api/v3/coins/list?include_platform=false&x_cg_demo_api_key=CG-LxtsanKr45RpMiLLJDJgKJed')
				.then(res => res.json())
				.then(res => {
					if (operation === 1) {
						setOptions(getIdList(tokens, res));
						return;
					}
					if (active) {
						setOptions(res);
					}
				})
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="async__select"
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);				
      }}
			onChange={async (event, newValue) => {
				if (!newValue) return;				
				setToken({
					id: newValue.id,
					name: newValue.name,
					symbol: newValue.symbol,
				})
			}}
      isOptionEqualToValue={(option, value) => option.name === value.name || option.name === value.name}
			getOptionLabel={(option) => `${option.symbol.toUpperCase()} ${option.id}`}
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