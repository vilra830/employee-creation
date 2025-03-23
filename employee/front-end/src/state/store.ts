import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// import { TypedUseSelectorHook, useDispatch, useSeletor } from "react-redux";
// export const useDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSeletor;
