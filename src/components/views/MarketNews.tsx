import {FetchContentResult} from "../../_enonicAdapter/guillotine/fetchContent";
import {getUrl, RENDER_MODE} from "../../_enonicAdapter/utils";
import {Box, Button, Flex, Heading, Image, Link} from "@chakra-ui/react";
import {ExternalLinkIcon} from "@chakra-ui/icons";
import PropsView from "../ui/debug/Props";
import NextLink from "next/link";
import {Container} from "@chakra-ui/layout";
import {RichTextProcessor} from "../../_enonicAdapter/RichTextProcessor";
import {useRouter} from "next/router";

const MarketNews = (props: FetchContentResult) => {
    const {displayName, data, parent} = props.data?.get as any;
    const {content, pubDate, imageAttachment, image, link, source} = data;

    const {_path} = parent;
    const parentUrl = getUrl(_path);
    const renderMode = props.meta?.renderMode ? props.meta?.renderMode : RENDER_MODE.LIVE;
    const router = useRouter();

    const imageWidth = imageAttachment.xAsJson.media.imageInfo.imageWidth;
    //console.log("imageWidth = %s", imageWidth);


    return (
        <Container maxW={"container.lg"} my={5}>
            <Box>{pubDate} - {source}</Box>
            <Heading>{displayName}</Heading>
            {/*todo: responsive adjustments*/}
            <Flex my={5} columnGap={5}>
                <Box minW={imageWidth < 300 ? 150 : 300}>
                    {
                        imageWidth < 300 ?
                            <Image  src={imageAttachment.imageUrl_s} alt={image} title={displayName}/> :
                            <Image  src={imageAttachment.imageUrl_m} alt={image} title={displayName}/>
                    }
                </Box>
                <Box>
                    <Box dangerouslySetInnerHTML={{__html: RichTextProcessor.process(content, renderMode)}}/>
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
            <Button ml={5} variant={"link"} onClick={() => router.back()}> zurück</Button>
            <PropsView {...props}/>
        </Container>
    )
}

export default MarketNews
