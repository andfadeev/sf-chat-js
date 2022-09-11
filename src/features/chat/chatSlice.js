import {createSelector, createSlice} from '@reduxjs/toolkit';
import {faker} from "@faker-js/faker";


const userIds = [...Array(20).keys()];

const fakeUsers =  userIds.map(userId => {
    return {
        id: userId,
        name: faker.name.fullName(),
        lastMessageDateTime: faker.date.past(),
        lastMessage: faker.lorem.text(),
        imageUrl: faker.image.imageUrl(null, null, null, true)};

});

function getUserById(userId) {
    return fakeUsers.find(user => user.id == userId);
}

console.log("UserIDS", userIds);
console.log("Fake Users", fakeUsers);
console.log("Fake Users by id 5", getUserById(5));

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
    reducers: {
        selectActiveChat: (state, action) => {
            console.log("selectActiveChat", action.payload);
            state.activeChatUserId = action.payload;
        },
        publishMessage: (state, action) => {
            console.log("publishMessage", action.payload);
            state.messages.push(action.payload);
        },
    },

});

export const {  selectActiveChat, publishMessage } = chatSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectChatMessages = state => state.chat.messages;

export const selectCurrentUserId = state => state.chat.currentUserId;
export const selectActiveChatUserId = state => state.chat.activeChatUserId;


// todo: user groupby fn from a shim
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

            // return {
            //     id: userId,
            //     name: faker.name.fullName(),
            //     lastMessageDateTime: faker.date.past(),
            //     lastMessage: faker.lorem.text(),
            //     imageUrl: faker.image.imageUrl(null, null, null, true)};

            console.log("selectchatby", userId, getUserById(userId), fakeUsers);

            return getUserById(userId);


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
