import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';

export const useAppDispatch = useDispatch<
	ThunkDispatch<RootState, void, AnyAction>
>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;