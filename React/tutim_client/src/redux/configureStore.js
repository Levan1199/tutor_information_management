import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createForms} from 'react-redux-form';
import { Dishes } from './dishes'
import { Comments } from './comments'
import { Promotions } from './promotions'
import { Leaders } from './leaders'
import { Teachers } from './teachers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { InitialFeedback } from './forms';

import {Auth} from './auth';
import {favorites} from './favorites';

export const ConfigureStore = () => {
    const store = createStore(
            combineReducers({
                dishes: Dishes,
                comments: Comments,
                promotions: Promotions,
                leaders: Leaders,
                teachers: Teachers,
                auth: Auth,
                favorites,
                ...createForms({
                    feedback: InitialFeedback
                })
            }),
            applyMiddleware(thunk, logger)
    );

    return store;
}