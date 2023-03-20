import { createStyles, Header, Group, Burger, rem, ActionIcon, useMantineColorScheme, Flex } from '@mantine/core';
import { Image } from '@mantine/core';
// import Logo from "../assets/react.svg"
import Logo from "../assets/logo.jpg";
import { IconMoonStars, IconSun } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    header: {
        backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
        borderBottom: 0,
        color: "white",
        fontWeight: 500,
        fontSize: 18
    },

    inner: {
        height: rem(56),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: "0px 32px"
    },

    burger: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

}));



export function HeaderApp({ openSidebar, onToggledSidebar }: { openSidebar: boolean, onToggledSidebar: (state: any) => any }) {
    const { classes } = useStyles();

    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
        <Header height={60} className={classes.header} mb={120}>
            <div className={classes.inner}>
                <Flex w={"100%"} justify="space-between">
                    <Group>
                        <img src={Logo} height={40} style={{ borderRadius: "50%" }}></img>
                        Architectural Models Tool
                    </Group>


                    <ActionIcon
                        title="Toggle color scheme"
                        variant="transparent"
                        style={{ color: dark ? "yellow" : "white" }}
                        onClick={() => toggleColorScheme()}
                    >
                        {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
                    </ActionIcon>
                </Flex>
                <Burger
                    opened={openSidebar}
                    onClick={() => { onToggledSidebar((state: boolean) => !state) }}
                    className={classes.burger}
                    size="sm"
                    color="#fff"
                />

            </div>


        </Header>
    );
}