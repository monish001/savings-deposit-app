// ./react-redux-client/src/reducers/profileReducer.js
const INITIAL_STATE = {
    email: null,
}
const profileReducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return currentState;
    }
}
export default profileReducer;