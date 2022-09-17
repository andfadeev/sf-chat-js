import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';

const axios = require('axios');

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
    // generateFakeChatMessages(1000),
};


export const fetchMessages = createAsyncThunk(
    'chat/fetchMessages',
    async () => {
        console.log("fetchMessages starting...");
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

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectChatMessages = state => {
    console.log("selectChatMessages", state.chat.messages.value);
    return state.chat.messages.status === 'loaded'
        ? state.chat.messages.value.map(chatMessage => {
            const messageDirection = chatMessage.sender.id === state.chat.currentUserId ?
                'Outgoing'
                : 'Incoming';
            return {
                ...chatMessage,
                messageDirection: messageDirection
            };
        })
        : [];
};

export const selectCurrentUserId = state => state.chat.currentUserId;
export const selectActiveChatUserId = state => state.chat.activeChatUserId;


// todo: user groupby fn from a shim
export const selectGroupedChatMessages = createSelector(
    [
        selectCurrentUserId,
        selectChatMessages
    ],
    (currentUserId, chatMessages) => {
        console.log("chatMessages", JSON.stringify(chatMessages));
        const groupedChatMessages = {};

        for (const chatMessage of chatMessages) {
            const { sender, receiver } = chatMessage;
            const groupKey = sender.id === currentUserId ? receiver.id : sender.id;
            if (groupedChatMessages[groupKey]) {
                groupedChatMessages[groupKey].push(chatMessage);
            } else {
                groupedChatMessages[groupKey] = [chatMessage];
            }
        }

        console.log("groupedChatMessages", groupedChatMessages);
        return groupedChatMessages;
    }
);

export const selectActiveChatMessages = createSelector(
    [selectActiveChatUserId, selectGroupedChatMessages],
    (activeChatUserId, groupedChatMessages) => {
        console.log("selectActiveChatMessages", activeChatUserId, groupedChatMessages);
        return groupedChatMessages[activeChatUserId];
    }
);

export const selectChats = createSelector(
    [
        selectGroupedChatMessages
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

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//         dispatch(incrementByAmount(amount));
//     }
// };

export default chatSlice.reducer;
