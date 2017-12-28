import { connect } from 'react-redux';

import { reduxForm, reset, formValueSelector } from 'redux-form';

import { actionForList } from './redux/modules';
import Notification from './shared/components/notification';

import TodoListComponent from './todo-list-component';

const { set: setTodoList, change: changeTodoList } = actionForList('todoList', '')

const onSubmit = (value, dispatch, props) => {
  if (value.id) {
    console.log(value)
    if (!value.editContent[value.id]) {
      Notification.error('할 일을 입력해주세요');
      return;
    } else {
      const formData = {
        content: value.editContent[value.id],
        important: value.editImportant[value.id],
        createdAt: new Date(),
      };
      dispatch(changeTodoList(value.id, formData));
      Notification.success('할 일이 수정되었습니다');
    }
  } else {
    if (!value.content) {
      Notification.error('할 일을 입력해주세요');
      return;
    } else {
      const formData = {
        id: props.items.length + 1,
        content: value.content,
        important: value.important ? value.important : '3',
        done: false,
        createdAt: new Date(),
      };
      props.items.push(formData);
      dispatch(setTodoList(props.items));
      dispatch(reset('TODO_LIST'));
      Notification.success('할 일이 추가되었습니다');
    }
  }
}

const reduxFormComponent = reduxForm({
  form: 'TODO_LIST',
  onSubmit,
})(TodoListComponent);

const selector = formValueSelector('TODO_LIST');

const mapStateToProps = state => ({
  items: state.todoList,
  filter: state.filter,
  val: selector(state, 'id', 'editContent')
});

const mapDispatchToProps = dispatch => ({
  changeTodoList: (item, checked, that) => {
    dispatch(changeTodoList(item.id, Object.assign(item, { done: checked })));
    that.setState({ items: that.props.items });
  },
  setTodoList: (items) => dispatch(setTodoList(items)),
});

const TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxFormComponent);

export default TodoListContainer;
