import React from 'react';
import {useDisclosure} from "@chakra-ui/hooks";
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent, DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Input
} from "@chakra-ui/react";

// todo: typedef
const MarketNewsArchiveFilter = (props: any) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const btnRef = React.useRef()

    const {filterNews} = props;

    const handleChange = (event: React.FormEvent<EventTarget>) => {
        const target = event.target as HTMLInputElement
        console.log("term changed....", target.value)
        const term = target.value;
        filterNews(term);
    }


    return (
        <>
            <Button ref={btnRef} colorScheme='green' onClick={onOpen}>
                Filter
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader>Suchen</DrawerHeader>

                    <DrawerBody>
                        <Input placeholder='Type here...' onChange={handleChange}/>
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
