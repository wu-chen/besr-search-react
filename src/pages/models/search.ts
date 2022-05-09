import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import axios from 'axios';
export interface IndexModelState {
  searchContent: string;
  searchState: Boolean;
  searchList: Array<any>;
}

export interface IndexModelType {
  namespace: 'Search';
  state: IndexModelState;
  effects: {
    getSearch: Effect;
  };
  reducers: {
    setSearchContent: Reducer;
    setSearchState: Reducer;
    setSearchList: Reducer;
  };
  subscriptions: { setup: Subscription };
}
async function getList(params: any) {
  console.log(params);
  const result = await axios.post(
    'http://3.141.23.218:5000/interview/keyword_search',
    {
      login_token: 'INTERVIEW_SIMPLY2021',
      search_phrase: params,
    },
  );
  return result.data.data.product_trends;
}
const IndexModel: IndexModelType = {
  namespace: 'Search',
  state: {
    searchContent: '',
    searchState: false,
    searchList: [],
  },

  effects: {
    *getSearch({ payload }, { call, put }) {
      const result = yield call(getList, payload);
      yield put({ type: 'setSearchList', payload: result });
    },
  },
  reducers: {
    // 启用 immer 之后
    setSearchContent(state, action) {
      state.searchContent = action.payload;
      return { ...state };
    },
    setSearchState(state, action) {
      state.searchState = action.payload;
      return { ...state };
    },
    setSearchList(state, action) {
      state.searchList = action.payload;
      return { ...state };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname.includes('search')) {
          dispatch({
            type: 'setSearchState',
            payload: true,
          });

          console.log(pathname);
          const payload = pathname.replace('/search/', '');
          console.log(payload);
          dispatch({
            type: 'setSearchContent',
            payload: payload.replace(/\+/g, ''),
          });
          dispatch({
            type: 'getSearch',
            payload,
          });
        }
      });
    },
  },
};

export default IndexModel;
