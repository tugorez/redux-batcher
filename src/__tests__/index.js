import { batch, batcher, emitter, enable } from '../index';

const reducer = (state = 0, { type, payload = 1 }) => {
  if (type === 'ADD') return state + payload;
  if (type === 'SUB') return state - payload;
  return state;
};

describe('reducer', () => {
  it('should compute the operations', () => {
    const action1 = { type: 'ADD' };
    const action2 = { type: 'ADD' };
    const action3 = { type: 'SUB' };
    const action4 = { type: 'ADD' };
    const actions = [action1, action2, action3, action4];
    const state = actions.reduce(reducer, 0);
    expect(state).toMatchSnapshot();
  });
});

describe('redux-batcher', () => {
  const batched = batcher(reducer);

  describe('batch', () => {
    it('creates a valid action', () => {
      const action = batch({ type: 'ADD' }, { type: 'SUB' }, { type: 'SUB' });
      expect(action).toMatchSnapshot();
    });
  });

  describe('batcher', () => {
    it('should behaves normal', () => {
      const actions = [{ type: 'ADD' }, { type: 'ADD' }, { type: 'ADD' }];
      const state = actions.reduce(batched, undefined);
      expect(state).toMatchSnapshot();
    });

    it('should batch actions', () => {
      const action = batch({ type: 'ADD' }, { type: 'SUB' }, { type: 'SUB' });
      const state = batched(undefined, action);
      expect(state).toMatchSnapshot();
    });
  });

  describe('emitter', () => {
    it('should be a valid redux-saga emmiter', () => {
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

  describe('enable', () => {
    it('should be a batcher alias', () => {
      expect(enable).toEqual(batcher);
    });
  });
});
