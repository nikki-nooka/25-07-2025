import React from 'react'
const initialState = {count: 0};
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
        return {count: state.count + 1};
    case 'decrement':
        return {count: state.count - 1};
    case 'reset':
        return initialState;
    default:
        throw new Error();
    }

}
function Counter() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'increment'})}>increment</button>
      <button onClick={() => dispatch({type: 'decrement'})}>decrement</button>
      <button onClick={() => dispatch({type: 'reset'})}>Reset</button>
    </div>
  );
}
export default Counter;