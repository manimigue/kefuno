import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './news';
import videoReducer from './video'

export default configureStore({
  reducer: {
    news: newsReducer,
    video: videoReducer
  },
});
