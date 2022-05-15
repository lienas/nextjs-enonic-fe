import React, {RefObject, useEffect} from 'react';
import {useDisclosure} from "@chakra-ui/hooks";
import {
    Button, ButtonGroup,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent, DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Input, ListItem, UnorderedList
} from "@chakra-ui/react";

import {useRouter} from "next/router";
import {TiFilter, TiTimes} from "react-icons/ti";
import {getSourceAgg} from "../queries/getSourceAgg";

export interface MarketFilterProps {
    filterNews: React.Dispatch<React.SetStateAction<string>>,
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>,
    isActive: boolean
}

export interface AggregationBucket {
    key: string,
    docCount: number
}

const fetchSourceAggregation = async (props: any) => {
    // todo: get from envelope
    const API_URL = "http://localhost:8080/site/next/draft/hmdb/_graphql";
    const query = "type like '*market*'";
    const {setSource} = props;

    let resp;
    let total; // total from client fetch

    try {
        resp = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({
                query: getSourceAgg,
                variables: {
                    query: query
                }
            })
        });

        const sourceAgg: any = await resp.json();
        const queryConn = sourceAgg.data.guillotine.queryConnection;
        const buckets = queryConn.aggregationsAsJson.bySource.buckets;
        setSource(buckets);
        console.log(JSON.stringify(sourceAgg.data.guillotine.queryConnection, null, 2));


    } catch (e: any) {
        console.log(e.message);
    }
}

const MarketNewsArchiveFilter = (props: MarketFilterProps) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const btnRef = React.useRef() as RefObject<any>;
    const router = useRouter();
    const query = router.query;
    const {term} = query;
    const [value, setValue] = React.useState(term);
    const [source, setSource] = React.useState<AggregationBucket[]>([]);

    const {filterNews, setIsActive, isActive} = props;

    const handleChange = (event: React.FormEvent<EventTarget>) => {
        const target = event.target as HTMLInputElement;
        const term = target.value;
        setValue(term);
        setIsActive(true);
        filterNews(term);
    }

    const resetFilter = async () => {
        setValue('');
        filterNews('');
        setIsActive(false);

        await router.push(router.query.contentPath + '');
    }

    useEffect(() => {
        //Source Aggregation
        fetchSourceAggregation({setSource: setSource});

    }, [value]);

    return (
        <>
            <ButtonGroup my={4}>
                <Button
                    ref={btnRef}
                    leftIcon={<TiFilter/>}
                    size={"sm"}
                    colorScheme={isActive ? 'green' : 'gray'}
                    onClick={onOpen}>
                    Filter
                </Button>
                <Button
                    size={"sm"}
                    leftIcon={<TiTimes/>}
                    onClick={resetFilter}
                    isDisabled={!isActive}>
                    reset
                </Button>
            </ButtonGroup>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader>Suchen</DrawerHeader>

                    <DrawerBody>
                        <Input placeholder='Type here...' onChange={handleChange} value={value}/>
                        <UnorderedList my={5}>
                        {source.map(s => (<ListItem key={s.key}>{s.key} ({s.docCount})</ListItem>))}
                        </UnorderedList>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Ausblenden
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )

};

export default MarketNewsArchiveFilter;
