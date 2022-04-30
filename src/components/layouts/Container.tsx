import React from 'react';
import {RegionView} from '../../_enonicAdapter/views/Region';
import {LayoutProps} from '../../_enonicAdapter/views/BaseLayout';
import {Container as ChakraContainer} from '@chakra-ui/layout'

const Container = (props: LayoutProps) => {
    const regions = props.layout.regions;
    const {common, meta} = props;
    return (
        <ChakraContainer maxW={"container.lg"} alignContent={"center"}>
            <RegionView
                name="main"
                components={regions['main']?.components}
                common={common}
                meta={meta}/>
        </ChakraContainer>
    );
};

export default Container;
