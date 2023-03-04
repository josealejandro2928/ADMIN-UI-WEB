import { AppShell, Navbar, Header, Footer } from "@mantine/core";
import React from "react";
import { SideBar } from '../components/Sidebar';
import { HeaderApp } from "../components/Header";
import { Outlet } from "react-router-dom";


const AdminLayout = () => {
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
            <Outlet />
        </AppShell>

    )
}

export default AdminLayout;