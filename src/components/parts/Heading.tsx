import React from "react"
import {APP_NAME} from "../../_enonicAdapter/utils";
import {PartData} from '../../_enonicAdapter/guillotine/getMetaData';
import {Heading} from "@chakra-ui/react";

// fully qualified XP part name:
export const HEADING_PART_NAME = `${APP_NAME}:heading`;

export interface HeadingData {
    part: PartData;
    common: any;
}

const HeadingView = ({part, common}: HeadingData) => (
    <>
        <Heading color={"orange.500"} py={5}>{part?.config?.heading || common?.displayName}</Heading>
        <Heading as={"h3"}>Header h3</Heading>
    </>
);

export default HeadingView;
