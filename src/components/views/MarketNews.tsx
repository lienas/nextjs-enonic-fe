import {FetchContentResult} from "../../_enonicAdapter/guillotine/fetchContent";
import {getUrl, RENDER_MODE} from "../../_enonicAdapter/utils";
import {Box, Flex, Heading, Image, Link} from "@chakra-ui/react";
import {ExternalLinkIcon} from "@chakra-ui/icons";
import PropsView from "./Props";
import NextLink from "next/link";
import {Container} from "@chakra-ui/layout";
import {RichTextProcessor} from "../../_enonicAdapter/RichTextProcessor";
import React from "react";

const MarketNews = (props: FetchContentResult) => {
    //console.log("props.data for marketnews %s", props.data);
    const {displayName, data, parent} = props.data?.get as any;
    //console.log("data for marketnews %s", data);
    const {content, pubDate, imageAttachment, image, link} = data;

    const {_path} = parent;
    const parentUrl = getUrl(_path);
    const renderMode = props.meta?.renderMode ? props.meta?.renderMode : RENDER_MODE.NEXT;

    return (
        <Container maxW={"container.lg"} my={5}>
            <Box>{pubDate}</Box>
            <Heading>{displayName}</Heading>
            {/*todo: responsive adjustments*/}
            <Flex my={5} columnGap={5}>
                <Box minW={300}>
                    <Image src={imageAttachment.imageUrl} alt={image} title={displayName}/>
                </Box>
                <Box>
                    <section dangerouslySetInnerHTML={{__html: RichTextProcessor.process(content, renderMode)}}/>
                    <Box mt={5}>
                        <Link href={link} isExternal mt={5} verticalAlign={"middle"}>
                            vollständigen Artikel lesen <ExternalLinkIcon/>
                        </Link>
                    </Box>
                </Box>
            </Flex>
            <NextLink href={parentUrl} passHref>
                <Link color={"orange"}>zur Übersicht</Link>
            </NextLink>
            <PropsView {...props}/>
        </Container>
    )
}

export default MarketNews
