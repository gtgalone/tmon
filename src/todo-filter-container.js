import { connect } from 'react-redux';

import { actionFor, actionForList } from './redux/modules';

import TodoFilterComponent from './todo-filter-component';

const { set: setFilter } = actionFor('filter', '');
const { set: setTodoList } = actionForList('todoList', '');

const mapStateToProps = state => ({
  filter: state.filter,
  originalTodoList: state.originalTodoList,
});

const mapDispatchToProps = dispatch => ({
  setFilter: (data, filter, stateProps) => {
    const renderFilter = (filter) => {
      if (filter.done) {
        if (filter.important) {
          return stateProps.originalTodoList;
        } else if (filter.high && filter.mid) {
          return stateProps.originalTodoList.filter(v => v.important !== '1');
        } else if (filter.veryhigh && filter.mid) {
          return stateProps.originalTodoList.filter(v => v.important !== '2');
        } else if (filter.veryhigh && filter.high) {
          return stateProps.originalTodoList.filter(v => v.important !== '3');
        } else if (filter.veryhigh) {
          return stateProps.originalTodoList.filter(v => v.important === '1');
        } else if (filter.high) {
          return stateProps.originalTodoList.filter(v => v.important === '2');
        } else if (filter.mid) {
          return stateProps.originalTodoList.filter(v => v.important === '3');
        } else {
          return null
        }
      } else if (filter.complete) {
        if (filter.important) {
          return stateProps.originalTodoList.filter(v => v.done === true);
        } else if (filter.high && filter.mid) {
          return stateProps.originalTodoList.filter(v => v.important !== '1' && v.done === true);
        } else if (filter.veryhigh && filter.mid) {
          return stateProps.originalTodoList.filter(v => v.important !== '2' && v.done === true);
        } else if (filter.veryhigh && filter.high) {
          return stateProps.originalTodoList.filter(v => v.important !== '3' && v.done === true);
        } else if (filter.veryhigh) {
          return stateProps.originalTodoList.filter(v => v.important === '1' && v.done === true);
        } else if (filter.high) {
          return stateProps.originalTodoList.filter(v => v.important === '2' && v.done === true);
        } else if (filter.mid) {
          return stateProps.originalTodoList.filter(v => v.important === '3' && v.done === true);
        } else {
          return null
        }
      } else if (filter.incomplete) {
        if (filter.important) {
          return stateProps.originalTodoList.filter(v => v.done === false);
        } else if (filter.high && filter.mid) {
          return stateProps.originalTodoList.filter(v => v.important !== '1' && v.done === false);
        } else if (filter.veryhigh && filter.mid) {
          return stateProps.originalTodoList.filter(v => v.important !== '2' && v.done === false);
        } else if (filter.veryhigh && filter.high) {
          return stateProps.originalTodoList.filter(v => v.important !== '3' && v.done === false);
        } else if (filter.veryhigh) {
          return stateProps.originalTodoList.filter(v => v.important === '1' && v.done === false);
        } else if (filter.high) {
          return stateProps.originalTodoList.filter(v => v.important === '2' && v.done === false);
        } else if (filter.mid) {
          return stateProps.originalTodoList.filter(v => v.important === '3' && v.done === false);
        } else {
          return null
        }
      } else {
        return null
      }
    }
    dispatch(setFilter(Object.assign(filter, data)));
    console.log(filter)
    dispatch(setTodoList(renderFilter(filter)));
    ;
  }
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  filter: stateProps.filter,
  todoList: stateProps.todoList,
  setFilter: (data, filter) => dispatchProps.setFilter(data, filter, stateProps)
});

const TodoFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(TodoFilterComponent);

export default TodoFilterContainer;
