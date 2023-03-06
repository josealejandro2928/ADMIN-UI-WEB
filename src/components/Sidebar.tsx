import { useState } from 'react';
import { Navbar, Text, createStyles, getStylesRef, rem, Button, Avatar, Group, Divider } from '@mantine/core';
import {
    IconSettings,
    IconLogout,
    IconFolders,
    IconSwitchHorizontal,
    IconFileCode,
    IconPlayerPlay,
} from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUserLogout } from '../store/features/userSlice';
import { NavLink } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    navbar: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    title: {
        textTransform: 'uppercase',
        letterSpacing: rem(-0.25),
    },

    link: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,

            [`& .${getStylesRef('icon')}`]: {
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            },
        },
    },

    linkIcon: {
        ref: getStylesRef('icon'),
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
        marginRight: theme.spacing.sm,
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
            [`& .${getStylesRef('icon')}`]: {
                color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
            },
        },
    },

    footer: {
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
        paddingTop: theme.spacing.md,
    },
}));

const tabs = [
    { link: 'repository', label: 'Repository', icon: IconFolders },
    { link: 'models', label: 'Models', icon: IconFileCode },
    { link: 'analysis', label: 'Conversion and Analysis ', icon: IconPlayerPlay },
    { link: 'config', label: 'Config Settings', icon: IconSettings }]

export function SideBar() {
    const { classes, cx } = useStyles();
    const dispatch = useAppDispatch()
    const { isLoggedIn, user } = useAppSelector((state) => state.users);

    const links = tabs.map((item) => (
        <NavLink
            className={(navData) => cx(classes.link, { [classes.linkActive]: navData.isActive })}
            to={item.link}
            key={item.label}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </NavLink>
    ));

    function onLogout() {
        dispatch(setUserLogout());
    }

    return (
        <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
            <Navbar.Section>
                <Group>
                    <Avatar color="cyan" radius="xl">{user?.name.charAt(0)}{user?.lastName.charAt(0)}</Avatar>
                    <Text weight={500} size="sm" color="dimmed">
                        {user?.email}
                    </Text>
                </Group>

            </Navbar.Section>
            <Divider my="sm" />

            <Navbar.Section grow mt="xs">
                {links}
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <p className={classes.link}>
                    <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
                    <span>Change account</span>
                </p>

                <Button size="md" fullWidth variant="white" style={{ cursor: "pointer" }} className={classes.link} onClick={onLogout}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </Button>
            </Navbar.Section>
        </Navbar>
    );
}
