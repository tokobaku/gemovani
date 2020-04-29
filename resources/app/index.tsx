/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppRouter from 'Route/index';
import { Provider } from 'react-redux';
import store from 'Store/index';
import 'Style/style';

ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>,
    document.getElementById('root')
);
