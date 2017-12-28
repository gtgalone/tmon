import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Grid, MuiThemeProvider, createMuiTheme } from 'material-ui';

import TodoFilterContainer from './todo-filter-container';
import TodoListContainer from './todo-list-container';

import configureStore from './redux/store';
import reducer from './redux/reducer';

const data = [
  {
    id: 1,
    important: '1',
    createdAt: '2016-12-17',
    content: '세탁소에서 세탁물 찾아오기',
    done: false
  }, {
    id: 2,
    important: '2',
    createdAt: '2016-12-16',
    content: '두줄인 경우 이렇게 텍스트가 자연스럽게 떨어져야 합니다. 두줄인 경우 이렇게 텍스트가 자연스럽게 떨어져야 합니다. 두줄인 경우 이렇게 텍스트가 자연스럽게 떨어져야 합니다.',
    done: false
  }, {
    id: 3,
    important: '3',
    createdAt: '2016-12-15',
    content: '완료된 할일의 경우 이렇게 line through가 필요합니다.',
    done: true
  }, {
    id: 4,
    important: '1',
    createdAt: '2016-12-17',
    content: '세탁소에서 세탁물 찾아오기',
    done: false
  }, {
    id: 5,
    important: '2',
    createdAt: '2016-12-16',
    content: '두줄인 경우 이렇게 텍스트가 자연스럽게 떨어져야 합니다. 두줄인 경우 이렇게 텍스트가 자연스럽게 떨어져야 합니다. 두줄인 경우 이렇게 텍스트가 자연스럽게 떨어져야 합니다.',
    done: false
  }, {
    id: 6,
    important: '3',
    createdAt: '2016-12-15',
    content: '완료된 할일의 경우 이렇게 line through가 필요합니다.',
    done: true
  }, {
    id: 7,
    important: '1',
    createdAt: '2016-12-17',
    content: '세탁소에서 세탁물 찾아오기',
    done: false
  }, {
    id: 8,
    important: '2',
    createdAt: '2016-12-16',
    content: '두줄인 경우 이렇게 텍스트가 자연스럽게 떨어져야 합니다. 두줄인 경우 이렇게 텍스트가 자연스럽게 떨어져야 합니다. 두줄인 경우 이렇게 텍스트가 자연스럽게 떨어져야 합니다.',
    done: false
  }, {
    id: 9,
    important: '3',
    createdAt: '2016-12-15',
    content: '완료된 할일의 경우 이렇게 line through가 필요합니다.',
    done: true
  }
];

const store = configureStore(reducer, {
  originalTodoList: data,
  todoList: data,
  filter: {
    important: true,
    veryhigh: false,
    high: false,
    mid: false,
    done: true,
    complete: false,
    incomplete: false,
  }
});

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 0,
        minWidth: 10,
      },
    },
    MuiListItemText: {
      root: {
        padding: '0 2px',
        overflow: 'hidden',
        whiteSpace: 'pre-wrap'
      }
    }
  },
});

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <div>
            <Grid container style={{ paddingTop: 40 }}>
              <Grid item xs={12}>
                <TodoFilterContainer />
              </Grid>
              <Grid item xs={12} style={{ padding: 0 }}>
                <TodoListContainer />
              </Grid>
            </Grid>
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
