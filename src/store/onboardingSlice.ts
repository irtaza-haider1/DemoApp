import { createSlice } from '@reduxjs/toolkit';

interface OnboardingState {
  interests: string[];
}

const initialState: OnboardingState = {
  interests: [],
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    toggleInterest: (state, action) => {
      const interest = action.payload;
      if (state.interests.includes(interest)) {
        state.interests = state.interests.filter((i) => i !== interest);
      } else {
        state.interests.push(interest);
      }
    },
  },
});

export const { toggleInterest } = onboardingSlice.actions;
export default onboardingSlice.reducer;
