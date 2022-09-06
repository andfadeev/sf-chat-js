import {createSelector, createSlice} from '@reduxjs/toolkit';
import {faker} from "@faker-js/faker";


const userIds = [...Array(20).keys()];

console.log("UserIDS", userIds);

function generateFakeChatMessages(numberOfMessages) {

    return [...Array(numberOfMessages).keys()].map((i) => {

        const senderId = faker.helpers.arrayElement(userIds);
        const receiverId = faker.helpers.arrayElement(userIds.filter(userId => userId !== senderId));

        return {
            id: i,
            message: faker.lorem.text(),
            sendDateTime: faker.date.past(),
            senderId: senderId,
            receiverId: receiverId,
            messageDirection: faker.helpers.arrayElement(['Outgoing', 'Incoming'])
        };
    });


}

// TODO: start using redux
const initialState = {
    currentUserId: 0,
    activeChatUserId: 1,
    messages: generateFakeChatMessages(1000),
};


export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        // increment: (state) => {
        //     // Redux Toolkit allows us to write "mutating" logic in reducers. It
        //     // doesn't actually mutate the state because it uses the Immer library,
        //     // which detects changes to a "draft state" and produces a brand new
        //     // immutable state based off those changes
        //     state.value += 1;
        // },
        // decrement: (state) => {
        //     state.value -= 1;
        // },
        // // Use the PayloadAction type to declare the contents of `action.payload`
        // incrementByAmount: (state, action) => {
        //     state.value += action.payload;
        // },
        selectActiveChat: (state, action) => {
            console.log("selectActiveChat", action.payload);
            state.activeChatUserId = action.payload;
        },
    },

});

export const {  selectActiveChat } = chatSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectChatMessages = state => state.chat.messages;

export const selectCurrentUserId = state => state.chat.currentUserId;
export const selectActiveChatUserId = state => state.chat.activeChatUserId;

export const selectGroupedChatMessages = createSelector(
    [
        selectCurrentUserId,
        selectChatMessages
    ],
    (currentUserId, chatMessages) => {
        const groupedChatMessages = {};

        for (const chatMessage of chatMessages) {
            const { senderId, receiverId } = chatMessage;
            const groupKey = senderId === currentUserId ? receiverId : senderId;
            if (groupedChatMessages[groupKey]) {
                groupedChatMessages[groupKey].push(chatMessage);
            } else {
                groupedChatMessages[groupKey] = [chatMessage];
            }
        }

        return groupedChatMessages;
    }
);

export const selectActiveChatMessages = createSelector(
    [selectActiveChatUserId, selectGroupedChatMessages],
    (activeChatUserId, groupedChatMessages) => {
        return groupedChatMessages[activeChatUserId];
    }
);

export const selectChats = createSelector(
    [
        selectGroupedChatMessages
    ], 
    (groupedChatMessages) => {
        return Object.keys(groupedChatMessages).map(userId => {
            return {
                id: userId,
                name: faker.name.fullName(),
                lastMessageDateTime: faker.date.past(),
                lastMessage: faker.lorem.text(),
                imageUrl: faker.image.imageUrl(null, null, null, true)};

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
