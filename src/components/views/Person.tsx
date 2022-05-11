import React from "react"
import {FetchContentResult} from '../../_enonicAdapter/guillotine/fetchContent';
import {getUrl} from '../../_enonicAdapter/utils'
import NextLink from 'next/link';
import {Link} from "@chakra-ui/react";

const Person = (props: FetchContentResult) => {
    const {displayName, data, parent} = props.data?.get as any;
    const {bio, photos} = data;
    const {_path} = parent;

    return (
        <>
            <div>
                <h2>{displayName}</h2>
                <p>{bio}</p>
                {
                    photos.map((photo: any, i: number) => (
                        <img key={i}
                             src={photo.imageUrl}
                             title={
                                 (photo.attachments || [])[0].name ||
                                 displayName
                             }
                             width="500"
                        />
                    ))
                }
            </div>
            <p>
                <NextLink href={getUrl(_path)} passHref>
                    <Link>Back to Persons</Link>
                </NextLink>
            </p>
        </>
    )
}

export default Person;
