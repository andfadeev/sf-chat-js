import React, {useState} from "react";
import PropTypes from "prop-types";
import {useAddNewDirectMessageMutation} from "./features/api/apiSlice";
import classNames from "classnames";

const CloseIconSVG = () => {
    return <svg aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"/>
    </svg>;
};

const ChatInitiationModalComponent = ({isVisible, setIsVisible}) => {

    const [message, setMessage] = useState('');

    const closeModal = () => {
        setIsVisible(false);
    };

    const onChange = event => {
        setMessage(event.target.value);
    };

    const [addNewDirectMessage] = useAddNewDirectMessageMutation();

    const isNonEmptyString = (value) => typeof value == 'string' && value.trim().length > 0;

    const isDisabled = !isNonEmptyString(message);

    const sendDirectMessage = () => {
        const directMessage = {
            "receiver_id": 808,
            "sender_id": 404,
            "message": message,
        };
        addNewDirectMessage(directMessage).unwrap();
        window.location.replace('/chats');
    };

    return isVisible && <div
        className="bg-gray-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex">
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative bg-white rounded-sm shadow">
                <div className="flex justify-between items-start p-6 rounded-t border-b">
                    <h3 className="text-xl text-gray-500">
                        Написать сообщение
                    </h3>
                    <button type="button"
                            onClick={closeModal}
                            className="text-gray-400 bg-transparent hover:bg-gray-100 rounded-sm text-sm p-1.5 ml-auto inline-flex items-center">
                        <CloseIconSVG></CloseIconSVG>
                        <span className="sr-only">
                            Close modal
                        </span>
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    <textarea
                        className="w-full p-3 text-gray-600 text rounded-sm focus:outline-none bg-gray-50"
                        rows="5"
                        value={message}
                        onChange={onChange}>
                    </textarea>
                </div>
                <div className="flex items-center justify-between p-6 space-x-2 rounded-b border-t border-gray-200">
                    <button
                        onClick={closeModal}
                        type="button"
                        className="inline-flex items-center justify-center px-5 py-3 text-gray-500 transition bg-white border border-gray-200 rounded-sm hover:text-gray-700">
                        Отмена
                    </button>
                    <button
                        onClick={sendDirectMessage}
                        disabled={isDisabled}
                        type="button"
                        className={classNames(
                            {
                                'sm:w-auto px-5 py-3 text-white rounded-sm': true,
                                'bg-indigo-400': isDisabled,
                                'bg-indigo-800': !isDisabled,
                            })}>
                        Отправить
                    </button>
                </div>
            </div>
        </div>
    </div>;
};

ChatInitiationModalComponent.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    setIsVisible: PropTypes.func.isRequired,
};

export function ChatInitiationComponent() {

    const [isVisible, setIsVisible] = useState(false);

    const onClick = () => {
        setIsVisible(true);
    };

    return <div>
        <button onClick={onClick}>
            Написать сообщение
        </button>

        <div>
            <ChatInitiationModalComponent
                isVisible={isVisible}
                setIsVisible={setIsVisible}
            />
        </div>
    </div>;
}
