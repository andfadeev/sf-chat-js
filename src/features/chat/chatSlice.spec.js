import chatReducer, {
    selectActiveChat, selectActiveChatMessages, selectChats, selectMessages, selectMessagesGroupedSorted, selectMessagesWithDirection,
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
        },
        createdAt: faker.date.recent()
    };

    const message1WithDirection = {
        ...message1,
        direction: 'Outgoing'
    };

    const message2CreatedAt = faker.date.recent(2);
    const message3CreatedAt = faker.date.recent(3);
    const message4CreatedAt = faker.date.recent(4);

    const message2 = {
        id: faker.random.alphaNumeric(),
        message: faker.lorem.text(),
        sender: {
            id: otherUserId2
        },
        receiver: {
            id: currentUserId
        },
        createdAt: message2CreatedAt
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
        },
        createdAt: message3CreatedAt
    };

    const message3WithDirection = {
        ...message3,
        direction: "Outgoing"
    };

    const message4 = {
        id: faker.random.alphaNumeric(),
        message: faker.lorem.text(),
        sender: {
            id: otherUserId2
        },
        receiver: {
            id: currentUserId
        },
        createdAt: message4CreatedAt
    };

    const message4WithDirection = {
        ...message4,
        direction: "Incoming"
    };

    const directMessages = Immutable.fromJS(
        faker.helpers.shuffle(
            [
                message1,
                message2,
                message3,
                message4
            ]
        )
    );

    it('selectMessages: returns empty array when status is not equal to loaded', () => {
        const state =
            {
                chat: {
                    messages: {
                        status: "loading",
                        value: directMessages
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
                        value: directMessages
                    },
                }
            };

        expect(selectMessages(state)).toEqualImmutable(directMessages);
    });

    it('selectMessagesWithDirection: direction field is added', () => {
        const state =
            {
                chat: {
                    currentUserId: currentUserId,
                    messages: {
                        status: "loaded",
                        value: directMessages
                    },
                }
            };

        const expected = Immutable.fromJS([
            message1WithDirection,
            message2WithDirection,
            message3WithDirection,
            message4WithDirection
        ]);

        expect(selectMessagesWithDirection(state)).toBeImmutableList();
        expect(selectMessagesWithDirection(state).toSet()).toEqualImmutable(expected.toSet());
    });

    it('selectMessagesGrouped: messages are grouped correctly', () => {
        const state =
            {
                chat: {
                    currentUserId: currentUserId,
                    messages: {
                        status: "loaded",
                        value: directMessages
                    },
                }
            };

        const expected2 = new Map([
            [otherUserId1, [message1WithDirection]],
            [otherUserId2, [
                message2WithDirection,
                message3WithDirection,
                message4WithDirection
            ]]
        ]);

        expect(selectMessagesGroupedSorted(state)).toBeImmutableMap();
        expect(selectMessagesGroupedSorted(state)).toEqualImmutable(Immutable.fromJS(expected2));
    });

    it('selectChats: list of chats is returned', () => {
        const state =
            {
                chat: {
                    currentUserId: currentUserId,
                    messages: {
                        status: "loaded",
                        value: directMessages
                    },
                }
            };

        const expected = [
            {
                id: otherUserId1,
                recentMessage: message1WithDirection,
                chatUser: message1WithDirection.receiver
            },
            {
                id: otherUserId2,
                recentMessage: message2WithDirection,
                chatUser: message2WithDirection.sender
            }
        ];

        expect(selectChats(state)).toBeImmutableSeq();
        expect(selectChats(state)).toEqualImmutable(Immutable.fromJS(expected).toSeq());
    });

    it('selectActiveChatMessages: active chat messages are returned', () => {
        const state =
            {
                chat: {
                    currentUserId: currentUserId,
                    activeChatUserId: otherUserId2,
                    messages: {
                        status: "loaded",
                        value: directMessages
                    },
                }
            };

        const expected = [
            message2WithDirection,
            message3WithDirection,
            message4WithDirection
        ];

        expect(selectActiveChatMessages(state)).toBeImmutableList();
        expect(selectActiveChatMessages(state)).toEqualImmutable(Immutable.fromJS(expected));
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
