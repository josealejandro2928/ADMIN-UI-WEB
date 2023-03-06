import { Grid, ScrollArea } from "@mantine/core";
import classes from "./ConversionAnalysis.module.scss"
import { Text } from "@mantine/core";

const RenderLogs = ({ dataLogs, errorLogs, title }: { dataLogs: Array<string>, errorLogs: Array<string>, title: string }) => {
    return <div className={classes["log-panel"]}>
        <div className={classes["data-panel"]} >
            <ScrollArea h={`calc(100vh - 210px)`}>
                <Text size="md" style={{ textTransform: "uppercase" }} color="green" fw="bold">{title}</Text>
                {dataLogs.map((item, index) => {
                    if (item.startsWith("\t")) {
                        return <Text style={{ marginLeft: '16px' }} py={2} size="sm" key={index} className={classes["log"]}>{item}</Text>
                    } else {
                        return <Text size="sm" key={index} py={4} className={classes["log"]}>{item}</Text>
                    }
                })}
                {dataLogs.length == 0 && <Text >There is not record yet. Run the discovering/analyzing phase</Text>}
            </ScrollArea>

        </div>
        <div className={classes["error-panel"]}>
            <div className={classes["data-panel"]} >
                <ScrollArea h={`calc(100vh - 210px)`}>
                    <Text size="md" style={{ textTransform: "uppercase" }} color="red" fw="bold">Errors logs</Text>
                    {errorLogs.map((item, index) => {
                        if (item.startsWith("\t")) {
                            return <Text style={{ marginLeft: '4px' }} py={2} size="sm" key={index} className={classes["log"]}>{item}</Text>
                        } else {
                            return <Text size="sm" key={index} py={4} className={classes["log"]}>{item}</Text>
                        }
                    })}
                </ScrollArea>

            </div>

        </div>
    </div>

}

export default RenderLogs;