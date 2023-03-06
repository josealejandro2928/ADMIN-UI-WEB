import { useEffect, useState } from 'react';
import useAuthMidd from '../../hooks/useAuthMidd';
import { getModels, deleteModel } from '../../functions/api.server';
import { handleAndVisualizeError } from '../../common/index';
import { useAppSelector } from '../../store/hooks';
import { Tabs, Grid, Button, Modal, Group, Text, Stack, List } from '@mantine/core';
import IconPc from "../../assets/images/icon-pc.png";
import IconGithub from "../../assets/images/icon-github.svg";

import classes from "./Repository.module.scss";
import NormalItemsView from './NormalItemsView';
import DetailsMenuItemView from './DetailsMenuItemView';
import { ItemRepository } from '../../classes/repository.classes';
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import AddModalFromLocal from '../modals/AddModalFromLocal';
import AddGithubLinksModal from '../modals/AddGithubLinksModal';
import { Config } from '../../classes/config.classes';

const Repository = () => {
    const { newFunction: listModels } = useAuthMidd(getModels);
    const { newFunction: deleteModelFromRepo } = useAuthMidd(deleteModel);
    const [isLoading, setLoading] = useState<boolean>(false);
    // const { isLoggedIn, isAuthInProgress } = useAppSelector((state) => state.users);
    const [localModelsRepo, setLocalModelsRepo] = useState<Array<ItemRepository>>([]);
    const [githubModelsRepo, setGithubModelsRepo] = useState<Array<ItemRepository>>([]);
    const [selectionLocal, setSelectionLocal] = useState<ItemRepository | null>(null);
    const [selectionGithub, setSelectionGithub] = useState<ItemRepository | null>(null);
    const [openedAddNewLocalModelModal, { open: openAddNewLocalModelModal, close: closeAddNewLocalModelModal }] = useDisclosure(false);
    const [openedAddNewGithubLinksModal, { open: openAddNewGithubLinksModal, close: closeAddNewGithubLinksModal }] = useDisclosure(false);
    const config: Config | null | undefined = useAppSelector((state) => state.config.config);

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
        return selectionGithub == item ? setSelectionGithub(null) : setSelectionGithub(item);
    }

    function onFinishUploadModels(data: any) {
        closeAddNewLocalModelModal();
        closeAddNewGithubLinksModal();
        getDataFromModels();

    }
    async function onDeleteModel(item: ItemRepository) {
        setLoading(true);
        try {
            await deleteModelFromRepo(item.path);
            getDataFromModels();
            setSelectionGithub(null);
            setSelectionLocal(null);
        } catch (e) {
            handleAndVisualizeError("Error deleting", e);
        }
        setLoading(false);
    }

    return <Tabs variant="outline" radius="md" defaultValue="Local">
        <Tabs.List>
            <Tabs.Tab value="Local" icon={<img src={IconPc} height={24} />}>From Local</Tabs.Tab>
            <Tabs.Tab value="Github" icon={<img src={IconGithub} height={24} />}>From Github</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="Local" pt="xs" >
            <Grid>
                <Grid.Col xs={8} onClick={() => setSelectionLocal(null)}>
                    <NormalItemsView onClick={onSelectLocalItem} items={localModelsRepo} selection={selectionLocal}></NormalItemsView>
                </Grid.Col>
                <Grid.Col h={100} xs={4} className={classes["right-panel"]}>
                    <DetailsMenuItemView
                        deleteModel={onDeleteModel}
                        item={selectionLocal}
                        addBtn={
                            <Button onClick={() => openAddNewLocalModelModal()} variant="gradient"
                                radius="md" size="xs"
                                leftIcon={<IconPlus size="1rem" />}>
                                Add a new
                            </Button>
                        } />
                </Grid.Col>
            </Grid>
            <Modal closeOnEscape closeOnClickOutside={false}
                opened={openedAddNewLocalModelModal}
                size="lg"
                onClose={closeAddNewLocalModelModal}
                title="Add new models from local">
                <AddModalFromLocal onFinish={onFinishUploadModels}></AddModalFromLocal>
            </Modal>

        </Tabs.Panel>

        <Tabs.Panel value="Github" pt="xs">
            <Grid>
                <Grid.Col xs={8} onClick={() => setSelectionGithub(null)}>
                    <NormalItemsView onClick={onSelectGithubItem} items={githubModelsRepo}
                        selection={selectionGithub}></NormalItemsView>
                </Grid.Col>
                <Grid.Col h={100} xs={4} className={classes["right-panel"]}>
                    <DetailsMenuItemView deleteModel={onDeleteModel}
                        item={selectionGithub}
                        addBtn={
                            <Button onClick={() => openAddNewGithubLinksModal()} variant="gradient"
                                radius="md" size="xs"
                                leftIcon={<IconPlus size="1rem" />}>
                                Add a new
                            </Button>
                        } />

                    <Text mt="xl" fz="sm">External resources</Text>
                    <List>
                        {config?.externalResources?.map((el) =>
                            <List.Item key={el}>
                                <Text fz="xs" lineClamp={2} w={"90%"}>{el}</Text>
                            </List.Item>
                        )}
                    </List>
                </Grid.Col>
            </Grid>
            <Modal closeOnEscape closeOnClickOutside={false}
                opened={openedAddNewGithubLinksModal}
                size="lg"
                onClose={closeAddNewGithubLinksModal}
                title="Add new sources from github">
                <AddGithubLinksModal onFinish={onFinishUploadModels}></AddGithubLinksModal>
            </Modal>
        </Tabs.Panel>
    </Tabs>
}






export default Repository;