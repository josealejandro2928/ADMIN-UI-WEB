import { Navbar, Text, createStyles, getStylesRef, rem, Button, Avatar, Group, Divider, Modal } from '@mantine/core';
import {
    IconSettings,
    IconLogout,
    IconFolders,
    IconSwitchHorizontal,
    IconFileCode,
    IconPlayerPlay,
    IconReportAnalytics
} from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUserLogout } from '../store/features/userSlice';
import { NavLink } from 'react-router-dom';
import IconJupyter from "../assets/images/icons-jupyter.png"
import SelectUserModal from './modals/SelectUserModal';
import { useDisclosure } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
    navbar: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        width: 300,
        [`@media (max-width: ${theme.breakpoints.sm})`]: {
            width: "350px",
            maxWidth:"90%",
            boxShadow: `2px 0px 9px rgba(0,0,0,0.2)`
        }
    },

    title: {
        textTransform: 'uppercase',
        letterSpacing: rem(-0.25),
    },

    link: {
        ...theme.fn.focusStyles(),
        cursor: "pointer",
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
    { link: 'results', label: 'Results and reports', icon: IconReportAnalytics },
    { link: 'jupyter', label: 'Launch Jupyter', icon: IconJupyter },
    { link: 'config', label: 'Config Settings', icon: IconSettings }]

export function SideBar({ opened }: { opened: boolean }) {
    const { classes, cx } = useStyles();
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state) => state.users);

    const links = tabs.map((item) => {
        if (typeof item.icon == "string") {
            return (<NavLink
                className={(navData) => cx(classes.link, { [classes.linkActive]: navData.isActive })}
                to={item.link}
                key={item.label}
            >
                <img src={IconJupyter} height={24} className={classes.linkIcon} />
                <span>{item.label}</span>
            </NavLink>)

        } else {
            return (<NavLink
                className={(navData) => cx(classes.link, { [classes.linkActive]: navData.isActive })}
                to={item.link}
                key={item.label}
            >
                <item.icon className={classes.linkIcon} stroke={1.5} />
                <span>{item.label}</span>
            </NavLink>)
        }


    });

    function onLogout(e: any) {
        e.preventDefault();
        dispatch(setUserLogout());
    }
    const [openedSelectUser, { open: openSelectUser, close: closeSelectUser }] = useDisclosure(false);

    function onSelectUserOpenModal(e: any) {
        e.preventDefault();
        openSelectUser();
    }


    return (
        <>
            <Navbar p="md" className={classes.navbar}
                width={{ base: 300 }}
                hiddenBreakpoint="sm"
                hidden={!opened}>
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
                    {user?.isAdmin && <p onClick={onSelectUserOpenModal} className={classes.link}>
                        <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
                        <span>Change account</span>
                    </p>}

                    <NavLink to={""} className={classes.link} onClick={onLogout}>
                        <IconLogout className={classes.linkIcon} stroke={1.5} />
                        <span>Logout</span>
                    </NavLink>
                </Navbar.Section>
            </Navbar>

            <Modal closeOnEscape
                opened={openedSelectUser}
                size="lg"
                onClose={closeSelectUser}
                title="Select a user to sign in">
                <SelectUserModal></SelectUserModal>
            </Modal>
        </>
    );
}
