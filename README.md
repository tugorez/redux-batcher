# redux-batcher
[ ![Codeship Status](https://app.codeship.com/projects/be9c8920-1e9a-0135-7c81-36c4f0599ddd/status?branch=master)](https://app.codeship.com/projects/220766)
[![codecov](https://codecov.io/gh/tugorez/redux-batcher/branch/master/graph/badge.svg)](https://codecov.io/gh/tugorez/redux-batcher)

High order reducer that enables batching actions and also plays well with redux-saga :)
## Install
```sh
$ npm install --save redux-batcher
```
or 

```sh
$ yarn add redux-batcher
```
## Usage

```js
import { createStore } from 'redux';
import { batcher, batch } from 'redux-batcher';

const reducer = (state = 0, { type, payload = 1 }) => { 
  if (type === 'ADD') return state + payload;           
  if (type === 'SUB') return state - payload;           
  return state;                                         
};                                                      

const store = createStore(batcher(reducer), initialState)

const add5 = { type: 'ADD', payload: 5 };
const sub5 = batch(
  { type: 'SUB' }, 
  { type: 'SUB' },
  { type: 'SUB' }, 
  { type: 'SUB' }, 
  { type: 'SUB' }, 
);

store.dispatch(add5);
store.dispatch(sub5);

expect(store.getState()).toEqual(0);
```

## redux-saga

if you're using redux saga pass the emitter to the createSagaMiddleware fn

``` javascript
import { emitter } from 'redux-batcher';

createSagaMiddleware({ emitter });
```
