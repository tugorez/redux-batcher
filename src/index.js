const type = '@REDUX-BATCH.BATCH';

const batch = (...payload) => ({ type, payload });

const batcher = reducer => (state, action) => {
  if (type === action.type) {
    return action.payload.reduce(reducer, state);
  }
  return reducer(state, action);
};

const emitter = emit => (action) => {
  if (action.type === type) {
    action.payload.forEach(emit);
  } else {
    emit(action);
  }
};

module.exports = { batcher, emitter, batch, enable: batcher };
