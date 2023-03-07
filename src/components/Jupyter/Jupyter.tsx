import { Group, Loader } from "@mantine/core";
import { useState, useEffect, useRef } from 'react';
import classes from "./Jupyter.module.scss";
import useAuthMidd from '../../hooks/useAuthMidd';
import { startJupyter, stopJupyter } from "../../functions/api.server";
import { handleAndVisualizeError } from '../../common/index';

const Jupyter = () => {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [jpData, setJpData] = useState<{
        "user": string,
        "url": string
    } | null>(null);
    const { newFunction: _startJupyter } = useAuthMidd<{
        "user": string,
        "url": string
    }>(startJupyter);
    const { newFunction: _stopJupyter } = useAuthMidd(stopJupyter);
    const jpRef = useRef<HTMLIFrameElement | null>(null);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                let data = await _startJupyter();
                setJpData(data);
            } catch (e) {
                handleAndVisualizeError("Error", e);
            }
            setLoading(false);

        })()

    }, [])

    useEffect(() => {
        if (!jpData) return;

        setLoading(true);
        setTimeout(() => {
            jpRef?.current?.setAttribute("src", `http://${jpData.url}`)
            setLoading(false);
        }, 2000)
    }, [jpData])

    return <div className={classes["container"]}>
        <iframe ref={jpRef} className={classes["jupyter"]}></iframe>
        {isLoading && (<Group className={classes["loader"]} position="center">
            <Loader size="lg" variant="bars" />
        </Group>)}
    </div>

}

export default Jupyter;