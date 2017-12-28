import React from 'react';
import PropTypes from 'prop-types';
import { Grid, AppBar, Toolbar, Button, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox } from 'material-ui';
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';
import { Field } from 'redux-form';
import moment from 'moment';

import FormGroupInput from './shared/components/redux-form/form-group-input';

const DragHandle = SortableHandle(() => <div style={{ width: 32, height: '100%', backgroundColor: '#E0E0E0' }}></div>);

const renderImportant = (important) => {
  switch (important) {
    case '1':
      return '매우 중요'
      break;
    case '2':
      return '중요'
      break;
    default:
      return '보통'
      break;
  }
}

const SortableItem = SortableElement(({index, item, that}) => {
  if (that.state.edit[item.id]) {
    return (
      <ListItem
        dense
        disableGutters
        style={{ backgroundColor: 'white', boxShadow: '0px 0px 3px 1px rgba(0, 0, 0, 0.2)' }}
      >
        <Checkbox
          checked={item.done}
          onChange={(e) => that.props.changeTodoList(item, e.target.checked, that)}
          tabIndex={-1}
          disableRipple
          style={{width: 40}}
        />
          <Grid container spacing={0} style={{ width: '100%' }}>
            <Grid item xs={12}>
              중요도: <Field name={`editImportant[${item.id}]`} component="select" style={{ margin: '0 5px', width: 60 }}>
                <option value={1}>매우 중요</option>
                <option value={2}>중요</option>
                <option value={3}>보통</option>
              </Field>
            </Grid>
            <Grid item xs={12} style={{ display: 'flex' }}>
              <div style={{ flex: 1, width: '100%', padding: '0 2px', margin: '0 3px', border: '1px solid #E0E0E0'}}>
                <Field name={`editContent[${item.id}]`} placeholder="할 일을 입력하세요." component={FormGroupInput} />
                <Field name="id" type="hidden" value={item.id} component="input" />
              </div>
              { that.props.val.editContent[item.id] ? 
                <Button
                  type="submit"
                  style={{ minWidth: 10, minHeight: 10, padding: '4px 8px', backgroundColor: '#FF5722', color: 'white' }}
                  onClick={() => setTimeout(() => that.setState({ edit: {} }), 200)}
                >
                  수정
                </Button>
                :
                <Button
                  type="button"
                  style={{ minWidth: 10, minHeight: 10, padding: '4px 8px', backgroundColor: '#FF5722', color: 'white' }}
                  onClick={() => that.setState({ edit: {} })}
                >
                  취소
                </Button>
              }
            </Grid>
          </Grid>
        <ListItemSecondaryAction style={{ top: 0, right: 0, height: '100%', marginTop: 0 }}>
          <DragHandle />
        </ListItemSecondaryAction>
      </ListItem>
    )
  } else {
    return (
      <ListItem
        dense
        disableGutters
        style={{ backgroundColor: 'white', boxShadow: '0px 0px 3px 1px rgba(0, 0, 0, 0.2)' }}
      >
        <Checkbox
          checked={item.done}
          onChange={(e) => that.props.changeTodoList(item, e.target.checked, that)}
          tabIndex={-1}
          disableRipple
          style={{width: 40}}
        />
        <ListItemText
          disableTypography
          primary={<div style={{ color: 'gray', fontSize: '0.7rem' }}>
            <div>중요도: {renderImportant(item.important)}</div>
            <div>추가일: {moment(item.createdAt).format('YYYY-MM-DD')}</div>
          </div>} 
          secondary={<div style={{ textDecoration: item.done ? 'line-through' : 'none' }}>{item.content}</div>}
          onClick={() => {
            that.props.change('id', item.id);
            that.props.change(`editContent[${item.id}]`, item.content);
            that.props.change(`editImportant[${item.id}]`, item.important);
            that.setState({ edit: { [item.id]: true } })
          }}
        />
        <ListItemSecondaryAction style={{ top: 0, right: 0, height: '100%', marginTop: 0 }}>
          <DragHandle />
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
});

const SortableList = SortableContainer(({items, that}) => {
  return (
    <List style={{ padding: 0 }}>
      {items && items.map((item, index) => (
        <SortableItem key={`item-${index}`} index={index} item={item} that={that} />
      ))}
    </List>
  );
});

class TodoListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
      edit: {},
    };
    this.onSortEnd = this.onSortEnd.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.items
    })
  }
  handleChange(target, value) {
    this.setState({
      [target]: value,
    })
  }
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
    this.props.setTodoList(this.state.items);
  }
  render() {
    const { handleSubmit, items, change } = this.props;
    return (
      <form onSubmit={handleSubmit} noValidate>
        <AppBar position="fixed" color="default">
          <Toolbar style={{ backgroundColor: 'white', height: 40, minHeight: 40, display: 'flex', justifyContent: 'space-between' }} disableGutters>
            <Field name="important" component="select" style={{ margin: '0 5px', width: 60 }}>
              <option value={0}>중요도</option>
              <option value={1}>매우 중요</option>
              <option value={2}>중요</option>
              <option value={3}>보통</option>
            </Field>
            <Field name="content" placeholder="할 일을 입력하세요." component={FormGroupInput} onFocus={() => {
              change('id', null);
              this.setState({ edit: {} });
            }} />
            <Button
              type="submit"
              style={{ width: 80, minWidth: 80, height: 40, backgroundColor: '#FF5722', color: 'white' }}
              onClick={() => setTimeout(() => this.setState({ items }), 300)}
            >
              추가
            </Button>
          </Toolbar>
        </AppBar>
        <SortableList items={this.state.items} onSortEnd={this.onSortEnd} useDragHandle that={this} />
      </form>
    )
  }
}

TodoListComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  val: PropTypes.object.isRequired,
};

export default TodoListComponent;
