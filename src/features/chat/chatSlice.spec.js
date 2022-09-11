import chatReducer, {
    selectActiveChat,
} from './chatSlice';

describe('counter reducer', () => {
    const initialState = {
        value: 3,
        activeChatUserId: 1,
        status: 'idle',
    };
    it('should handle initial state', () => {
        expect(chatReducer(undefined, { type: 'unknown' })).toEqual({
            value: 0,
            status: 'idle',
        });
    });

    it('should handle selectActiveChat', () => {
        const expectedActiveChatId = 10;
        const actual = chatReducer(initialState, selectActiveChat(expectedActiveChatId));
        expect(actual.activeChatUserId).toEqual(expectedActiveChatId);
    });

    it('should handle publishMessage', () => {
        const expectedActiveChatId = 10;
        const actual = chatReducer(initialState, selectActiveChat(expectedActiveChatId));
        expect(actual.activeChatUserId).toEqual(expectedActiveChatId);
    });
    //
    // it('should handle decrement', () => {
    //     const actual = counterReducer(initialState, decrement());
    //     expect(actual.value).toEqual(2);
    // });
    //
    // it('should handle incrementByAmount', () => {
    //     const actual = counterReducer(initialState, incrementByAmount(2));
    //     expect(actual.value).toEqual(5);
    // });
});
