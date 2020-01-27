import { SET_QUESTION_COUNT, SET_TIME, SET_CATEGORY } from '../types';

const DEFAULT_GAME_SETTINGS = {
    numberOfQuestions: 10,
    time: "1",
    category: "All"
};

export default (state = DEFAULT_GAME_SETTINGS, action) => {
    switch (action.type) {
        case SET_QUESTION_COUNT:
            return { ...state, numberOfQuestions: action.payload };
        case SET_TIME:
            return { ...state, time: action.payload };
        case SET_CATEGORY:
            return {...state, category: action.payload };
        default:
            return state;
    }
};
