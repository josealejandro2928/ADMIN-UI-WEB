import { Group, Loader, Tabs } from "@mantine/core";
import ConvIcon from "../../assets/images/conv-icon.svg";
import AnalysisIcon from "../../assets/images/analysis-icon.svg";
import { useEffect, useState } from 'react';
import { Log } from "../../classes/config.classes";
import classes from "./ConversionAnalysis.module.scss"
import { handleAndVisualizeError } from '../../common/index';
import useAuthMidd from '../../hooks/useAuthMidd';
import { getLatestLogs } from "../../functions/api.server";
import RenderLogs from './RenderLogs';

const ConversionAnalysis = () => {
    const [logs, setLogs] = useState<{ conversionLogs: Log, analysisLogs: Log } | null>();
    const [isLoading, setLoading] = useState<boolean>(false);
    const { newFunction: _getLatestLogs } = useAuthMidd<{ conversionLogs: Log, analysisLogs: Log }>(getLatestLogs);

    useEffect(() => {
        getLogs();
    }, [])

    async function getLogs() {
        setLoading(true);
        try {
            let data = await _getLatestLogs();
            setLogs(data);
        } catch (e) {
            handleAndVisualizeError("Error retrieving the current logs", e);
        }
        setLoading(false);
    }

    return <div className={classes["container"]}>
        <Tabs variant="outline" radius="md" defaultValue="conversion">
            <Tabs.List>
                <Tabs.Tab value="conversion" icon={<img src={ConvIcon} height={24} />}>Conversion</Tabs.Tab>
                <Tabs.Tab value="analysis" icon={<img src={AnalysisIcon} height={24} />}>Analysis </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="conversion" pt="xs" >
                <RenderLogs title="Conversion Logs" dataLogs={logs?.conversionLogs?.dataLogs || []}
                    errorLogs={logs?.conversionLogs?.errorLogs || []}
                ></RenderLogs>

            </Tabs.Panel>
            <Tabs.Panel value="analysis" pt="xs" >
                <RenderLogs title="Analysis Logs" dataLogs={logs?.analysisLogs?.dataLogs || []}
                    errorLogs={logs?.analysisLogs?.errorLogs || []}
                ></RenderLogs>
            </Tabs.Panel>
        </Tabs>

        {isLoading && (<Group className={classes["loader"]} position="center">
            <Loader size="lg" variant="bars" />
        </Group>)}

    </div>

}

export default ConversionAnalysis;