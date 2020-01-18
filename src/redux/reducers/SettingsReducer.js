import { SET_QUESTION_COUNT, SET_DIFFICULTY, SET_CATEGORY } from '../types';

const DEFAULT_GAME_SETTINGS = {
    numberOfQuestions: 25,
    difficulty: "Easy",
    category: "All"
};

export default (state = DEFAULT_GAME_SETTINGS, action) => {
    switch (action.type) {
        case SET_QUESTION_COUNT:
            return { ...state, numberOfQuestions: action.payload };
        case SET_DIFFICULTY:
            return { ...state, difficulty: action.payload };
        case SET_CATEGORY:
            return {...state, category: action.payload };
        default:
            return state;
    }
};
