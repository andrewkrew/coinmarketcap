import { Box } from "@mui/system";
import { searchCoinsData, searchExchangessData } from "../../../shared/api/types";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { changeAutocompleteDataType, changeAutocompleteExcgDataType } from "../../../utilits";
import { useDebounce } from "../../../shared/hooks/useDebounce";
import { useNavigate } from "react-router-dom";

export const AutocompleteSearch = ({type} : {type: 'currencies' | 'exchanges'}) => {
    
    const [options, setOptions] = useState<readonly searchCoinsData[] | searchExchangessData[]>([]);
    const [value, setValue] = useState<searchCoinsData | searchExchangessData | null>(options[0] || null);
    const [inputValue, setInputValue] = useState('');
    const [open, setOpen] = useState(false);
    const loading = open && options.length === 0;
    const navigate = useNavigate();
	const navigateToCoin = (itemId: string) => {
        navigate(`/${type}/${itemId}`);
	}

    const fetchData: () => void = () => {
        if (type === 'currencies') {
            if (!inputValue) {
			fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false&locale=en&per_page=50&page=1&x_cg_demo_api_key=CG-LxtsanKr45RpMiLLJDJgKJed')
				.then(res => res.json())
				.then(res => {
					setOptions(changeAutocompleteDataType(res));
				})
            } else {
                fetch(`https://api.coingecko.com/api/v3/search?query=${inputValue}&x_cg_demo_api_key=CG-LxtsanKr45RpMiLLJDJgKJed`)
                    .then(res => res.json())
                    .then(res => {
                        if(!res.coins.length) return;
                        setOptions(res.coins);
                    })
                }
        } else {
            if (!inputValue) {
                fetch('https://api.coingecko.com/api/v3/exchanges?per_page=50&page=1&x_cg_demo_api_key=CG-LxtsanKr45RpMiLLJDJgKJed')
                    .then(res => res.json())
                    .then(res => {
                        setOptions(changeAutocompleteExcgDataType(res));
                    })
            } else {
                fetch(`https://api.coingecko.com/api/v3/search?query=${inputValue}&x_cg_demo_api_key=CG-LxtsanKr45RpMiLLJDJgKJed`)
                    .then(res => res.json())
                    .then(res => {
                        if(!res.exchanges.length) return;
                        setOptions(res.exchanges);
                    })
            }
        }
		
	}
    
	useDebounce(fetchData, 1000, [loading, inputValue, value]);

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
                onChange={async (_, newValue: searchCoinsData | searchExchangessData | null) => {
                    if (!newValue) {
                        setInputValue('')
                        setValue(null)
                        return;
                    } 		
                    setValue(newValue);
                    navigateToCoin(newValue.id)

                }}
    
          isOptionEqualToValue={(option, value) => {	
            if (!value.id) return false		
            return option.id === value.id || option.name === value.name
          }}
     
                getOptionLabel={(option) => ('symbol' in option) ? `${option?.symbol} ${option.name}` : `${option.name}`}
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
              {('symbol' in option) ? `${option?.symbol} ${option.name}` : `${option.name}`}
              {/* {option?.symbol} {option.name} */}
            </Box>
          )}
          options={options}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment} 
                  </>
                ),
              }}
            />
          )}
        />
      );
}