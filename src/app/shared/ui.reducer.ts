import { createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from './ui.actions';

export interface State {
    isLoagind: boolean;
}

export const initialState: State = {
   isLoagind: false,
};

const _counterReducer = createReducer(initialState,

    on( isLoading,   state => ({ ...state, isLoagind: true  })),
    on( stopLoading, state => ({ ...state, isLoagind: false })),

);

export function counterReducer(state, action) {
    return _counterReducer(state, action);
}