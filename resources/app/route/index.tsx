import * as React from 'react';
import {
    Switch,
    Route,
    BrowserRouter as Router
} from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import Homepage from 'Route/Homepage';
import ScrollToSection from 'Component/ScrollToSection';
import Header from 'Component/Header';
import TourPage from 'Route/TourPage';
import GalleriesPage from 'Route/GalleriesPage';
import GalleryPage from 'Route/GalleryPage';
import FaqPage from 'Route/FaqPage';
import VillagesPage from 'Route/VillagesPage';
import VillagePage from 'Route/VillagePage';
import AboutUsPage from 'Route/AboutUsPage';
import ContactPopup from 'Component/ContactPopup';
import NotificationList from 'Component/NotificationList';
import Footer from 'Component/Footer';

export type ComponentType = React.ComponentType<RouteComponentProps> | React.ComponentType | React.ReactNode;

export interface CommonPageComponent {
    component: ComponentType;
    sortOrder: number;
    excludeWhen?: RegExp;
}

export default class AppRouter extends React.PureComponent {
    renderBeforePage: CommonPageComponent[] = [
        {
            component: <Header />,
            sortOrder: 0
        },
        {
            component: <ContactPopup />,
            sortOrder: 10
        },
        {
            component: <NotificationList />,
            sortOrder: 20
        }
    ];

    renderAfterPage: CommonPageComponent[] = [
        {
            component: <Footer />,
            sortOrder: 0
        }
    ];

    renderSortedComponents(componentsToRender: CommonPageComponent[]): ComponentType[] {
        const sortedComponents = componentsToRender.sort(
            (left, right) => (left.sortOrder < right.sortOrder ? 1 : 0)
        );

        return sortedComponents.filter(
            (component) => (component.excludeWhen ? component.excludeWhen.test(location.pathname) : true)
        ).map(({ component }) => component);
    }

    renderRoutes(): React.ComponentElement<{}, AppRouter> {
        return (
            <>
                <Route path="/" exact component={Homepage} />
                <Route path="/about">
                    <h1>About!</h1>
                </Route>
                <Route path="/tour/:urlKey" component={TourPage} />
                <Route path="/gallery/:urlKey" component={GalleryPage} />
                <Route path="/galleries" component={GalleriesPage} />
                <Route path="/faq" component={FaqPage} />
                <Route path="/villages" component={VillagesPage} />
                <Route path="/village/:urlKey" component={VillagePage} />
                <Route path="/about-us" component={AboutUsPage} />
            </>
        );
    }

    render(): React.ComponentElement<{}, AppRouter> {
        return (
            <Router>
                <ScrollToSection />
                {this.renderSortedComponents(this.renderBeforePage)}
                <Switch>
                    {this.renderRoutes()}
                </Switch>
                {this.renderSortedComponents(this.renderAfterPage)}
            </Router>
        );
    }
}
