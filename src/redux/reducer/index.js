import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { createArrayReducer, createPageReducer } from '../modules';

const reducers = combineReducers({
  form: formReducer,
  originalTodoList: createArrayReducer('originalTodoList'),
  todoList: createArrayReducer('todoList'),
  filter: createPageReducer('filter'),
});

export default reducers;