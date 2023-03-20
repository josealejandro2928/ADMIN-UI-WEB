import { AppShell, Navbar, Header, Footer, Group, Loader } from "@mantine/core";
import React from "react";
import { SideBar } from '../components/Sidebar';
import { HeaderApp } from "../components/Header";
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect, useState } from 'react';
import useAuthMidd from '../hooks/useAuthMidd';
import { getConfig } from "../functions/api.server";
import { handleAndVisualizeError } from '../common/index';
import { Config } from "../classes/config.classes";
import { setConfig } from "../store/features/configSlice";


const AdminLayout = () => {
    const { isLoggedIn, isAuthInProgress } = useAppSelector((state) => state.users);
    const { newFunction: getSecureConfig } = useAuthMidd<{ config: Config }>(getConfig)
    const dispatch = useAppDispatch()
    const [openedSidebar, setOpenedSidebar] = useState(false);
    const location = useLocation()

    useEffect(() => {
        if (isLoggedIn) {
            updateConfig();
        } else {
            dispatch(setConfig({ config: null }));
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (openedSidebar) setOpenedSidebar(false);
    }, [location]);


    async function updateConfig() {
        try {
            let data: { config: Config } = await getSecureConfig();
            dispatch(setConfig({ config: data.config }));
        } catch (e) {
            handleAndVisualizeError("Error getting config", e);
        }
    }


    if (isAuthInProgress) {
        return (
            (<Group h={"100vh"} position="center">
                <Loader size="lg" variant="bars" />
            </Group>)
        )
    }

    if (!isLoggedIn) {
        return <Navigate to="/auth" replace />;
    }

    return (
        <AppShell
            padding="md"
            navbarOffsetBreakpoint="sm"
            navbar={<SideBar opened={openedSidebar}  ></SideBar>}
            header={<HeaderApp openSidebar={openedSidebar} onToggledSidebar={setOpenedSidebar}></HeaderApp>}
        >
            <div onClick={() => setOpenedSidebar(false)} style={{ paddingRight: '1rem', height: "100%" }}>
                <Outlet />
            </div>
        </AppShell>

    )
}

export default AdminLayout;