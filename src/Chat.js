import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import {selectActiveChat, selectActiveChatMessages, selectActiveChatUserId, selectChats} from "./chatSlice";


export const chatMessagePropType = PropTypes.shape({
    message: PropTypes.string.isRequired,
    messageDirection:  PropTypes.oneOf(['Incoming', 'Outgoing']).isRequired,
});

function ChatMessageComponent({message}) {

    return (<li className={`flex ${message.messageDirection === 'Incoming' ? 'justify-start' : 'justify-end'} `}>
        <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
            <span className="block">{message.message}</span>
        </div>
    </li>);
}

ChatMessageComponent.propTypes = {
    message: chatMessagePropType.isRequired
};

function ChatListItemComponent({chat}) {

    const dispatch = useDispatch();

    return <div onClick={() => dispatch(selectActiveChat(chat.id))}
        className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out bg-gray-100 border-b border-gray-300 cursor-pointer focus:outline-none ">
        <img className="object-cover w-10 h-10 rounded-full"
            src={chat.imageUrl} alt="username"/>
        <div className="w-full pb-2">
            <div className="flex justify-between">
                <span className="block ml-2 font-semibold text-gray-600">{chat.name}</span>
                <span className="block ml-2 text-sm text-gray-600">{chat.lastMessageDateTime.toDateString()}</span>
            </div>
            <div className="block ml-2 text-sm text-gray-600 overflow-hidden truncate">{chat.lastMessage}</div>
        </div>
    </div>;
}

const chatListItemPropType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    lastMessageDateTime: PropTypes.string.isRequired,
    lastMessage: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
});

ChatListItemComponent.propTypes = {
    chat: chatListItemPropType.isRequired
};

function ChatListComponent() {
    const chats = useSelector(selectChats);

    return <div className="border-r border-gray-300 lg:col-span-1">
        <ul className="overflow-y-auto h-[40rem] ">
            <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Чаты</h2>
            {/*<h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">{JSON.stringify(chats)}</h2>*/}
            <SearchBarComponent></SearchBarComponent>
            <li>
                {chats.map(function(chat, index){
                    return <ChatListItemComponent chat={chat} key={index} />;
                })}

                {/*<a href="asdf"*/}
                {/*    className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">*/}
                {/*    <img className="object-cover w-10 h-10 rounded-full"*/}
                {/*        src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg" alt="username"/>*/}
                {/*    <div className="w-full pb-2">*/}
                {/*        <div className="flex justify-between">*/}
                {/*            <span className="block ml-2 font-semibold text-gray-600">Jhon Don</span>*/}
                {/*            <span className="block ml-2 text-sm text-gray-600">25 minutes</span>*/}
                {/*        </div>*/}
                {/*        <span className="block ml-2 text-sm text-gray-600">bye</span>*/}
                {/*    </div>*/}
                {/*</a>*/}

            </li>
        </ul>
    </div>;
}

function SearchBarComponent() {
    return <div className="mx-3 my-3">
        <div className="relative text-gray-600">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    viewBox="0 0 24 24" className="w-6 h-6 text-gray-300">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </span>
            <input type="search" className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none" name="search"
                placeholder="Поиск" required/>
        </div>
    </div>;
}

function ChatMessagesComponent() {
    const chatMessages = useSelector(selectActiveChatMessages);

    return <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
        <ul className="space-y-2">
            {chatMessages.map(function(message, index){
                return <ChatMessageComponent message={message} key={index} />;
            })}
        </ul>
    </div>;
}

export function ChatComponent() {

    const activeChatUserId = useSelector(selectActiveChatUserId);

    return (<div className="container mx-auto">
        <div>
            Active chat id: {activeChatUserId}
        </div>
        <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
            <ChatListComponent/>
            <div className="col-span-1 lg:col-span-2 lg:block">
                <div className="w-full">
                    <div className="relative flex items-center p-3 border-b border-gray-300">
                        <img className="object-cover w-10 h-10 rounded-full"
                            src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg" alt="username"/>
                        <span className="block ml-2 font-bold text-gray-600">Emma</span>
                        <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
                        </span>
                    </div>
                    <ChatMessagesComponent></ChatMessagesComponent>

                    <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">


                        <input type="text" placeholder="Напишите сообщение"
                            className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                            name="message" required/>

                        <button type="submit"
                            onClick={() => {return 0;}}>
                            <svg className="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}