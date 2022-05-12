import React from "react";
import {PartProps} from "../../_enonicAdapter/views/BasePart";
import {Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Image} from "@chakra-ui/react";
import PropsView, {DataDump} from "../ui/debug/Props";
import {Container} from "@chakra-ui/layout";

const Banner = (props: PartProps) => {

    const {part, data, meta, common} = props

    return (
        <>
            <Box backgroundColor={"gray.100"}>
                <Image src={data.get?.imageUrl}
                       alt={data.get?.displayName}
                       title={data.get?.data.caption || data.get?.displayName}
                       w={"100%"} objectFit={"cover"}/>
            </Box>
            <Container maxW={"container.lg"} my={5}>
                <Accordion allowToggle>
                    <AccordionItem>
                        <AccordionButton backgroundColor={"orange.50"}>
                            <Box flex='1' textAlign='left'>
                                props
                            </Box>
                            <AccordionIcon/>
                        </AccordionButton>
                        <AccordionPanel>
                            <DataDump label={"part-data"} data={part}/>
                            <DataDump label={"data"} data={data}/>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Container>
        </>
    );
};

export default Banner;
