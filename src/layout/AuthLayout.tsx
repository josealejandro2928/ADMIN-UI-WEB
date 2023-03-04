import { BackgroundImage } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import classes from "./AuthLayout.module.scss";

const AuthLayout = () => {

    useEffect(() => {
      

    }, [])

    return (
        <div className={classes["container"]}>
            <div className={classes["overlay"]}></div>
            <Outlet />
        </div>
    )

}

export default AuthLayout