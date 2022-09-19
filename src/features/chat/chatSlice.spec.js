import chatReducer, {
    selectActiveChat,
    selectActiveChatMessages,
    selectChats,
    selectChatsToJS,
    selectMessages,
    selectMessagesGroupedSorted,
    selectMessagesWithDirection,
} from './chatSlice';
import {faker} from "@faker-js/faker";
import Immutable, {List} from "immutable";
import * as immutableMatchers from 'jest-immutable-matchers';

describe('testing chatSlice selectors', () => {
    beforeEach(function () {
        expect.extend(immutableMatchers);
    });

    const currentUserId = 'current-user-id';
    const otherUserId1 = 'other-user-id-1';
    const otherUserId2 = 'other-user-id-2';

    const message1 = {
        id: '1',
        message: faker.lorem.text(),
        sender: {
            id: currentUserId
        },
        receiver: {
            id: otherUserId1
        },
        createdAt: '2022-09-20T00:00:00.000Z'
    };

    const message1DirectionOutgoing = {
        ...message1,
        direction: 'Outgoing'
    };

    const message2CreatedAt = '2022-09-19T00:00:00.000Z';
    const message3CreatedAt = '2022-09-18T00:00:00.000Z';
    const message4CreatedAt = '2022-09-17T00:00:00.000Z';

    const message2 = {
        id: '2',
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
        id: '3',
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
        id: '4',
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

    const directMessages = faker.helpers.shuffle(
        [
            message1,
            message2,
            message3,
            message4
        ]
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

        expect(selectMessages(state)).toEqualImmutable(Immutable.fromJS(directMessages));
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
            message1DirectionOutgoing,
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

        const expected = Immutable.fromJS(new Map([
            [otherUserId1, [message1DirectionOutgoing]],
            [otherUserId2, [
                message2WithDirection,
                message3WithDirection,
                message4WithDirection
            ]]
        ])).mapEntries(([userId, messages]) =>
            [userId, messages.sortBy(message => message.get('createdAt'))]);

        expect(selectMessagesGroupedSorted(state)).toBeImmutableMap();
        expect(selectMessagesGroupedSorted(state)).toEqualImmutable(expected);
    });

    it('selectChats: list of chats is returned', () => {
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

        const expected = Immutable.fromJS([
            {
                id: otherUserId1,
                recentMessage: message1DirectionOutgoing,
                chatUser: message1DirectionOutgoing.receiver,
                isActive: false
            },
            {
                id: otherUserId2,
                recentMessage: message2WithDirection,
                chatUser: message2WithDirection.sender,
                isActive: true
            }
        ])
            .sortBy(chat => chat.getIn(['recentMessage', 'createdAt']))
            .reverse();

        expect(selectChats(state)).toBeImmutableSeq();
        expect(selectChatsToJS(state)).toEqual(expected.toJS());
    });

    it('selectActiveChatMessages: active chat messages are returned and sorted by createdAt', () => {
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

        const expected = Immutable.fromJS([
            message4WithDirection,
            message3WithDirection,
            message2WithDirection
        ]).sortBy(message => message.get('createdAt'));

        expect(selectActiveChatMessages(state)).toBeImmutableList();
        expect(selectActiveChatMessages(state)).toEqualImmutable(expected);
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
