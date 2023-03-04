import { createStyles, Header, Menu, Group, Center, Burger, Container, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Image } from '@mantine/core';
import Logo from "../assets/react.svg"

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

interface HeaderSearchProps {
    links: { link: string; label: string; }[];
}

export function HeaderApp({ links }: HeaderSearchProps) {
    const [opened, { toggle }] = useDisclosure(false);
    const { classes } = useStyles();

    return (
        <Header height={60} className={classes.header} mb={120}>
            <div className={classes.inner}>
                <Group >
                    <Image src={Logo} fit="unset" width={40} height={30}></Image>
                    Application Name
                </Group>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    className={classes.burger}
                    size="sm"
                    color="#fff"
                />
            </div>
        </Header>
    );
}