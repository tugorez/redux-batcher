# redux-batcher
[ ![Codeship Status](https://app.codeship.com/projects/be9c8920-1e9a-0135-7c81-36c4f0599ddd/status?branch=master)](https://app.codeship.com/projects/220766)
[![codecov](https://codecov.io/gh/tugorez/redux-batcher/branch/master/graph/badge.svg)](https://codecov.io/gh/tugorez/redux-batcher)

similar to [redux-batched-actions](https://github.com/tshelburne/redux-batched-actions) with better syntax and universal, and also plays well with redux-saga :)

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

## redux-saga

if you're using redux saga pass the emitter to the createSagaMiddleware fn

``` javascript
import { emitter } from 'redux-batcher';

createSagaMiddleware({ emitter });
```
