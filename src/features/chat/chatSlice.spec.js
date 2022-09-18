import chatReducer, {
    selectActiveChat, selectMessages, selectMessagesGrouped, selectMessagesWithDirection,
} from './chatSlice';
import {faker} from "@faker-js/faker";
import Immutable, {List} from "immutable";
import * as immutableMatchers from 'jest-immutable-matchers';

describe('testing chat slice selectors', () => {
    beforeEach(function () {
        expect.extend(immutableMatchers);
    });

    const currentUserId = faker.random.alphaNumeric();
    const otherUserId1 = faker.random.alphaNumeric();
    const otherUserId2 = faker.random.alphaNumeric();

    const message1 = {
        id: faker.random.alphaNumeric(),
        message: faker.lorem.text(),
        sender: {
            id: currentUserId
        },
        receiver: {
            id: otherUserId1
        }
    };

    const message1WithDirection = {
        ...message1,
        direction: 'Outgoing'
    };

    const message2 = {
        id: faker.random.alphaNumeric(),
        message: faker.lorem.text(),
        sender: {
            id: otherUserId2
        },
        receiver: {
            id: currentUserId
        }
    };

    const message2WithDirection = {
        ...message2,
        direction: "Incoming"
    };

    const message3 = {
        id: faker.random.alphaNumeric(),
        message: faker.lorem.text(),
        sender: {
            id: currentUserId
        },
        receiver: {
            id: otherUserId2
        }
    };

    const message3WithDirection = {
        ...message3,
        direction: "Outgoing"
    };

    const directMessages = [
        message1,
        message2,
        message3
    ];

    it('selectMessages: returns empty array when status is not equal to loaded', () => {
        const state =
            {
                chat: {
                    messages: {
                        status: "loading",
                        value: Immutable.fromJS(directMessages)
                    },
                }
            };

        expect(selectMessages(state)).toEqualImmutable(List());
    });

    it('selectMessages: return all messages when status is loaded', () => {
        const state =
            {
                chat: {
                    messages: {
                        status: "loaded",
                        value: Immutable.fromJS(directMessages)
                    },
                }
            };

        expect(selectMessages(state)).toEqualImmutable(Immutable.fromJS(directMessages));
    });

    it('selectMessagesWithDirection: direction field is added', () => {
        const state =
            {
                chat: {
                    currentUserId: currentUserId,
                    messages: {
                        status: "loaded",
                        value: Immutable.fromJS(directMessages)
                    },
                }};

        const expected = Immutable.fromJS([
            message1WithDirection,
            message2WithDirection,
            message3WithDirection
        ]);

        expect(selectMessagesWithDirection(state)).toBeImmutableList();
        expect(selectMessagesWithDirection(state)).toEqualImmutable(expected);
    });

    it('selectMessagesGrouped: messages are grouped correctly', () => {
        const state =
            {
                chat: {
                    currentUserId: currentUserId,
                    messages: {
                        status: "loaded",
                        value: Immutable.fromJS(directMessages)
                    },
                }};

        const expected2 = new Map([
            [otherUserId1, [
                message1WithDirection
            ]],
            [otherUserId2, [
                message2WithDirection,
                message3WithDirection
            ]]
        ]);

        expect(selectMessagesGrouped(state)).toBeImmutableMap();
        expect(selectMessagesGrouped(state)).toEqualImmutable(Immutable.fromJS(expected2));
    });
});

describe('counter reducer', () => {
    const initialState = {
        value: 3,
        activeChatUserId: 1,
        status: 'idle',
    };
    // it('should handle initial state', () => {
    //     expect(chatReducer(undefined, { type: 'unknown' })).toEqual({
    //         value: 0,
    //         status: 'idle',
    //     });
    // });

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
