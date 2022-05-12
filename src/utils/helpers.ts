import {getUrl} from "../_enonicAdapter/utils";

export const parseUrl = (path: string): string => {
    const strippedPath = path.split("/").slice(2).join("/");
    return getUrl(strippedPath);
}
