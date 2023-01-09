import { configureStore } from '@reduxjs/toolkit';
import counterSlice from 'Redux/reducer/counterSlice';
import objectSaveSlice from 'Redux/reducer/objectSaveSlice';
//store 만들기
const store = configureStore({
  reducer: {
    //각각의 슬라이스의 리듀서
    counter: counterSlice, //counterSlice안의 reducers들을 하나로 합쳐주는 하나의 reducer 생성
    objectSave: objectSaveSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
