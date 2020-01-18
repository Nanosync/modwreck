import { SET_QUESTION_COUNT, SET_TIME, SET_CATEGORY } from '../types';
import getQuestionFromSite from '../../apis/question';

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

export const getQuestions = () => async (dispatch) => {
    const response = await getQuestionFromSite();
    dispatch({ type: 'GET_QUESTIONS', payload: response });
};
