import type {AppProps} from 'next/app'
import React from 'react';
import {getUrl, RENDER_MODE, XP_REQUEST_TYPE} from "../_enonicAdapter/utils";
import Header from "../components/views/Header";
import Footer from "../components/views/Footer";
import {ChakraProvider} from "@chakra-ui/react";
import {Container} from "@chakra-ui/layout";
import PropsView from "../components/views/Props";
import '../styles/globals.css';
import MainNavigation from "../components/ui/MainNavigation";

/**
 * Wraps all rendered components
 * @param Component Usually triggering [[...contentPath]].tsx, this component is BasePage.tsx
 * @param pageProps {{common, data, meta, error}}
 */
function MyApp({Component, pageProps}: AppProps) {

    // Component rendering - for component updates in Content Studio without reloading page
    if (pageProps.meta) {
        const meta = pageProps.meta;
        if (meta.requestType === XP_REQUEST_TYPE.COMPONENT) {
            return <details data-single-component-output="true"><Component {...pageProps} /></details>;
        } else if (!meta.canRender
                   || (meta.catchAll && meta.renderMode === RENDER_MODE.EDIT)) {
            // return empty page, status is set in [[...contentPath.tsx]]
            return null;
        }
    }
    const common = pageProps.common;
    console.log("Common Props %s", common);
    /*return <Component {...pageProps} />;*/
    return (
        <ChakraProvider>
            <Header
                title="🔥 Next.XP"
                logoUrl={getUrl('images/xp-shield.svg')}/>
            <Container maxW={"container.lg"}>
                <MainNavigation {...common}/>
                <Component {...pageProps} />
                <PropsView {...pageProps}/>
            </Container>
            <Footer/>
        </ChakraProvider>
    );

}

export default MyApp
