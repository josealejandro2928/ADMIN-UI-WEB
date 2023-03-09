
import { Group, Loader, Container, Flex, TextInput, MultiSelect, Button, NumberInput } from '@mantine/core';
import { useState, useEffect, useRef } from 'react';
import classes from "./Config.module.scss";
import useAuthMidd from '../../hooks/useAuthMidd';
import { handleAndVisualizeError } from '../../common/index';
import { Config } from "../../classes/config.classes";
import { useForm } from "@mantine/form";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateConfig } from '../../functions/api.server';
import { setConfig } from '../../store/features/configSlice';

type ConfigForm = {
    timeCacheForDiscoveringSearchOverFilesInSeconds: number;
    timeCacheForPollingFromExternalResources: number;
    externalResources: string[];
    avoidFileNames: string[];
    extensionsForSearching: string[];
    outputFolderName: string;
    ecoreRequiredFilesFolder: string;
    rootPath: string;
}
const ConfigComponent = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const config: Config | null | undefined = useAppSelector((state) => state.config.config);
    const isAdmin = useAppSelector((state) => state.users.user?.isAdmin);
    const { newFunction: _updateConfig } = useAuthMidd<any>(updateConfig);
    const dispatch = useAppDispatch();

    const form = useForm<ConfigForm>({
        initialValues: {
            timeCacheForDiscoveringSearchOverFilesInSeconds: 0,
            timeCacheForPollingFromExternalResources: 0,
            externalResources: [],
            avoidFileNames: [],
            extensionsForSearching: [],
            outputFolderName: "",
            ecoreRequiredFilesFolder: "",
            rootPath: ""
        },
        validate: {
            timeCacheForDiscoveringSearchOverFilesInSeconds: (value) => {
                if (!value || value < 5) return "Invalid, it should be greater than 5 s";
                return null
            },
            timeCacheForPollingFromExternalResources: (value) => {
                if (!value || value < 30) return "Invalid, it should be greater than 30 s";
                return null
            }
        },
        validateInputOnBlur: true,
        validateInputOnChange: true
    });

    useEffect(() => {
        if (!config) return;
        form.setValues(config);
    }, [config])

    async function onSave() {
        setLoading(true);
        try {
            let data = {
                timeCacheForDiscoveringSearchOverFilesInSeconds: form.values.timeCacheForDiscoveringSearchOverFilesInSeconds,
                timeCacheForPollingFromExternalResources: form.values.timeCacheForPollingFromExternalResources
            }
            let res: { config: Config } = await _updateConfig(data);
            dispatch(setConfig(res));
        } catch (e) {
            handleAndVisualizeError("Error updating config", e);
        }
        setLoading(false);
    }

    return <div className={classes["container"]}>
        <Container>
            <Flex wrap="wrap" gap="sm" >
                <NumberInput disabled={!isAdmin} w="300px" required label="Cache time for discovering (s)" type="number"
                    {...form.getInputProps("timeCacheForDiscoveringSearchOverFilesInSeconds")} />

                <NumberInput disabled={!isAdmin} w="300px" required label="Cache time for polling external resources (s)" type="number"
                    {...form.getInputProps("timeCacheForPollingFromExternalResources")} />

                <TextInput disabled w="300px" required label="Output folder name" type="text"
                    {...form.getInputProps("outputFolderName")} />

                <MultiSelect disabled data={[".git", ".gitignore", ".project", ".aadlbin-gen"]} w="300px" required
                    label="Avoid file names" type="number"
                    {...form.getInputProps("avoidFileNames")} />

                <TextInput disabled w="300px" required label="Root path" type="text"
                    {...form.getInputProps("rootPath")} />

                <MultiSelect disabled data={["aadl"]} w="300px" required label="Extensions for searching" type="number"
                    {...form.getInputProps("extensionsForSearching")} />

                <MultiSelect disabled data={config?.archivesForSearching || []} w="300px" required label="Arch for searching" type="number"
                    {...form.getInputProps("archivesForSearching")} />

            </Flex>
            <Button mt="lg" variant='gradient' disabled={!form.isValid() || !isAdmin} onClick={onSave}>Save</Button>
        </Container>
        {isLoading && (<Group className={classes["loader"]} position="center">
            <Loader size="lg" variant="bars" />
        </Group>)}
    </div>

}

export default ConfigComponent;
