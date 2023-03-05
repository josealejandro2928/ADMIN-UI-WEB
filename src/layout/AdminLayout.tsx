import { AppShell, Navbar, Header, Footer } from "@mantine/core";
import React from "react";
import { SideBar } from '../components/Sidebar';
import { HeaderApp } from "../components/Header";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from 'react';
import useAuthMidd from '../hooks/useAuthMidd';
import { getConfig } from "../functions/api.server";
import { handleAndVisualizeError } from '../common/index';
import { Config } from "../classes/config.classes";
import { setConfig } from "../store/features/configSlice";


const AdminLayout = () => {
    const { isLoggedIn, isAuthInProgress } = useAppSelector((state) => state.users);
    const { newFunction: getSecureConfig } = useAuthMidd<{ config: Config }>(getConfig)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isLoggedIn) {
            updateConfig();
        } else {
            dispatch(setConfig({ config: null }));
        }
    }, [isLoggedIn]);

    async function updateConfig() {
        try {
            let data: { config: Config } = await getSecureConfig();
            dispatch(setConfig({ config: data.config }));
        } catch (e) {
            handleAndVisualizeError("Error getting config", e);
        }
    }


    if (isAuthInProgress) return <p>loading...</p>
    if (!isLoggedIn) {
        return <Navigate to="/auth" replace />;
    }

    return (
        <AppShell
            padding="md"
            navbar={<SideBar></SideBar>}
            header={<HeaderApp links={[{ label: "Example", "link": "#" }]}></HeaderApp>}
            footer={<Footer height={54}>{/* Header content */}</Footer>}
            styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
        >
            <div style={{ paddingRight: '1rem', height: "100%" }}>
                <Outlet />
            </div>
        </AppShell>

    )
}

export default AdminLayout;