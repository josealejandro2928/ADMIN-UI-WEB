import { Button, Group, Loader, Tabs, Tooltip } from "@mantine/core"
import { useEffect, useState, useTransition } from "react";
import IconXMI from "../../assets/images/icon-xml.png"
import IconJSON from "../../assets/images/icon-json.png"
import { handleAndVisualizeError } from "../../common";
import useAuthMidd from "../../hooks/useAuthMidd";
import { getReports } from "../../functions/api.server";
import SmartTable from "../../common/SmartTable";
import classes from "./Reports.module.scss"
import { IconCloudDownload } from "@tabler/icons-react";

type ReportData = { result: any[]; legends: any[], "conv-logs": any[] };

const Reports = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<ReportData | null>()
    const [activeTab, setActiveTab] = useState<string>("results");
    const { newFunction: _getReports } = useAuthMidd<ReportData>(getReports);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        getLogs();
    }, [])

    async function getLogs() {
        setLoading(true);
        try {
            let res: ReportData = await _getReports();
            setData(res);
        } catch (e) {
            handleAndVisualizeError("Error retrieving the current logs", e);
        }
        setLoading(false);
    }

    return (<div className={classes["container"]}>
        <Tabs onTabChange={(val: string) => setActiveTab(val)} variant="outline" radius="md" defaultValue="results">
            <Tabs.List>
                <Tabs.Tab value="results" icon={<img src={IconXMI} height={24} />}>Results</Tabs.Tab>
                <Tabs.Tab value="legends" icon={<img src={IconXMI} height={24} />}>Legends </Tabs.Tab>
                <Tabs.Tab value="conv-logs" icon={<img src={IconJSON} height={24} />}>Logs </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="results" pt="xs" >
                <SmartTable className={classes["report-table"]} files={data?.result || []}
                    columns={
                        ["model_name", "is_parsed", "sys_name",
                            "num_comp", "num_conn", "size", "coupling", "cohesion", "avg_shortest_path", "avg_deg_cent",
                            "graph_density", "no_hardware_comp", "no_software_comp", "no_sys_comp"]}
                />
            </Tabs.Panel>
            <Tabs.Panel value="legends" pt="xs" >
                <SmartTable className={classes["report-table"]} files={data?.legends || []} />
            </Tabs.Panel>
            <Tabs.Panel value="conv-logs" pt="xs" >
                <SmartTable className={classes["report-table"]} files={(data && data["conv-logs"]) || []} />
            </Tabs.Panel>
        </Tabs>

        {isLoading && (<Group className={classes["loader"]} position="center">
            <Loader size="lg" variant="bars" />
        </Group>)}

        <Tooltip label={`Download ${activeTab}`}>
            <Button style={{ left: "unset", right: "8px", padding: '4px px' }}
                radius="md" size="xs" variant="outline" className={classes["btn-dwn"]}>
                <IconCloudDownload style={{ marginRight: 4 }} />  download
            </Button>
        </Tooltip>

    </div>
    )

}

export default Reports
