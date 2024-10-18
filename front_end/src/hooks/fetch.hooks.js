import axios from "axios";
import{ useEffect, useState } from 'react'

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;


// useFetch is a custom React hook that fetches data from an API and manages the loading state, 
// fetched data, status, and any server errors.
export const useFetch = (query) => {
    const [getData, setData] = useState({
        isLoading: false,  // Tracks if the data is currently being fetched
        apiData: undefined,  // Holds the fetched data once the request is successful
        status: null,
        serverError: null
    });

    useEffect(()=>{
        if(!query) return;

        // Function to fetch data asynchronously
        const fetchData = async()=>{
            try {
                // Set isLoading to true to indicate data is being fetched.
                setData(prev => ({...prev, isLoading: true}));
                const {data, status} = await axios.get(`/api/${query}`); // Make a GET request using axios to the endpoint '/api/query'

                if(status === 201){
                    setData(prev => ({...prev, isLoading: false}));
                    setData(prev => ({...prev, apiData: data, status: status}))
                }
                // Set isLoading to false after data is fetched, regardless of the response status.
                setData(prev => ({...prev, isLoading: false}));
            } catch (error) {
                setData(prev => ({...prev, isLoading: false}));
                setData(prev => ({...prev, serverError: error}));
            }
        }
        fetchData();
    }, [query]);
    return {getData, setData}
}