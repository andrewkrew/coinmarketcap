import { RootState } from "./store";

export const themeSelector = (state: RootState) => state.theme;
// export const authSelector = (state: RootState) => state.auth;
export const coinsSelector = (state: RootState) => state.coins;
export const portfolioCurrancySelector = (state: RootState) => state.portfolioCurrency;
export const portfolioDataSelector = (state: RootState) => state.portfolioData;