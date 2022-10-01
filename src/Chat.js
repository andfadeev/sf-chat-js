import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import {
    selectActiveChat,
    selectActiveChatMessagesToJS,
    selectChatsToJS,
    selectActiveChatUser, selectCurrentUserId,
} from "./features/chat/chatSlice";
import ReactTimeAgo from "react-time-ago";
import classNames from "classnames";
import { useAddNewDirectMessageMutation } from "./features/api/apiSlice";


// todo: What's left:
// todo: 1. real call to get messages and publish message
// todo: 2. build (github-actions) and publish js somewhere so it could be used at sf-clj project
// todo: 3. fix css
// todo: 4. remove features/counter (generated from the template)

const PrettyJSON = ({data}) => {
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

PrettyJSON.propTypes = {
    data: PropTypes.object.isRequired
};

export const chatMessagePropType = PropTypes.shape({
    message: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(['Incoming', 'Outgoing']).isRequired,
});

export const userPropType = PropTypes.shape({
    userpic: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
});

function ChatMessageComponent({message}) {
    const liClass = classNames(
        {
            'flex': true,
            'justify-start': message.direction === 'Incoming',
            'justify-end': message.direction === 'Outgoing',
        });
    return <li className={liClass}>
        <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
            <span className="block text-sm">
                {message.message}
            </span>
            <div className="flex justify-between gap-10">
                <span className="block text-[10px] pt-1">
                    {
                        message.direction === 'Outgoing'
                            ? 'Вы'
                            : 'Какой-то уебак'
                    }

                </span>
                <span className="block text-[10px] pt-1">
                    <ReactTimeAgo date={message.createdAt} timeStyle="twitter-first-minute"/>
                </span>
            </div>
        </div>
    </li>;
}

ChatMessageComponent.propTypes = {
    message: chatMessagePropType.isRequired
};

function ChatListItemComponent({chat}) {
    const dispatch = useDispatch();
    const userpic = chat.chatUser.userpic;
    const fixedUserpic = userpic.startsWith("http")
        ? userpic
        : "http://localhost:8080" + userpic;

    const commonClassNames = 'flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer';
    const divClassName = classNames(
        commonClassNames,
        chat.isActive
            ? [
                'bg-indigo-100',
                'hover:bg-indigo-100'
            ]
            : [
                'odd:bg-gray-100',
                'hover:bg-gray-100'
            ]
    );

    return <div onClick={() => dispatch(selectActiveChat(chat.id))}
        className={divClassName}>
        <img className="object-fill shrink-0 w-10 h-10 rounded-full"
            src={fixedUserpic}
            alt={chat.chatUser.name}/>
        <div className="w-full pb-2">
            <div className="flex justify-between">
                <span className="block ml-2 font-semibold text-gray-600">
                    {chat.chatUser.name}
                </span>
                <span className="block ml-2 text-[10px] text-gray-600">
                    <ReactTimeAgo
                        date={chat.recentMessage.createdAt}
                        timeStyle="twitter-first-minute"
                    />
                </span>
            </div>
            <div className="block ml-2 text-sm text-gray-600 overflow-hidden truncate">
                {chat.recentMessage.message}
            </div>
        </div>
    </div>;
}

const chatListItemPropType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    recentMessage: chatMessagePropType.isRequired,
    chatUser: userPropType.isRequired,
    imageUrl: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
});

ChatListItemComponent.propTypes = {
    chat: chatListItemPropType.isRequired
};

function ChatListComponent() {
    const chats = useSelector(selectChatsToJS);

    return <div className="border-r border-gray-300 lg:col-span-1 flex flex-col">
        <h2 className="px-3 text-lg font-semibold text-gray-600 py-5 shadow-md">
            Личные сообщения
        </h2>
        <ul className="overflow-y-auto h-[40rem] ">

            {/*<SearchBarComponent></SearchBarComponent>*/}
            <li>
                {chats.map(function(chat, index){
                    return <ChatListItemComponent
                        chat={chat}
                        key={index}
                    />;
                })}
            </li>
        </ul>
    </div>;
}

// TODO: maybe add later
// function SearchBarComponent() {
//     return <div className="mx-3 my-3">
//         <div className="relative text-gray-600">
//             <span className="absolute inset-y-0 left-0 flex items-center pl-2">
//                 <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                     viewBox="0 0 24 24" className="w-6 h-6 text-gray-300">
//                     <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
//                 </svg>
//             </span>
//             <input type="search" className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none" name="search"
//                 placeholder="Поиск" required/>
//         </div>
//     </div>;
// }

function ChatMessagesComponent() {
    const bottomRef = useRef(null);
    const chatMessages = useSelector(selectActiveChatMessagesToJS);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [chatMessages]);

    return <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
        <ul className="space-y-2">
            {chatMessages && chatMessages.map(function(message, index){
                return <ChatMessageComponent message={message} key={index} />;
            })}
            <li ref={bottomRef} />
        </ul>
    </div>;
}

const SendMessageSVG = ({isDisabled}) => {
    const c = classNames(
        {
            'w-5 h-5 origin-center transform rotate-90': true,
            'text-gray-500': !isDisabled,
            'text-gray-300': isDisabled,
        });
    return <svg className={c}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20" fill="currentColor">
        <path
            d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
    </svg>;
};

SendMessageSVG.propTypes = {
    isDisabled: PropTypes.bool.isRequired,
};

export function SendMessageComponent() {
    const chatUser = useSelector(selectActiveChatUser);
    const currentUserId = useSelector(selectCurrentUserId);

    const [inputValue, setInputValue] = useState("");

    const [addNewDirectMessage] = useAddNewDirectMessageMutation();

    const isNonEmptyString = (value) => typeof value == 'string' && value.trim().length > 0;

    const sendDirectMessage = () => {
        const directMessage = {
            "receiver_id": chatUser.id,
            "sender_id": currentUserId,
            "message": inputValue,
        };

        addNewDirectMessage(directMessage).unwrap();

        setInputValue("");
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendDirectMessage();
        }
    };

    const isDisabled = !isNonEmptyString(inputValue);

    return <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
        <input type="text"
            placeholder="Напишите сообщение"
            className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded outline-none focus:text-gray-700"
            name="message"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            required/>

        <button type="submit"
            onClick={sendDirectMessage}
            disabled={isDisabled}>
            <SendMessageSVG isDisabled={isDisabled}/>
        </button>
    </div>;
}

function ActiveChatUserComponent() {
    const chatUser = useSelector(selectActiveChatUser);
    return chatUser && <div className="relative flex items-center p-3 border-b border-gray-300">

        <img className="object-cover w-10 h-10 rounded-full"
            src={chatUser.userpic}
            alt={chatUser.name}
            onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src="http://localhost:8080/img/male.png";
            }}
        />
        <span className="block ml-2 font-bold text-gray-600">
            {chatUser.name}
        </span>
    </div>;
}

export function ChatComponent() {
    const activeChatUser = useSelector(selectActiveChatUser);
    return <div className="container mx-auto max-h-screen">
        <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
            <ChatListComponent/>
            <div className="col-span-1 lg:col-span-2 lg:block">
                { activeChatUser
                    ? <div className="w-full">
                        <ActiveChatUserComponent/>
                        <ChatMessagesComponent/>
                        <SendMessageComponent/>
                    </div>
                    : <div className="grid w-full h-full place-items-center">
                        <span className="p-2 bg-gray-100 shadow-sm rounded text-sm text-gray-500">
                            Выберите чат для начала общения...
                        </span>
                    </div>
                }
            </div>

        </div>
    </div>;
}