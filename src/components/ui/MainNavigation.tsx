import React, {useEffect, useState} from 'react';
import {mainNavigationQuery} from '../queries/navigation';
import {Alert, AlertIcon, AlertTitle, Heading} from "@chakra-ui/react";
import PropsView from "../views/Props";

const MainNavigation = () => {

    const [data, setData] = useState([]);

    const variables = {
        path: ""
    }

    useEffect(() => {
        const apiUrl = "http://localhost:8080/site/next/draft/hmdb/_graphql";
        console.log("api-url (Main Nav) = %s", apiUrl);
        const fetchData = async () => {
            let response;
            if (!apiUrl) {
                console.error("no API URL");
                return;
            }
            console.log("Fetch Menu...");
            try {
                response = await fetch(apiUrl, {
                    method: 'POST',
                    body: JSON.stringify({
                        query: mainNavigationQuery,
                        variables: variables
                    })
                })
            } catch (e: any) {
                console.log(e.message);
                throw new Error(JSON.stringify({
                    message: `Data fetching failed (message: '${e.message}')`
                }));
            }

            if (!response.ok) {
                throw new Error(JSON.stringify({
                    status: response.status,
                    message: `Data fetching failed (message: '${await response.text}')`
                }));

            }
            const json = await response.json();
            setData(json);
        }

        fetchData().catch(console.error);

    },[]);

    return (
        <div>
            <Heading>Menu</Heading>
            <PropsView {...data}/>
        </div>
    );
};

export default MainNavigation;
