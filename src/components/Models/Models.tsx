import { useEffect, useState } from 'react';
import useAuthMidd from '../../hooks/useAuthMidd';
import { getModels } from '../../functions/api.server';
import { handleAndVisualizeError } from '../../common/index';
import { Tabs, useMantineColorScheme } from '@mantine/core';
import TableFiles from './TableFiles';
import { ItemRepository } from '../../classes/repository.classes';
import IconFile from "../../assets/images/icon-file.svg"
import IconFileDark from "../../assets/images/icon-file-dark.png"
import IconXML from "../../assets/images/icon-xml.png";
import IconXMLDark from "../../assets/images/icon-xml-dark.png";

const Models = () => {
    const { newFunction: listModels } = useAuthMidd(getModels);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [aadlExtractedModels, setAadlExtractedModels] = useState<Array<ItemRepository>>();
    const [xmiConvertedModels, setXmiConvertedModels] = useState<Array<ItemRepository>>();
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === 'dark';

    useEffect(() => {
        getDataFromModels();
    }, [])

    async function getDataFromModels() {
        setLoading(true);
        try {
            let data: any = await listModels();
            setAadlExtractedModels(data.aadlExtractedModels)
            setXmiConvertedModels(data.xmiConvertedModels)
        } catch (e: any) {
            handleAndVisualizeError("Error", e);
        }
        setLoading(false);

    }

    return <Tabs variant="outline" radius="md" defaultValue="AADL">
        <Tabs.List>
            <Tabs.Tab value="AADL">AAdl Model</Tabs.Tab>
            <Tabs.Tab value="XMI">XMI Models </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="AADL" pt="xs" >
            <br />
            <TableFiles icon={<img height={20} style={{ marginRight: 4 }} src={!isDark ? IconFile : IconFileDark} />} files={aadlExtractedModels || []} />
        </Tabs.Panel>
        <Tabs.Panel value="XMI" pt="xs" >
            <br />
            <TableFiles icon={<img height={20} style={{ marginRight: 4 }} src={!isDark ? IconXML : IconXMLDark} />} files={xmiConvertedModels || []} />
        </Tabs.Panel>
    </Tabs>

}

export default Models;