import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createForms} from 'react-redux-form';
import { Comments } from './comments';
import { TeacherRegs } from './teacherRegs';
import { StudentRegs } from './studentReg';
import {Profiles} from './profile';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';

import {Auth} from './auth';

export const ConfigureStore = () => {
    const store = createStore(
            combineReducers({
                comments: Comments,
                teacherRegs: TeacherRegs,
                studentRegs: StudentRegs,
                profiles: Profiles,
                auth: Auth,
                ...createForms({
                    feedback: InitialFeedback
                })
            }),
            applyMiddleware(thunk)
    );

    return store;
}