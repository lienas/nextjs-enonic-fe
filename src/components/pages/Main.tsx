import React from "react"
import { PageProps } from "../../_enonicAdapter/views/BasePage";
import RegionsView from '../../_enonicAdapter/views/Region';
import PropsView from "../views/Props";

const MainPage = (props: PageProps) => {
    const page = props.page;
    if (!page.regions || !Object.keys(page.regions).length) {
        page.regions = {
            main: {
                name: 'main',
                components: [],
            }
        }
    }
    return (
        <>
            <RegionsView {...props} name="main"/>
            <PropsView {...props}/>
        </>
    );
};

export default MainPage;
