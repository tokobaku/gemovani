import * as React from 'react';
import {
    Switch,
    Route,
    BrowserRouter as Router,
    Link
} from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import Homepage from 'Component/Homepage';

export type ExcludePathPredicate = (path: string) => boolean;
export type ComponentType = React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any> | React.ReactNode;

export interface CommonPageComponent {
    component: ComponentType;
    sortOrder: number;
    excludeWhen?: RegExp;
}

export default class AppRouter extends React.PureComponent {
    renderBeforePage: CommonPageComponent[] = [
        {
            component: (
                <ul key={0}>
                    <li key={0}>
                        <Link to="/">Home</Link>
                    </li>
                    <li key={1}>
                        <Link to="/about">About</Link>
                    </li>
                    <li key={2}>
                        <Link to="/journey">Journey</Link>
                    </li>
                </ul>
            ),
            sortOrder: 0
        }
    ];

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
