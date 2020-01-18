import { combineReducers } from 'redux';
import settingsReducer from './SettingsReducer';
import questionsReducer from './QuestionsReducer';

export default combineReducers({
  settings: settingsReducer,
  questions: questionsReducer
});
