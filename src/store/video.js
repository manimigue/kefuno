import { createSlice } from '@reduxjs/toolkit';

export const video = createSlice({
  name: 'video',
  initialState: {
    played: false
  },
  reducers: {
    savePlayed: state => {
      state.played = true
    }
  }
})

export const { savePlayed } = video.actions

export const selectPlayed = state => state.video.played

export default video.reducer