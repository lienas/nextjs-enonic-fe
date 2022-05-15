import {getUrl} from "../_enonicAdapter/utils";
import {isArray} from "@chakra-ui/utils";

export const parseUrl = (path: string): string => {
    const strippedPath = path.split("/").slice(2).join("/");
    return getUrl(strippedPath);
}


interface CursorInput {
    pageIndex: string | number | string[],
    pageSize: number
}

export const calculateCursor = (props: CursorInput) => {

    let {pageIndex, pageSize} = props;
    //console.log("[helper] pageIndex = %s, pageSize= %s  ", pageIndex, pageSize);

    // let pageIndex = context?.query?.page;
    // let pageSize = config?.first || 25;

    if (pageIndex && Array.isArray(pageIndex)) {
        pageIndex = parseInt(pageIndex[0]);
    } else if (pageIndex && typeof (pageIndex) == "string") {
        pageIndex = parseInt(pageIndex)
    } else {
        pageIndex = 1
    }

    let offset = (pageIndex - 1) * pageSize;
    if (pageIndex !== 1) offset -= 1;
    let buff = new Buffer(offset.toString());
    let base64data

    //console.log("[helper] pageIndex = %s, pageSize= %s , offset = %s ", pageIndex, pageSize, offset);

    pageIndex === 1 ?
        base64data = undefined :
        base64data = buff.toString('base64');

    return base64data;
}

export const parseString = (prop: string | string[] | undefined): string | undefined => {

    let parsedString;
    if (isArray(prop)) {
        parsedString = prop[0]
    } else
    {
        parsedString = prop
    }

    return parsedString
}
