const type = '@REDUX-BATCH.BATCH';

const batch = (...payload) => ({ type, payload });

const enable = reducer => (state, action) => {
  if (type === action.type) {
    return action.payload.reduce(reducer, state);
  }
  return reducer(state, action);
};

module.exports = { enable, batch };
