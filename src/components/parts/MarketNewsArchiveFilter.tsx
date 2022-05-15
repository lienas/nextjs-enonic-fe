import React, {RefObject} from 'react';
import {useDisclosure} from "@chakra-ui/hooks";
import {
    Button, ButtonGroup,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent, DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Input
} from "@chakra-ui/react";

import {useRouter} from "next/router";
import {TiFilter, TiTimes} from "react-icons/ti";

export interface MarketFilterProps {
    filterNews: React.Dispatch<React.SetStateAction<string>>,
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>,
    isActive: boolean
}

const MarketNewsArchiveFilter = (props: MarketFilterProps) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const btnRef = React.useRef() as RefObject<any>;
    const router = useRouter();
    const query = router.query;
    const {term} = query;
    const [value, setValue] = React.useState(term);

    const {filterNews, setIsActive, isActive} = props;
    //console.log("News-Filter -> %s", JSON.stringify(props, null, 2));

    const handleChange = (event: React.FormEvent<EventTarget>) => {
        const target = event.target as HTMLInputElement;
        //console.log("term changed....", target.value);
        const term = target.value;
        setValue(term);
        setIsActive(true);
        filterNews(term);
    }

    const resetFilter = async () => {
        setValue('');
        filterNews('');
        setIsActive(false);

        //todo:check if that works
        await router.push(router.query.contentPath + '');
    }

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
