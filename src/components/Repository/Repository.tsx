import { useEffect, useState } from 'react';
import useAuthMidd from '../../hooks/useAuthMidd';
import { getModels } from '../../functions/api.server';
import { handleAndVisualizeError } from '../../common/index';
import { useAppSelector } from '../../store/hooks';
import { Tabs, Text, Grid, Table } from '@mantine/core';
import IconPc from "../../assets/images/icon-pc.png";
import IconGithub from "../../assets/images/icon-github.svg";

import classes from "./Repository.module.scss";
import NormalItemsView from './NormalItemsView';
import DetailsMenuItemView from './DetailsMenuItemView';
import { ItemRepository } from '../../classes/repository.classes';

const Repository = () => {
    const { newFunction: listModels } = useAuthMidd(getModels);
    const [isLoading, setLoading] = useState<boolean>(false);
    // const { isLoggedIn, isAuthInProgress } = useAppSelector((state) => state.users);
    const [localModelsRepo, setLocalModelsRepo] = useState<Array<ItemRepository>>([]);
    const [githubModelsRepo, setGithubModelsRepo] = useState<Array<ItemRepository>>([]);
    const [selectionLocal, setSelectionLocal] = useState<ItemRepository | null>(null);
    const [selectionGithub, setSelectionGithub] = useState<ItemRepository | null>(null);

    useEffect(() => {
        getDataFromModels();
    }, [])

    async function getDataFromModels() {
        setLoading(true);
        try {
            let data: any = await listModels();
            setLocalModelsRepo(data.localModelsRepo)
            setGithubModelsRepo(data.githubModelsRepo)
        } catch (e: any) {
            handleAndVisualizeError("Error", e);
        }
        setLoading(false);

    }

    function onSelectLocalItem(item: any) {
        return selectionLocal == item ? setSelectionLocal(null) : setSelectionLocal(item);
    }

    function onSelectGithubItem(item: any) {
        return selectionLocal == item ? setSelectionGithub(null) : setSelectionGithub(item);
    }

    return <Tabs variant="outline" radius="md" defaultValue="Local">
        <Tabs.List>
            <Tabs.Tab value="Local" icon={<img src={IconPc} height={24} />}>From Local</Tabs.Tab>
            <Tabs.Tab value="Github" icon={<img src={IconGithub} height={24} />}>From Github</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="Local" pt="xs" >
            <Grid>
                <Grid.Col xs={8}>
                    <NormalItemsView onClick={onSelectLocalItem} items={localModelsRepo} selection={selectionLocal}></NormalItemsView>
                </Grid.Col>
                <Grid.Col h={100} xs={4} className={classes["right-panel"]}>
                    <DetailsMenuItemView item={selectionLocal} />
                </Grid.Col>
            </Grid>

        </Tabs.Panel>

        <Tabs.Panel value="Github" pt="xs">
            <Grid>
                <Grid.Col xs={8}>
                    <NormalItemsView onClick={onSelectGithubItem} items={githubModelsRepo} selection={selectionGithub}></NormalItemsView>
                </Grid.Col>
                <Grid.Col h={100} xs={4} className={classes["right-panel"]}>
                    <DetailsMenuItemView item={selectionGithub} />
                </Grid.Col>
            </Grid>
        </Tabs.Panel>
    </Tabs>
}






export default Repository;