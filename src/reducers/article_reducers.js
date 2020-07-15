export default function(state={},action){
    switch(action.type){
        case 'GET_ARTICLES':
            return {...state,posts:action.payload};
        default:
            return state;
    }
}