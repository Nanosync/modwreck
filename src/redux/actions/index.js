import { SET_QUESTION_COUNT, SET_TIME, SET_CATEGORY } from '../types';

export const setNumberOfQuestions = (numQuestions) => ({
    type: SET_QUESTION_COUNT,
    payload: numQuestions
});

export const setTime = (time) => ({
    type: SET_TIME,
    payload: time
});

export const setCategory = (category) => ({
    type: SET_CATEGORY,
    payload: category
});
