import update from 'immutability-helper';

/**
 * 일반적인 RESTful API에 대응하는 action, reducer를 생성
 *
 * 모델에 대한 샘플
 * - 리스트 조회 데이터형태
 *   results + page
 * - 상세 조회 데이터형태
 *   object
 *
 * Constant
 *
 * Action
 *
 * state 관련
 * - set: store에 저장
 * - add: store에 추가
 * - add_only: 없을때만 추가 (머지랑 비슷하나 있는걸 수정하지 않음)
 * - change: store에 있는거 수정
 * - remove: store에서 제거
 * - merge: 없으면 추가 있으면 수정
 * - load: 서버에서 조회
 * - create: 서버에 추가
 * - update: 서버에 업데이트
 * - destroy: 서버에서 삭제
 *
 * Reducer
 *
 *
 */

// Constants
export const SET_ACTION_CODE = 'SET';
export const ADD_ACTION_CODE = 'ADD';
export const ADD_ONLY_ACTION_CODE = 'ADD_ONLY';
export const MERGE_ACTION_CODE = 'MERGE';
export const CHANGE_ACTION_CODE = 'CHANGE';
export const REMOVE_ACTION_CODE = 'REMOVE';
export const LOAD_ACTION_CODE = 'LOAD';
export const CREATE_ACTION_CODE = 'CREATE';
export const UPDATE_ACTION_CODE = 'UPDATE';
export const DESTROY_ACTION_CODE = 'DESTROY';
export const API_CALL_REQUEST_STATUS_CODE = 'REQUEST';
export const API_CALL_SUCCESS_STATUS_CODE = 'SUCCESS';
export const API_CALL_FAILURE_STATUS_CODE = 'FAILURE';
export const API_CALL_COMPLETE_STATUS_CODE = 'COMPLETE';

// 상세 모델에 관한 action 생성기
const actionFor = (_model, _endpoint, _options = {idKey: ''}) => {
  const model = _model;
  const endpoint = _endpoint || `/${model}s`;
  const idKey = _options.idKey || 'id';
  
  return {
    set: data => ({
      type: `${model}/${SET_ACTION_CODE}`,
      payload: { data },
    }),
    change: data => ({
      type: `${model}/${CHANGE_ACTION_CODE}`,
      payload: { data },
    }),
    remove: id => ({
      type: `${model}/${REMOVE_ACTION_CODE}`,
      payload: { id },
    })
  };
};

// 리스트 모델에 관한 action 생성기
const actionForList = (_model, _endpoint, _options = {idKey: '', idsKey: []}) => {
  const model = _model;
  const endpoint = _endpoint;
  const idKey = _options.idKey || 'id';
  const idsKey = _options.idsKey || 'ids';
  
  return {
    set: data => ({
      type: `${model}/${SET_ACTION_CODE}`,
      payload: { data },
    }),
    add: data => ({
      type: `${model}/${ADD_ACTION_CODE}`,
      payload: { data },
    }),
    addOnly: data => ({
      type: `${model}/${ADD_ONLY_ACTION_CODE}`,
      payload: { data },
    }),
    merge: data => ({
      type: `${model}/${MERGE_ACTION_CODE}`,
      payload: { data },
    }),
    change: (id, data) => ({
      type: `${model}/${CHANGE_ACTION_CODE}`,
      payload: { id, data },
    }),
    remove: id => ({
      type: `${model}/${REMOVE_ACTION_CODE}`,
      payload: { id },
    })
  };
};

// 페이징 형식의 리스트 모델에 대한 리듀서 - ex) bookings
const createPageReducer = (model, _options = {idKey: ''}) => (state = {data: []}, action) => {
  const idKey = _options.idKey || 'id';

  switch (action.type) {
    case `${model}/SET`: {
      const { data } = action.payload;
      return data;
    }
    case `${model}/MERGE`: {
      const { data } = action.payload;
      return update(state, { $merge: data });
    }
    case `${model}/CHANGE`: {
      const { id, data } = action.payload;
      const idx = state.data.findIndex(s => s[idKey] === id);
      if (idx < 0) {
        return state;
      }

      return update(state, {
        data: { [idx]: { $merge: data } },
      });
    }
    default:
      return state;
  }
};

// 일반 배열 형식의 리스트 모델에 대한 리듀서 - ex) places
const createArrayReducer = (model, _options = {idKey: ''}) => (state = [], action) => {
  const idKey = _options.idKey || 'id';

  switch (action.type) {
    case `${model}/${SET_ACTION_CODE}`: {
      const { data } = action.payload;
      return data;
    }
    case `${model}/${ADD_ACTION_CODE}`: {
      const { data } = action.payload;
      return [
        ...state,
        data,
      ];
    }
    case `${model}/${MERGE_ACTION_CODE}`: {
      const { data } = action.payload;

      let ret = state;

      // 수정 또는 추가
      data.forEach((item) => {
        if (state.findIndex(s => s[idKey] == item[idKey]) > -1) { // update
          const idx = state.findIndex(s => s[idKey] == item[idKey]);
          ret = update(ret, { [idx]: { $set: item } });
        } else { // add
          ret = [...ret, item];
        }
      });

      return ret;
    }
    case `${model}/${ADD_ONLY_ACTION_CODE}`: {
      const { data } = action.payload;

      let ret = state;

      // 수정 또는 추가
      data.forEach((item) => {
        if (state.findIndex(s => s[idKey] == item[idKey]) == -1) { // not exist
          ret = [...ret, item];
        }
      });

      return ret;
    }
    case `${model}/${CHANGE_ACTION_CODE}`: {
      const { id, data } = action.payload;
      const idx = state.findIndex(s => s[idKey] === id);
      if (idx < 0) {
        return state;
      }

      return update(state, { [idx]: { $merge: data } });
    }
    case `${model}/${REMOVE_ACTION_CODE}`: {
      const { id } = action.payload;
      const idx = state.findIndex(s => s[idKey] === id);
      if (idx < 0) {
        return state;
      }

      return update(state, { $splice: [[idx, 1]] });
    }
    default:
      return state;
  }
};

export {
  actionFor,
  actionForList,
  createPageReducer,
  createArrayReducer,
};