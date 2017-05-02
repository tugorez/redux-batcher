# redux-batcher

similar to [redux-batched-actions](https://github.com/tshelburne/redux-batched-actions) with better syntax and universal :)

## Usage

```js
import { createStore } from 'redux';
import { batch, enable } from 'redux-batcher';
import { createAction } from 'redux-actions';

const add = createAction('ADD');
const sub = createAction('SUB');
const reducer = (state = 0, { type, payload = 1 }) => { 
  if (type === 'ADD') return state + payload;           
  if (type === 'SUB') return state - payload;           
  return state;                                         
};                                                      

const store = createStore(enable(reducer), initialState)

store.dispatch(batch(add(1), sub(2)));
```
