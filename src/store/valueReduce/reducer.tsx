export interface ValueInput {
  value: string;
}

const INITIAL_STATE: ValueInput = { value: "" };

export const valueReducer = (
  store: ValueInput = INITIAL_STATE,
  action: {
    type: "changeValue";
    payload: string;
  }
): ValueInput => {
  if (action.type === "changeValue") {
    const { payload } = action;
    return { ...store, value: payload };
  }
  return store;
};
