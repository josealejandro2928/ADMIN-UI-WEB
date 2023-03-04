import { useEffect, useState } from 'react';
import useAuthMidd from '../../hooks/useAuthMidd';
import { getModels } from '../../functions/api.server';
import { handleAndVisualizeError } from '../../common/index';

const Home = () => {
    const { newFunction: listModels } = useAuthMidd(getModels);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getDataFromModels();
    }, [])

    async function getDataFromModels() {
        setLoading(true);
        try {
            let data = await listModels();
            console.log("🚀 ~ file: Home.tsx:18 ~ getDataFromModels ~ data:", data)
        } catch (e: any) {
            handleAndVisualizeError("Error", e);
        }
        setLoading(false);

    }

    return <h2>Home</h2>
}

export default Home;