import { Button, Checkbox, List, Flex, Group, Loader } from '@mantine/core';
import { DropzoneButton } from "../../common/DropZones";
import { useState } from 'react';
import classes from "./AddModalFromLocal.module.scss"
import useAuthMidd from '../../hooks/useAuthMidd';
import { uploadModels } from '../../functions/api.server';
import { handleAndVisualizeError } from '../../common/index';
import { toast } from 'react-toastify';

const AddModalFromLocal = ({ onFinish }: { onFinish: (data: any) => any }) => {
    const [files, setFiles] = useState<Array<File>>(new Array())
    const [selectedFiles, setSelectedFiles] = useState<Array<File>>(new Array())
    const [isLoading, setLoading] = useState<boolean>(false);
    const { newFunction: uploadModelsToLocalRepo } = useAuthMidd<any>(uploadModels);

    function onSelectFiles(files: File[]) {
        setFiles(files);
        setSelectedFiles(files);
    }
    function isSelectedFile(file: File) {
        return selectedFiles.indexOf(file) > -1
    }

    function onChangeSelection(file: File) {
        if (isLoading) return
        if (selectedFiles.indexOf(file) > -1) {
            setSelectedFiles(selectedFiles.filter((f) => f != file))
        } else {
            setSelectedFiles([...selectedFiles, file])
        }
    }

    function onClearSelection() {
        setFiles([]);
        setSelectedFiles([]);
    }

    async function onSave() {
        setLoading(true);
        let data:FormData[] = [];
        for (let file of selectedFiles) {
            let entry = new FormData();
            entry.append(file.name.replace(".zip", ""), file);
            data.push(entry);
        }
        try {
            for(const d of data){
                await uploadModelsToLocalRepo(d);
            }
            onFinish({});
            toast("Uploaded files successfully", { type: "success" })
        } catch (e) {
            handleAndVisualizeError("Error uploading models", e)
        }
        setLoading(false);
    }

    return <>
        {files.length > 0 &&
            <>
                <List className={classes["list-files"]}
                    spacing="xs"
                    size="sm"
                    center>
                    {files.map((file, index) => {
                        return (<List.Item style={{ opacity: isLoading ? 0.6 : 1, cursor: isLoading ? "not-allowed" : "pointer" }}
                            className={classes["item"]}
                            onClick={() => onChangeSelection(file)} key={index}
                            icon={<Checkbox disabled={isLoading} onChange={() => onChangeSelection(file)} checked={isSelectedFile(file)} radius="lg" size="md" />}>
                            {file.name}
                        </List.Item>)
                    })}
                </List>
                <Flex p={8} mih={40} align="center" justify="flex-end" gap={"1rem"} >
                    <Button disabled={isLoading} size="xs" variant="outline" onClick={onClearSelection}>Clear Selection</Button>
                    <Button disabled={isLoading} size="xs" variant="gradient" onClick={onSave}>Upload Selection</Button>
                </Flex>

                {isLoading && (<Group position="center">
                    <Loader size="lg" variant="bars" />
                </Group>)}
            </>
        }
        {files.length == 0 && <DropzoneButton onDrop={(files) => onSelectFiles(files)} />}
    </>
}

export default AddModalFromLocal;