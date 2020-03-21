import reducer from './auth';
import * as actionTypes from '../actions/actionTasks';

describe('auth reducer', () => {
    it('should return Init state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authUrl: '/'
        });
    });

    it('should store the token upon Login In', () => {
        expect(reducer({
           token: null,
           userId: null,
           error: null,
           loading: false,
           authUrl: '/'
       }, {
           type: actionTypes.AUTH_SUCCESS,
           token: 'some-token',
           userId: 'userId'
       })).toEqual({
           token: 'some-token',
           userId: 'userId',
           error: null,
           loading: false,
           authUrl: '/'
       })
    })
});