import {useLocation, Navigate, Outlet} from 'react-router-dom'
import { useAppSelector } from '../../shared/hooks/useRedux';
import { authSelector } from '../../redux/selectors';


export const PrivateRoute = () => {
	
	const location = useLocation();
	const {authorization} = useAppSelector(authSelector);

	if (!authorization) {
		return <Navigate to='/login' state={{from: location}} replace/>
	}

	return (
		<Outlet/>
	)
}