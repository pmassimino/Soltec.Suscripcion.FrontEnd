import SearchEntity from '@/componets/searchClient/searchClient';
import React, { useReducer } from 'react';

interface State {
  count: number;
}

type Action =
  | { type: 'increment' }
  | { type: 'decrement' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
       return { count: state.count - 1 };    
    default:
      throw new Error(`Invalid action type:`);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  function handleIncrement() {
    dispatch({ type: 'increment' });
  }

  function handleDecrement() {
    dispatch({ type: 'decrement' });
  }

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
      <SearchEntity></SearchEntity>
    </div>
  );
}
export default Counter;
