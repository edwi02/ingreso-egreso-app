import { createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from './ui.actions';

export interface State {
    isLoagind: boolean;
}

export const initialState: State = {
   isLoagind: false,
};

const _uiReducer = createReducer(initialState,

    on( isLoading,   state => ({ ...state, isLoagind: true  })),
    on( stopLoading, state => ({ ...state, isLoagind: false })),

);

export function uiReducer(state, action): any {
    return _uiReducer(state, action);
}
