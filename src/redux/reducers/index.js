import { combineReducers } from 'redux';
import settingsReducer from './SettingsReducer';

export default combineReducers({
  settings: settingsReducer
});
