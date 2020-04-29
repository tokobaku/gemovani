import * as React from 'react';
import {
    Switch,
    Route,
    BrowserRouter as Router
} from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import Homepage from 'Route/Homepage';

export type ComponentType = React.ComponentType<RouteComponentProps> | React.ComponentType | React.ReactNode;

export interface CommonPageComponent {
    component: ComponentType;
    sortOrder: number;
    excludeWhen?: RegExp;
}

export default class AppRouter extends React.PureComponent {
    renderBeforePage: CommonPageComponent[] = [];

    renderAfterPage: CommonPageComponent[] = [
        // TODO: add footer here
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
                <Route path="/journey">
                    <h1>Journey</h1>
                </Route>
            </>
        );
    }

    render(): React.ComponentElement<{}, AppRouter> {
        return (
            <Router>
                {this.renderSortedComponents(this.renderBeforePage)}
                <Switch>
                    {this.renderRoutes()}
                </Switch>
                {this.renderSortedComponents(this.renderAfterPage)}
            </Router>
        );
    }
}
