import { Button, Group, Loader, Modal, Tabs, Text, Tooltip } from "@mantine/core";
import { useEffect, useState, useTransition } from 'react';
import { Log } from "../../classes/config.classes";
import classes from "./ConversionAnalysis.module.scss"
import { handleAndVisualizeError } from '../../common/index';
import useAuthMidd from '../../hooks/useAuthMidd';
import { getLatestLogs, getModelAnalyse, getModelDiscover, invalidCache } from "../../functions/api.server";
import RenderLogs from './RenderLogs';
import { IconTrash, IconDeviceDesktopAnalytics, IconTransform } from '@tabler/icons-react';
import { toast } from 'react-toastify';
import { useAppSelector } from "../../store/hooks";

const ConversionAnalysis = () => {
    const [logs, setLogs] = useState<{ conversionLogs: Log, analysisLogs: Log } | null>();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>("conversion");
    const { newFunction: _getLatestLogs } = useAuthMidd<{ conversionLogs: Log, analysisLogs: Log }>(getLatestLogs);
    const { newFunction: _getModelAnalyse } = useAuthMidd<Log>(getModelAnalyse);
    const { newFunction: _getModelDiscover } = useAuthMidd<Log>(getModelDiscover);
    const { newFunction: _invalidCache } = useAuthMidd<Log>(invalidCache);
    const [isPending, startTransition] = useTransition();
    const isAdmin = useAppSelector((state) => state.users.user?.isAdmin);

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

    async function onDiscoverModels() {
        setLoading(true);
        try {
            let data: Log = await _getModelDiscover();
            setLogs({ ...logs, conversionLogs: data } as any);
            toast(
                <div>
                    <p>Discover phase successfully</p>
                    <Text>If you can see the details go to:  <a href="/admin/results">See reports</a></Text>
                </div>, { type: "info", autoClose: 5000 });
        } catch (e) {
            handleAndVisualizeError("Error", e);
        }
        setLoading(false);
    }

    async function onAnalyseModels() {
        setLoading(true);
        try {
            let data: Log = await _getModelAnalyse();
            setLogs({ ...logs, analysisLogs: data } as any);
            toast(
                <div>
                    <p>Analyse phase successfully</p>
                    <Text>If you can see the details go to:  <a href="/admin/results">See reports</a></Text>
                </div>, { type: "info", autoClose: 5000 });
        } catch (e) {
            handleAndVisualizeError("Error", e);
        }
        setLoading(false);
    }

    async function onInvalidCache() {
        try {
            await _invalidCache()
            setLogs(null);
            toast("Cache invalidation successfully", { type: "info" });
        } catch (e) {
            handleAndVisualizeError("Error", e);
        }
    }


    return <div className={classes["container"]}>
        <Tabs onTabChange={(val: string) => startTransition(() => setActiveTab(val))} variant="outline" radius="md" defaultValue="conversion">
            <Tabs.List>
                <Tabs.Tab value="conversion" icon={<IconTransform />}>Conversion</Tabs.Tab>
                <Tabs.Tab value="analysis" icon={<IconDeviceDesktopAnalytics />}>Analysis </Tabs.Tab>
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
        {activeTab == "conversion" &&
            (<Button w={120} onClick={onDiscoverModels} radius="md" variant="gradient" className={classes["btn-run"]}>
                Run Discover
            </Button>)
        }
        {activeTab == "analysis" &&
            (<Button w={120} onClick={onAnalyseModels} radius="md" variant="gradient" className={classes["btn-run"]}>
                Run Analysis
            </Button>)
        }

        {isAdmin && <Tooltip label="Invalid Cache">
            <Button onClick={onInvalidCache} style={{ left: "unset", right: "8px", padding: '4px 8px' }} radius="md" variant="outline" color="red" className={classes["btn-run"]}>
                <IconTrash></IconTrash> Cache
            </Button>
        </Tooltip>}


    </div>

}

export default ConversionAnalysis;