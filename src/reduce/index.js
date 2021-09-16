export  const initialState = {
    time: '',
    chinadata:{
        chinaAdd:{confirm:0},
        chinaTotal:{nowConfirm:0}
    },
    highrisk:{},
    currentApi:{}
};

export const reducer = (state,action)=>{
    switch (action.type) {
        case 'updatetime':
            return {
                ...state,
                time:action.time
            }
        case 'updatechinadata':
            return {
                ...state,
                chinadata: action.chinadata
            }
        case 'updatehighrisk':
            return {
                ...state,
                highrisk: action.highrisk
            }
        case 'getCurrentApi':
            return {
                ...state,
                currentApi: action.currentApi
            }
        default:
            break;
    }
}