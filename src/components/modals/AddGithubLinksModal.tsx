import { Button, Checkbox, List, Flex, Group, Loader, TextInput, Stack, ActionIcon } from '@mantine/core';
import { DropzoneButton } from "../../common/DropZones";
import { useState, useEffect } from 'react';
import classes from "./AddGithubLinksModal.module.scss"
import useAuthMidd from '../../hooks/useAuthMidd';
import { updateConfig, uploadModels } from '../../functions/api.server';
import { handleAndVisualizeError } from '../../common/index';
import { toast } from 'react-toastify';
import { useForm } from '@mantine/form';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { IconTrash } from '@tabler/icons-react';
import { Config } from '../../classes/config.classes';
import { setConfig } from '../../store/features/configSlice';

const AddGithubLinksModal = ({ onFinish }: { onFinish: (data: any) => any }) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const externalResources = useAppSelector((state) => state?.config?.config?.externalResources || [])
    const { newFunction: updateConfigAuth } = useAuthMidd<any>(updateConfig);
    const dispatch = useAppDispatch();
    const form = useForm({
        initialValues: {
            externalResources: externalResources,
        },
        validate: {
            externalResources: (value) => {
                let reg = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
                let t = value.every((val) => reg.test(val)) ? null : "Invalid url";
                return t
            }
        },
        validateInputOnBlur: true
    });

    async function onSave() {
        setLoading(true);
        let resources: Set<String> = new Set(form.getInputProps("externalResources").value);

        try {
            let config: { config: Config } = await updateConfigAuth({ "externalResources": [...resources] });
            dispatch(setConfig(config));
            onFinish(null);
            toast("Updated Github sources successfully, when you run the analysis phase the resources will be pulled from github",
                { type: "info", autoClose: 5000 })
        } catch (e) {
            handleAndVisualizeError("Error uploading models", e)
        }
        setLoading(false);
    }

    function onAddResource() {
        form.insertListItem("externalResources", "");
    }

    return (
        <div>
            <Stack>
                {form.values.externalResources.map((value, index) => {
                    return (
                        <Group key={index} grow>
                            <TextInput style={{ "maxWidth": "100%", "width": "80%" }} type="text" placeholder='http://resourse.com' {...form.getInputProps(`externalResources.${index}`)} />
                            <ActionIcon color="red" onClick={() => form.removeListItem('externalResources', index)}>
                                <IconTrash size="1rem" />
                            </ActionIcon>
                        </Group>
                    )
                })}
            </Stack>
            <Button mt="sm" size='xs' onClick={onAddResource}> Add resource</Button>
            <Flex justify="flex-end">
                <Button disabled={!form.isValid()} onClick={onSave}>Save</Button>
            </Flex>
            {isLoading && (<Group position="center">
                <Loader size="lg" variant="bars" />
            </Group>)}
        </div>
    )
}

export default AddGithubLinksModal;