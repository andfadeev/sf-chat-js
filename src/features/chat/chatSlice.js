import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import Immutable from "immutable";

const axios = require('axios');


// TODO: start using redux
const initialState = {
    // TODO: add fetch session call
    // currentUserId: 404,
    // TODO: show `select chat message if nothing is selected`
    // activeChatUserId: 0,
    messages: {
        status: "idle",
        value: []
    },
};


export const fetchMessages = createAsyncThunk(
    'chat/fetchMessages',
    async () => {
        // TODO: create config state and get base url for backend api from state
        const response = await axios.get('http://localhost:8080/api/direct-messages');
        console.log("fetchMessages", response);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        selectActiveChat: (state, action) => {
            console.log("selectActiveChat", action.payload);
            state.activeChatUserId = action.payload;
        },
        publishMessage: (state, action) => {
            console.log("publishMessage", action.payload);
            state.messages.value.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, (state) => {
                console.log("fetchMessages.pending");
                state.messages.status = 'loading';
                state.messages.value = [];
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                console.log("fetchMessages.fulfilled", action);
                state.messages.status = 'loaded';
                state.messages.value = action.payload;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                console.log("fetchMessages.rejected", action);
                state.messages.status = 'rejected';
                state.messages.value += action.payload;
            });
    },
});

export const {  selectActiveChat, publishMessage } = chatSlice.actions;

export const selectCurrentUserId = state => state.chat.currentUserId;
export const selectActiveChatUserId = state => state.chat.activeChatUserId;
export const selectMessages = state => state.chat.messages.status === 'loaded'
    ? Immutable.fromJS(state.chat.messages.value)
    : Immutable.List();

export const selectMessagesWithDirection = createSelector(
    [
        selectCurrentUserId,
        selectMessages
    ],
    (currentUserId, messages) => {
        return messages.map(message => {
            const direction =
                message.getIn(['sender', 'id']) === currentUserId
                    ? 'Outgoing'
                    : 'Incoming';
            return message.set('direction', direction);
        });
    }
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
                [userId, messages.sortBy(message => message.createdAt)]);
    }
);

export const selectActiveChatMessages = createSelector(
    [
        selectActiveChatUserId,
        selectMessagesGroupedSorted
    ],
    (activeChatUserId, messagesGrouped) => {
        return activeChatUserId
            ? messagesGrouped.get(activeChatUserId)
            : Immutable.List();
    }
);

export const selectActiveChatMessagesToJS = createSelector(
    [selectActiveChatMessages],
    (chatMessages) => chatMessages.toJS()
);

// TODO: sort chats by recent message date
export const selectChats = createSelector(
    [
        selectMessagesGroupedSorted,
        selectCurrentUserId
    ], 
    (messagesGrouped, currentUserId) => {
        return messagesGrouped
            .keySeq()
            .map(userId => {
                const recentMessage = messagesGrouped.get(userId).first();
                const chatUser = recentMessage.getIn(['sender', 'id']) === currentUserId
                    ? recentMessage.get('receiver')
                    : recentMessage.get('sender');

                return Immutable.fromJS(
                    {
                        id: userId,
                        recentMessage: recentMessage,
                        chatUser: chatUser
                    }
                );
            });
    });

export const selectChatsToJS = createSelector(
    [selectChats],
    (chats) =>  chats.toJS());

export default chatSlice.reducer;
