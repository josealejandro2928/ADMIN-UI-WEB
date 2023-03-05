import { Button, Checkbox, List, Flex, Group, Loader } from '@mantine/core';
import { DropzoneButton } from "../../common/DropZones";
import { useState } from 'react';
import classes from "./AddGithubLinksModal.module.scss"
import useAuthMidd from '../../hooks/useAuthMidd';
import { uploadModels } from '../../functions/api.server';
import { handleAndVisualizeError } from '../../common/index';
import { toast } from 'react-toastify';

const AddGithubLinksModal = ({ onFinish }: { onFinish: (data: any) => any }) => {
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
        let data: FormData[] = [];
        for (let file of selectedFiles) {
            let entry = new FormData();
            entry.append(file.name.replace(".zip", ""), file);
            data.push(entry);
        }
        try {
            let res = await Promise.all(data.map(d => uploadModelsToLocalRepo(d)));
            onFinish(res);
            toast("Uploaded files successfully", { type: "success" })
        } catch (e) {
            handleAndVisualizeError("Error uploading models", e)
        }
        setLoading(false);
    }

    return <h2>Hello</h2>
}

export default AddGithubLinksModal;