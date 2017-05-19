import { batch, emitter, enable } from '../index';

const reducer = (state = 0, { type, payload = 1 }) => {
  if (type === 'ADD') return state + payload;
  if (type === 'SUB') return state - payload;
  return state;
};

describe('redux-batcher', () => {
  describe('reducer', () => {
    it('should compute the operations', () => {
      const action1 = { type: 'ADD' };
      const action2 = { type: 'ADD' };
      const action3 = { type: 'SUB' };
      const action4 = { type: 'ADD' };
      const actions = [action1, action2, action3, action4];
      const expected = 2;
      const state = actions.reduce(reducer, 0);
      expect(state).toEqual(expected);
    });
  });

  describe('batch', () => {
    it('wraps actions in a batch action', () => {
      const action1 = { type: 'ACTION_1' };
      const action2 = { type: 'ACTION_2' };
      const expected = {
        type: '@REDUX-BATCH.BATCH',
        payload: [action1, action2],
      };
      const batched = batch(action1, action2);
      expect(batched).toEqual(expected);
    });
  });

  describe('enable', () => {
    it('should enable batching actions', () => {
      const action1 = { type: 'ADD' };
      const action2 = { type: 'ADD' };
      const action3 = { type: 'SUB' };
      const action4 = { type: 'ADD' };
      const actions = [action1, action2, action3, action4];
      const expected = 2;
      const state = actions.reduce(enable(reducer), 0);
      expect(state).toEqual(expected);
    });

    it('should pass the actions', () => {
      const action1 = { type: 'ADD' };
      const action2 = { type: 'ADD' };
      const action3 = { type: 'SUB' };
      const action4 = { type: 'ADD' };
      const expected = 2;
      const action = batch(action1, action2, action3, action4);
      const state = enable(reducer)(0, action);
      expect(state).toEqual(expected);
    });
  });

  describe('emitter', () => {
    it('should play nice with redux-saga', () => {
      const emit = jest.fn();
      const action1 = { type: 'ADD' };
      const action2 = { type: 'ADD' };
      const action3 = { type: 'SUB' };
      emitter(emit)(action1);
      emitter(emit)(batch(action2, action3));
      expect(emit.mock.calls.length).toBe(3);
      expect(emit.mock.calls[0][0]).toEqual(action1);
      expect(emit.mock.calls[1][0]).toEqual(action2);
      expect(emit.mock.calls[2][0]).toEqual(action3);
    });
  });
});
