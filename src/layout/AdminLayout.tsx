import { AppShell, Navbar, Header, Footer } from "@mantine/core";
import React from "react";
import { SideBar } from '../components/Sidebar';
import { HeaderApp } from "../components/Header";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";


const AdminLayout = () => {
    const { isLoggedIn, isAuthInProgress } = useAppSelector((state) => state.users);

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
            <div style={{ paddingRight: '1rem', height:"100%" }}>
                <Outlet />
            </div>
        </AppShell>

    )
}

export default AdminLayout;