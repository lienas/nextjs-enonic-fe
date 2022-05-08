import {APP_NAME} from '../_enonicAdapter/utils'
import {ComponentRegistry, CATCH_ALL} from '../_enonicAdapter/ComponentRegistry';
import {commonQuery, commonVariables} from './queries/common';
import PropsView from './views/Props';
import getPerson from "./queries/getPerson";
import Person from "./views/Person";
import MainPage from "./pages/Main";
import ChildList, {childListProcessor, getChildList} from "./parts/ChildList";
import Heading from "./parts/Heading";
import TwoColumnLayout from "./layouts/TwoColumnLayout";
import MovieDetails, {getMovie} from "./parts/MovieDetails";
import MarketNews from "./views/MarketNews";
import getMarketNews from "./queries/getMarketNews";
import Banner from "./parts/Banner";
import {getBannerUrl} from "./queries/banner";
import Container from "./layouts/Container";
import {mainNavigationQuery} from "./queries/navigation";
import getMarketNewsByPath from "./queries/getMarketNewsByPath";
import MarketNewsArchive, {getMarketNewsArchive} from "./parts/MarketNewsArchive";


// You can set common query for all views here
ComponentRegistry.setCommonQuery([mainNavigationQuery, commonVariables]);
//ComponentRegistry.setCommonQuery(mainNavigationQuery);

// Content type mappings
ComponentRegistry.addContentType(`${APP_NAME}:person`, {
    query: getPerson,
    view: Person
});

ComponentRegistry.addContentType(`${APP_NAME}:marketNews`, {
    query: getMarketNews,
    view: MarketNews
})

// Page mappings
ComponentRegistry.addPage(`${APP_NAME}:main`, {
    view: MainPage,
});

// Layout mappings
ComponentRegistry.addLayout(`${APP_NAME}:2-column`, {
    view: TwoColumnLayout
});
ComponentRegistry.addLayout(`${APP_NAME}:container`, {
    view: Container
});


// Part mappings
ComponentRegistry.addPart(`${APP_NAME}:child-list`, {
    query: getChildList,
    processor: childListProcessor,
    view: ChildList
});

ComponentRegistry.addPart(`${APP_NAME}:market-news-archive`, {
    query: getMarketNewsArchive,
    view: MarketNewsArchive
})



ComponentRegistry.addPart(`${APP_NAME}:heading`, {
    view: Heading
})

ComponentRegistry.addPart(`${APP_NAME}:movie-details`, {
    query: getMovie,
    view: MovieDetails
});

ComponentRegistry.addPart(`${APP_NAME}:banner`, {
    view: Banner,
    query: getBannerUrl
});


// Debug
ComponentRegistry.addContentType(CATCH_ALL, {
    view: PropsView
});
