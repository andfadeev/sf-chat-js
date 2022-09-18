import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import Immutable from "immutable";

const axios = require('axios');

// TODO: move something similar to test-server backend for local testing
// function generateFakeChatMessages(numberOfMessages) {
//
//     return [...Array(numberOfMessages).keys()].map((i) => {
//
//         const senderId = faker.helpers.arrayElement(userIds);
//         const receiverId = faker.helpers.arrayElement(userIds.filter(userId => userId !== senderId));
//
//         return {
//             id: i,
//             message: faker.lorem.text(),
//             sendDateTime: faker.date.past(),
//             senderId: senderId,
//             receiverId: receiverId,
//             messageDirection: faker.helpers.arrayElement(['Outgoing', 'Incoming'])
//         };
//     });
//
//
// }

// TODO: start using redux
const initialState = {
    currentUserId: 404,
    activeChatUserId: 0,
    messages: {
        status: "idle",
        value: []
    },
};


export const fetchMessages = createAsyncThunk(
    'chat/fetchMessages',
    async () => {
        console.log("fetchMessages starting...");
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
                // state
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
    ? state.chat.messages.value
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

export const selectMessagesGrouped = createSelector(
    [
        selectCurrentUserId,
        selectMessagesWithDirection
    ],
    (currentUserId, messages) => {
        return messages.groupBy(
            message => {
                return message.getIn(['sender', 'id']) === currentUserId
                    ? message.getIn(['receiver', 'id'])
                    : message.getIn(['sender', 'id']);
            }
        ).toMap();
    }
);

export const selectActiveChatMessages = createSelector(
    [selectActiveChatUserId, selectMessagesGrouped],
    (activeChatUserId, groupedChatMessages) => {
        console.log("selectActiveChatMessages", activeChatUserId, groupedChatMessages);
        return groupedChatMessages[activeChatUserId];
    }
);

export const selectChats = createSelector(
    [
        selectMessagesGrouped
    ], 
    (groupedChatMessages) => {
        return Object.keys(groupedChatMessages).map(userId => {
            const recentMessage = groupedChatMessages[userId][0];
            const chatUser = recentMessage.sender.id === 404 ? recentMessage.receiver : recentMessage.sender;

            return {
                id: userId,
                recentMessage: recentMessage,
                chatUser: chatUser
            };

        });
    });

export default chatSlice.reducer;
