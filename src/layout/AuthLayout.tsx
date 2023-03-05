import { Group, Loader } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import classes from "./AuthLayout.module.scss";
import { useAppSelector } from '../store/hooks';

const AuthLayout = () => {
    const { isAuthInProgress } = useAppSelector((state) => state.users);

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