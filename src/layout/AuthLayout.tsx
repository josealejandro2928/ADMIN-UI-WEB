import { BackgroundImage, Group, Loader } from '@mantine/core';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import classes from "./AuthLayout.module.scss";
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setIsAuthInProgress, setUserLogin } from '../store/features/userSlice';
import { useSelector } from 'react-redux';

const AuthLayout = () => {
    const { isLoggedIn, isAuthInProgress } = useAppSelector((state) => state.users);
    const navigate = useNavigate();
    const location = useLocation()

    return (
        <div className={classes["container"]}>
            <div className={classes["overlay"]} style={{ zIndex: isAuthInProgress ? 10 : 1 }}>
                <Group position="center">
                    <Loader size="lg" variant="bars" />;
                </Group>
            </div>
            <Outlet />
        </div>
    )

}

export default AuthLayout