import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Beat = {
  _id: string;
  title?: string;
  bpm?: number;
  audioUrl: string;
  genre?: string[];
  mood?: string[];
  scale?: string;
  duration?: string;
  price?: string;
  description?: string;
  coverImage?: string;
};

type PlayerState = {
  currentTrack: Beat | null;
  isPlaying: boolean;
};

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playTrack(state, action: PayloadAction<Beat>) {
      state.currentTrack = action.payload;
      state.isPlaying = true;
    },
    pauseTrack(state) {
      state.isPlaying = false;
    },
    resumeTrack(state) {
      state.isPlaying = true;
    },
    stopTrack(state) {
      state.isPlaying = false;
      state.currentTrack = null;
    },
  },
});

export const { playTrack, pauseTrack, resumeTrack, stopTrack } = playerSlice.actions;
export default playerSlice.reducer;
