import React from 'react';
import {Badge, Box, Heading, Image, Link, SimpleGrid, Stack, Text, useColorModeValue as mode,} from '@chakra-ui/react'
import {ExternalLinkIcon} from "@chakra-ui/icons";

const NewsCards = (props: any) => {
    //todo: create typedef for news
    const {news} = props;
    return (
        <SimpleGrid
            columns={{base: 1, md: 2, lg: 3}}
            rowGap={{base: '8', md: '12'}}
            columnGap="8"
        >
            {news && news.map((item: any, key: number) => {
                const date = item.node.data.pubDate;
                const options = {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                }
                const {node} = item;
                const {data} = item.node;
                const imageSrc = data.imageAttachment.imageUrl;
                // @ts-ignore
                const localeDate = new Date(date).toLocaleDateString('de-DE', options);
                return (
                    <Box
                        key={key}
                        p="6"
                        bg="bg-surface"
                        boxShadow={mode('lg', 'lg-dark')}
                        _groupHover={{boxShadow: mode('xl', 'xl-dark')}}
                        transition="all 0.2s"
                        height="full"
                    >
                        <Stack spacing={{base: '8', lg: '16'}} justify="space-between" height="full">
                            <Stack spacing="4">
                                <Box overflow="hidden">
                                    <Image
                                        src={imageSrc}
                                        alt={node.displayName}
                                        width="full"
                                        height="15rem"
                                        objectFit="cover"
                                    />
                                </Box>
                                <Stack spacing="0">
                                    <Text fontSize="sm" color="muted">{localeDate}</Text>
                                    <Box>
                                        <Badge fontWeight="semibold" color={mode("accent.900" ,"accent.100")}>
                                            {data.source}
                                        </Badge>
                                    </Box>
                                </Stack>
                                <Stack spacing="3">
                                    <Heading size="md">{node.displayName}</Heading>
                                    <Text color="muted">{data.description}</Text>
                                    <Link href={data.link} isExternal mt={5} verticalAlign={"middle"}>
                                        vollständigen Artikel lesen <ExternalLinkIcon/>
                                    </Link>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Box>
                )
            })}
        </SimpleGrid>
    );
}

export default NewsCards;
