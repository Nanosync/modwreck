import { SET_QUESTION_COUNT, SET_DIFFICULTY, SET_CATEGORY } from '../types';

export const setNumberOfQuestions = (numQuestions) => ({
    type: SET_QUESTION_COUNT,
    payload: numQuestions
});

export const setDifficulty = (difficulty) => ({
    type: SET_DIFFICULTY,
    payload: difficulty
});

export const setCategory = (category) => ({
    type: SET_CATEGORY,
    payload: category
});
