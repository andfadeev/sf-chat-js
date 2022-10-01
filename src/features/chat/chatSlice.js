import {createSelector, createSlice} from '@reduxjs/toolkit';
import Immutable from "immutable";
import {selectGetSessionResult, selectGetDirectMessagesResult} from "../api/apiSlice";

const initialState = {};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        selectActiveChat: (state, action) => {
            state.activeChatUserId = action.payload;
        },
        publishMessage: (state, action) => {
            state.messages.value.push(action.payload);
        },
    },
});

export const {  selectActiveChat, publishMessage } = chatSlice.actions;

export const selectActiveChatUserId = state => state.chat.activeChatUserId;

export const selectCurrentUserId = createSelector(
    [
        selectGetSessionResult
    ],
    (getSessionResult) => {
        return getSessionResult.status === 'fulfilled' && getSessionResult.data.id;
    }
);

export const selectMessages = createSelector(
    [
        selectGetDirectMessagesResult
    ],
    (messages) => {
        console.log("messagez:", messages);
        // return messages.status === 'fulfilled'
        return messages.data
            ? Immutable.fromJS(messages.data)
            : Immutable.List();
    }
);

export const selectMessagesWithDirectionCombiner = (currentUserId, messages) => {
    return messages.map(message => {
        const direction =
            message.getIn(['sender', 'id']) === currentUserId
                ? 'Outgoing'
                : 'Incoming';
        return message.set('direction', direction);
    });
};

export const selectMessagesWithDirection = createSelector(
    [
        selectCurrentUserId,
        selectMessages
    ],
    selectMessagesWithDirectionCombiner
);

export const selectMessagesGroupedSorted = createSelector(
    [
        selectCurrentUserId,
        selectMessagesWithDirection
    ],
    (currentUserId, messages) => {
        const messagesGrouped = messages.groupBy(
            message => {
                return message.getIn(['sender', 'id']) === currentUserId
                    ? message.getIn(['receiver', 'id'])
                    : message.getIn(['sender', 'id']);
            }
        ).toMap();

        return messagesGrouped
            .mapEntries(([userId, messages]) =>
                [userId, messages.sortBy(message => message.get('createdAt'))]);
    }
);

export const selectChatUsers = createSelector(
    [selectMessages],
    (messages) => {
        return Immutable.Map(
            messages
                .flatMap(directMessage => {
                    return [
                        directMessage.get('sender'),
                        directMessage.get('receiver')];
                })
                .toSet()
                .map(user => [user.get('id'), user]));
    }
);


export const selectActiveChatUser = createSelector(
    [
        selectChatUsers,
        selectActiveChatUserId
    ],
    (chatUsers, activeChatUserId) => {
        return activeChatUserId && chatUsers.get(activeChatUserId)?.toJS();
    }
);

export const selectActiveChatMessages = createSelector(
    [
        selectActiveChatUserId,
        selectMessagesGroupedSorted
    ],
    (activeChatUserId, messagesGroupedSorted) => {
        return activeChatUserId
            ? messagesGroupedSorted.get(activeChatUserId)
            : Immutable.List();
    }
);

export const selectActiveChatMessagesToJS = createSelector(
    [selectActiveChatMessages],
    (chatMessages) => chatMessages?.toJS()
);

export const selectChats = createSelector(
    [
        selectMessagesGroupedSorted,
        selectCurrentUserId,
        selectActiveChatUserId
    ], 
    (
        messagesGroupedSorted,
        currentUserId,
        activeChatUserId
    ) => {
        return messagesGroupedSorted
            .keySeq()
            .map(userId => {
                const recentMessage = messagesGroupedSorted.get(userId).last();
                const chatUser = recentMessage.getIn(['sender', 'id']) === currentUserId
                    ? recentMessage.get('receiver')
                    : recentMessage.get('sender');

                return Immutable.Map({
                    id: userId,
                    recentMessage: recentMessage,
                    chatUser: chatUser,
                    isActive: userId === activeChatUserId
                });
            })
            .sortBy(chat => chat.getIn(['recentMessage', 'createdAt']))
            .reverse();
    });

export const selectChatsToJS = createSelector(
    [selectChats],
    (chats) =>  chats.toJS());

export default chatSlice.reducer;
