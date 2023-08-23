
import {useEffect, useState} from "react";


export const useFetch = (url) =>
{
    const [data, setData] = useState([]);
    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const httpConfig = (data, method) =>
    {
        if (method === "POST")
        {
            setConfig({
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
            });
        }

        setMethod(method);
    }

//get data
    useEffect(() => 
    {
        async function fetchData() 
        {
            setLoading(true);
        
            try 
            {
                const res = await fetch(url);
                const data = await res.json();
                setData(data);
            }
            catch (error) 
            {  
                console.log(error.message);
                setError("fail to fetch data");
            }

            setLoading(false);
        }
        fetchData();
    }, [url,callFetch]);

    useEffect(() =>
    {
        async function httpRequest()
        {
        if (method === "POST")
        {
            let fetchOptions = [url,config];
            const res = await fetch(...fetchOptions);
            const data = await res.json();
            setCallFetch(data);

        }
        }
        httpRequest();

    }, [config]);

    return {data,httpConfig,loading,error};
}

