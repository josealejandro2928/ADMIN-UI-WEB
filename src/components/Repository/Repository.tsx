import { useEffect, useState } from 'react';
import useAuthMidd from '../../hooks/useAuthMidd';
import { getModels } from '../../functions/api.server';
import { handleAndVisualizeError } from '../../common/index';
import { useAppSelector } from '../../store/hooks';
import { Tabs, Text, Group, Grid, Divider, Table, Tooltip } from '@mantine/core';
import { IconPhoto, IconBrandGithub } from '@tabler/icons-react';
import IconPc from "../../assets/images/icon-pc.png";
import IconGithub from "../../assets/images/icon-github.svg";
import IconFolder from "../../assets/images/icon-Folder.svg";
import classes from "./Repository.module.scss";

const Repository = () => {
    const { newFunction: listModels } = useAuthMidd(getModels);
    const [isLoading, setLoading] = useState<boolean>(false);
    // const { isLoggedIn, isAuthInProgress } = useAppSelector((state) => state.users);
    const [localModelsRepo, setLocalModelsRepo] = useState<Array<{ path: string; name: string, items?: number, isDir: boolean }>>([]);
    const [selectionLocal, setSelectionLocal] = useState<{ path: string; name: string, items?: number, isDir: boolean } | null>(null);

    useEffect(() => {
        getDataFromModels();
    }, [])

    async function getDataFromModels() {
        setLoading(true);
        try {
            let data: any = await listModels();
            setLocalModelsRepo(data.localModelsRepo)
        } catch (e: any) {
            handleAndVisualizeError("Error", e);
        }
        setLoading(false);

    }

    function onSelectItem(item: any) {
        if (selectionLocal == item) setSelectionLocal(null);
        else {
            setSelectionLocal(item);
        }
    }

    return <Tabs variant="outline" radius="md" defaultValue="Local">
        <Tabs.List>
            <Tabs.Tab value="Local" icon={<img src={IconPc} height={24} />}>From Local</Tabs.Tab>
            <Tabs.Tab value="Github" icon={<img src={IconGithub} height={24} />}>From Github</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="Local" pt="xs" >
            <Grid>
                <Grid.Col xs={8}>
                    <NormalView onClick={onSelectItem} items={localModelsRepo} selection={selectionLocal}></NormalView>
                </Grid.Col>
                <Grid.Col h={100} xs={4} className={classes["right-panel"]}>
                    {selectionLocal && <ItemDetailsView item={selectionLocal} />}

                </Grid.Col>
            </Grid>

        </Tabs.Panel>

        <Tabs.Panel value="Github" pt="xs">
            Messages tab content
        </Tabs.Panel>
    </Tabs>
}

const NormalView = ({ items, onClick, selection }: {
    items: Array<{
        path: string; name: string,
        items?: number, isDir: boolean
    }>,
    selection: any,
    onClick: any
}) => {
    return <div className={classes["normal-items-container"]}>
        {items?.map((item) => {
            return (<div key={item.path}
                onClick={() => onClick(item)} className={selection == item ?
                    `${classes["item"]} ${classes["selected"]}`
                    : classes["item"]}>
                <img src={IconFolder} alt={item.name} />
                <Tooltip position="bottom" arrowPosition="center"
                    label={item.name}>
                    <Text className={classes["text"]} align="center" size="xs" w={100} truncate="end">{item.name}</Text>
                </Tooltip>
            </div>)
        })}
    </div>
}

const ItemDetailsView = ({ item }: {
    item: {
        path: string; name: string,
        items?: number, isDir: boolean
    }
}) => {
    return <Table striped highlightOnHover withBorder withColumnBorders fontSize="xs">
        <thead>
            <tr>
                <th>name</th>
                <th>{item.name}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>path</td>
                <td><Text truncate="end" w={200}>{item.path}</Text></td>
            </tr>
            <tr>
                <td>items</td>
                <td>{item.items}</td>
            </tr>
        </tbody>
    </Table>
}




export default Repository;