const {faker} = require("@faker-js/faker");

const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = 8080;


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

// todo create a list of messages and return them in the response

app.get('/', (req, res) => {
    const message = faker.lorem.text();
    res.send(message);
});

// todo: add current-user endpoint

app.get('/api/direct-messages', (req, res) => {
    const message1 = faker.lorem.text();
    const message2 = faker.lorem.text();
    // res.send([
    //     {message: message1},
    //     {message: message2}
    // ]);

    res.send(
        [
            {
                "sender": {
                    "id": 971,
                    "name": "Андрей Фадеев",
                    "userpic": "https://pp.vk.me/c624618/v624618084/14f54/akREs7gZ2BU.jpg"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Привет, тестирую личные сообщения! Какие дела?",
                "createdAt": "2017-02-20T21:33:41.262Z",
                "id": 1
            },
            {
                "sender": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "receiver": {
                    "id": 971,
                    "name": "Андрей Фадеев",
                    "userpic": "https://pp.vk.me/c624618/v624618084/14f54/akREs7gZ2BU.jpg"
                },
                "message": "Хай, да все ок, вроде работает.",
                "createdAt": "2017-02-20T21:34:10.867Z",
                "id": 2
            },
            {
                "sender": {
                    "id": 2552,
                    "name": "Минюк Никита",
                    "userpic": "https://graph.facebook.com/215489105589386/picture?type=large"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Привет! Оплатил премиум-аккаунт, что дальше?:)",
                "createdAt": "2017-03-01T14:07:03.787Z",
                "id": 96
            },
            {
                "sender": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "receiver": {
                    "id": 2552,
                    "name": "Минюк Никита",
                    "userpic": "https://graph.facebook.com/215489105589386/picture?type=large"
                },
                "message": "Привет, да я видел, дал премиум аккаунт сразу, все должно быть ок.",
                "createdAt": "2017-03-01T14:24:49.394Z",
                "id": 97
            },
            {
                "sender": {
                    "id": 2552,
                    "name": "Минюк Никита",
                    "userpic": "https://graph.facebook.com/215489105589386/picture?type=large"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Круто, вижу, спасибо!",
                "createdAt": "2017-03-01T14:32:15.592Z",
                "id": 99
            },
            {
                "sender": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "receiver": {
                    "id": 2552,
                    "name": "Минюк Никита",
                    "userpic": "https://graph.facebook.com/215489105589386/picture?type=large"
                },
                "message": "Спасибо за поддержку, удачи!",
                "createdAt": "2017-03-01T14:35:01.493Z",
                "id": 100
            },
            {
                "sender": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "receiver": {
                    "id": 848,
                    "name": "Ульященков Сергей",
                    "userpic": "https://graph.facebook.com/10210171547902954/picture?type=large"
                },
                "message": "Добрый день, на странице http://www.startupfellows.ru/me, можно самостоятельно управлять своими постами, в том числе и удалять.",
                "createdAt": "2017-04-18T19:42:44.409Z",
                "id": 355
            },
            {
                "sender": {
                    "id": 2552,
                    "name": "Минюк Никита",
                    "userpic": "https://graph.facebook.com/215489105589386/picture?type=large"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Приветствую. Возможно тебе будет интересен фидбэк: сюда люди (в том числе и я) заходят чтобы найти команду на стартап. Чаще всего (да почти всегда) имеется ввиду люди, которые готовы вступить в стартап за долю/опыт. А всё больше резюме появляются с просьбой оплаты их времени. Таких людей я могу на существующих сайтах типа hh.ru или всяких фриланс биржах пачками находить. Может быть стоит как-то разделять тех, кто готов участвовать на добровольных началах и на тех, кто хочет денег. Чтобы руководители стартапов быстрее находили то, что им нужно.",
                "createdAt": "2017-05-26T09:40:44.282Z",
                "id": 614
            },
            {
                "sender": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "receiver": {
                    "id": 2552,
                    "name": "Минюк Никита",
                    "userpic": "https://graph.facebook.com/215489105589386/picture?type=large"
                },
                "message": "Привет, спасибо за фидбек, да я понимаю эту проблему, изначально проект как раз и задумывался для людей которые хотят попробовать чтото сделать, найти друг друга, на уровне единомышленников. К сожалению сейчас не так много времени заниматься развитием проекта, возможно в этом месяце я сделаю метку по которой можно будет фильтровать работу за деньги/долю/опыт.",
                "createdAt": "2017-05-26T10:54:22.663Z",
                "id": 617
            },
            {
                "sender": {
                    "id": 3317,
                    "name": "persbel",
                    "userpic": "/img/female.png"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Андрей, спасибо за Ваш проект - очень нужно и полезно!",
                "createdAt": "2017-06-23T10:47:27.545Z",
                "id": 718
            },
            {
                "sender": {
                    "id": 848,
                    "name": "Ульященков Сергей",
                    "userpic": "https://graph.facebook.com/10210171547902954/picture?type=large"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Спасибо за сообщение, Андрей. Я там вам написал на почту (моя на всякий sergey@humaninterface.pro) посмотрите, когда будет время. ",
                "createdAt": "2017-06-08T20:21:26.032Z",
                "id": 670
            },
            {
                "sender": {
                    "id": 455,
                    "name": "Valer",
                    "userpic": "https://lh6.googleusercontent.com/-xNHr0sPi548/AAAAAAAAAAI/AAAAAAAAAVs/NF_BdApQWE0/photo.jpg"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Список чатов следует выводить от самых новых к старым. Иначе не понимаешь, а с кем говоришь",
                "createdAt": "2017-06-26T15:36:23.999Z",
                "id": 815
            },
            {
                "sender": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "receiver": {
                    "id": 3317,
                    "name": "persbel",
                    "userpic": "/img/female.png"
                },
                "message": "Спасибо, приятно! ",
                "createdAt": "2017-06-23T12:27:01.218Z",
                "id": 720
            },
            {
                "sender": {
                    "id": 3321,
                    "name": "odvance",
                    "userpic": "/img/male.png"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "как загрузить аватар? На странице профиле просто нет никаких элементов управления изображением. Или это премиум опция?",
                "createdAt": "2017-06-25T03:11:49.535Z",
                "id": 743
            },
            {
                "sender": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "receiver": {
                    "id": 3321,
                    "name": "odvance",
                    "userpic": "/img/male.png"
                },
                "message": "добрый день, сейчас загрузить аватар нельзя, он отображается у тех, кто регистрировался через соц. сети, возможно в будущем загрузка аватара будет сделана.",
                "createdAt": "2017-06-25T10:19:35.045Z",
                "id": 747
            },
            {
                "sender": {
                    "id": 455,
                    "name": "Valer",
                    "userpic": "https://lh6.googleusercontent.com/-xNHr0sPi548/AAAAAAAAAAI/AAAAAAAAAVs/NF_BdApQWE0/photo.jpg"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Чат. Сообщения выводятся несортированно по времени. Очень неудобно",
                "createdAt": "2017-06-26T15:33:38.849Z",
                "id": 813
            },
            {
                "sender": {
                    "id": 455,
                    "name": "Valer",
                    "userpic": "https://lh6.googleusercontent.com/-xNHr0sPi548/AAAAAAAAAAI/AAAAAAAAAVs/NF_BdApQWE0/photo.jpg"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Как удалить полностью чат? Многие чаты совершенно неактуальны и о них следует забыть",
                "createdAt": "2017-06-26T15:34:37.838Z",
                "id": 814
            },
            {
                "sender": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "receiver": {
                    "id": 3421,
                    "name": "Holax",
                    "userpic": "/img/male.png"
                },
                "message": " Привет, спасибо за поддрежку, добавил премиум, все обновится в течении часа.",
                "createdAt": "2017-07-10T17:02:10.404Z",
                "id": 931
            },
            {
                "sender": {
                    "id": 2850,
                    "name": "Сергей Коньков",
                    "userpic": "/img/male.png"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Че, правда сообщения работают?",
                "createdAt": "2017-07-14T18:14:33.802Z",
                "id": 965
            },
            {
                "sender": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "receiver": {
                    "id": 2850,
                    "name": "Сергей Коньков",
                    "userpic": "/img/male.png"
                },
                "message": "Ну по уебански, но работают)",
                "createdAt": "2017-07-14T18:18:16.672Z",
                "id": 966
            },
            {
                "sender": {
                    "id": 2850,
                    "name": "Сергей Коньков",
                    "userpic": "/img/male.png"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Пздц. Прогресс, ест.",
                "createdAt": "2017-07-14T18:35:36.711Z",
                "id": 967
            },
            {
                "sender": {
                    "id": 2850,
                    "name": "Сергей Коньков",
                    "userpic": "/img/male.png"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "*епт\n",
                "createdAt": "2017-07-14T18:35:44.552Z",
                "id": 968
            },
            {
                "sender": {
                    "id": 3537,
                    "name": "Маревичев Павел",
                    "userpic": "https://pp.userapi.com/c836227/v836227544/3bb5c/m9E_2nYhMNE.jpg"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Мы запускаем платформу «основанную на фрилансе» и хотели бы размещать у вас рекламу нашего сайта, но интересно количество посещений в день и месяц вашего сайта ",
                "createdAt": "2017-07-31T16:50:00.327Z",
                "id": 1102
            },
            {
                "sender": {
                    "id": 3537,
                    "name": "Маревичев Павел",
                    "userpic": "https://pp.userapi.com/c836227/v836227544/3bb5c/m9E_2nYhMNE.jpg"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Добрый день! из какого вы города ?\n",
                "createdAt": "2017-07-30T18:28:22.145Z",
                "id": 1096
            },
            {
                "sender": {
                    "id": 3537,
                    "name": "Маревичев Павел",
                    "userpic": "https://pp.userapi.com/c836227/v836227544/3bb5c/m9E_2nYhMNE.jpg"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Возможны партнерские отношения или реклама у вас на сайте ?",
                "createdAt": "2017-07-31T15:01:06.556Z",
                "id": 1100
            },
            {
                "sender": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "receiver": {
                    "id": 3537,
                    "name": "Маревичев Павел",
                    "userpic": "https://pp.userapi.com/c836227/v836227544/3bb5c/m9E_2nYhMNE.jpg"
                },
                "message": "Добрый день, а что вас интересует, можем обсудить.",
                "createdAt": "2017-07-31T15:26:16.340Z",
                "id": 1101
            },
            {
                "sender": {
                    "id": 3537,
                    "name": "Маревичев Павел",
                    "userpic": "https://pp.userapi.com/c836227/v836227544/3bb5c/m9E_2nYhMNE.jpg"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "И сколько это может стоить ??",
                "createdAt": "2017-07-31T20:57:21.518Z",
                "id": 1104
            },
            {
                "sender": {
                    "id": 3705,
                    "name": "Дмитрий ",
                    "userpic": "/img/male.png"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Андрей! Мы ищем full-timer по проекту создания умного дома. Вам было бы интересно присоединиться к нам? Проект планируем начать с внешним консультантом по разработке архитектуры. Сообщите, если интересно.",
                "createdAt": "2017-09-13T09:19:17.856Z",
                "id": 1542
            },
            {
                "sender": {
                    "id": 3785,
                    "name": "Demetrios Falcone",
                    "userpic": "https://lh6.googleusercontent.com/-AE9dHDTssWE/AAAAAAAAAAI/AAAAAAAAABI/EmwrVhBJhZo/photo.jpg"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Андрей, приветствую! Классный проект! Пишу о злободневном... Как можно удалить или отредактировать комментарий?\nТолько что тупанул и челу не в личку написал, а кинул коммент с конфиденциальными данными прямо в пост https://startupfellows.ru/vacancy/1533! Что можно сделать? Можете его убить через базу, пока поисковики не проиндексировали, а то ведь спамом завалят! :-(\nЗаранее спасибо и ещё раз спасибо за такой ценный ресурс! ;-)",
                "createdAt": "2017-10-30T15:48:20.767Z",
                "id": 1927
            },
            {
                "sender": {
                    "id": 3785,
                    "name": "Demetrios Falcone",
                    "userpic": "https://lh6.googleusercontent.com/-AE9dHDTssWE/AAAAAAAAAAI/AAAAAAAAABI/EmwrVhBJhZo/photo.jpg"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Андрей, привет ещё раз! Ура, нашел где удаляются комментарий... а то уже и в почту вам сообщение кинул!))) Все подчистил, так что не беспокойтесь! Если хотите фидбэк по проекту - могу как-нибудь собрать все замечания и выслать на почту! ;-) Проект отличный, но, к сожалению, очень медленно развивается! :-( Удачи! Дмитрий",
                "createdAt": "2017-10-30T16:27:51.787Z",
                "id": 1931
            },
            {
                "sender": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "receiver": {
                    "id": 3785,
                    "name": "Demetrios Falcone",
                    "userpic": "https://lh6.googleusercontent.com/-AE9dHDTssWE/AAAAAAAAAAI/AAAAAAAAABI/EmwrVhBJhZo/photo.jpg"
                },
                "message": "Привет, хорошо что удалось решить проблему, я только смог ответить.\nПроект полностью на энтузиазме и времени не удается много выделять, но в ближайшем будущем возможно будет новые фичи.",
                "createdAt": "2017-10-31T07:51:30.710Z",
                "id": 1933
            },
            {
                "sender": {
                    "id": 3887,
                    "name": "Бутров Виктор",
                    "userpic": "https://pp.userapi.com/c638624/v638624744/4acc0/7abvNt4n4lU.jpg"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Привет Андрей. Как оцениваешь состояние дел по проекту startupfellows.ru?",
                "createdAt": "2017-11-21T14:57:02.766Z",
                "id": 2099
            },
            {
                "sender": {
                    "id": 1088,
                    "name": "Vladimir Deshev",
                    "userpic": "https://pp.vk.me/c628817/v628817813/2c396/w9OF6Ri-3v4.jpg"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Здравствуйте, у вас не верно настроен https, браузер ff просит добавить в Исключения. Исправьте пожалуйста",
                "createdAt": "2017-11-23T14:48:22.293Z",
                "id": 2124
            },
            {
                "sender": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "receiver": {
                    "id": 1088,
                    "name": "Vladimir Deshev",
                    "userpic": "https://pp.vk.me/c628817/v628817813/2c396/w9OF6Ri-3v4.jpg"
                },
                "message": "Добрый день, да есть небольшая проблема, https://www.startupfellows.ru не поддерживается, нужны редиректы на https://startupfellows.ru, постараюсь поправить в ближайшее время",
                "createdAt": "2017-11-23T15:00:18.513Z",
                "id": 2125
            },
            {
                "sender": {
                    "id": 1088,
                    "name": "Vladimir Deshev",
                    "userpic": "https://pp.vk.me/c628817/v628817813/2c396/w9OF6Ri-3v4.jpg"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Ясно. Спасибо! Сообщество не растет? Какая посещаемость ежедневная?",
                "createdAt": "2017-11-23T17:11:08.566Z",
                "id": 2127
            },
            {
                "sender": {
                    "id": 971,
                    "name": "Андрей Фадеев",
                    "userpic": "https://pp.vk.me/c624618/v624618084/14f54/akREs7gZ2BU.jpg"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Тест https ссылок!",
                "createdAt": "2017-11-23T19:32:58.530Z",
                "id": 2131
            },
            {
                "sender": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "receiver": {
                    "id": 1088,
                    "name": "Vladimir Deshev",
                    "userpic": "https://pp.vk.me/c628817/v628817813/2c396/w9OF6Ri-3v4.jpg"
                },
                "message": "Ну растет потихоньку, само, сейчас не очень много времени на развитие получается уделять, посещаемость ~120 в сутки",
                "createdAt": "2017-11-23T19:05:14.602Z",
                "id": 2130
            },
            {
                "sender": {
                    "id": 1088,
                    "name": "Vladimir Deshev",
                    "userpic": "https://pp.vk.me/c628817/v628817813/2c396/w9OF6Ri-3v4.jpg"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Вам логическую навигацию нужно создать - существенно расширить структуру сайта. А я, собственно, планирую программиста на смарт-контракты найти через ваш сайт.",
                "createdAt": "2017-11-24T13:02:42.231Z",
                "id": 2140
            },
            {
                "sender": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "receiver": {
                    "id": 4329,
                    "name": "transmedia",
                    "userpic": "/img/male.png"
                },
                "message": "Вот страница для премиума: https://startupfellows.ru/premium\nтам яндекс форма\nhttps://money.yandex.ru/pay/carddetails.xml?requestid=60419cfe-2398-4fe5-9734-41b22fc17299",
                "createdAt": "2018-06-03T16:21:43.803Z",
                "id": 3957
            },
            {
                "sender": {
                    "id": 4329,
                    "name": "transmedia",
                    "userpic": "/img/male.png"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Андрей страница есть, а вот платежной формы на ней нет. Вот такое сообщение выдает если напрямую перейти:  \t\nThe store is returning invalid parameters. Please contact the store's customer support service. \n",
                "createdAt": "2018-06-03T18:16:22.065Z",
                "id": 3958
            },
            {
                "sender": {
                    "id": 4532,
                    "name": "Макс Бомер",
                    "userpic": "/img/male.png"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Андрей, здравствуйте!\nА вы продолжаете заниматься сайтом?\nПочему-то новые посты перестали появляться. :(",
                "createdAt": "2018-11-08T10:30:56.649Z",
                "id": 4697
            },
            {
                "sender": {
                    "id": 4532,
                    "name": "Макс Бомер",
                    "userpic": "/img/male.png"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Здравствуйте! Спасибо за помощь в прошлый раз. Сейчас пост опять застрял. Может быть, можно как-то отключить модерацию для нашего аккаунта? У нас всегда только проверенные вакансии. Или, наоборот, могу помогать вам с модерацией и остальных постов, если в этом есть необходимость (и техническая возможность). ",
                "createdAt": "2018-11-14T09:14:54.101Z",
                "id": 4722
            },
            {
                "sender": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "receiver": {
                    "id": 4532,
                    "name": "Макс Бомер",
                    "userpic": "/img/male.png"
                },
                "message": "Добрый день, аппрувнул. Думаю в скором времени будет постмодерация, как руки дойдут сделать.",
                "createdAt": "2018-11-14T09:27:53.958Z",
                "id": 4723
            },
            {
                "sender": {
                    "id": 4532,
                    "name": "Макс Бомер",
                    "userpic": "/img/male.png"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Понял, спасибо!",
                "createdAt": "2018-11-14T14:35:10.553Z",
                "id": 4726
            },
            {
                "sender": {
                    "id": 4608,
                    "name": "Семенов Александр",
                    "userpic": "https://pp.userapi.com/c830209/v830209500/1ddb15/Hn2CIyUGNfI.jpg?ava=1"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Добрый день. Отмодерируйте моё объявление пожалуйста",
                "createdAt": "2018-11-26T12:28:13.493Z",
                "id": 4773
            },
            {
                "sender": {
                    "id": 4613,
                    "name": "Дмитрий Дмитриевич",
                    "userpic": "https://lh3.googleusercontent.com/-fVuuMMRrdq8/AAAAAAAAAAI/AAAAAAAAAFk/I_8w4hCKGJ4/photo.jpg"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Здравствуйте. Подскажите, кто написал вам этот сайт? ",
                "createdAt": "2018-12-02T13:22:29.120Z",
                "id": 4809
            },
            {
                "sender": {
                    "id": 1285,
                    "name": "Галавач Лена",
                    "userpic": "https://pp.vk.me/c405620/v405620237/9ab6/Kv6sMz4FJ1k.jpg"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Привет. Подскажи пожалуйста, как сменить аватарку в профиле? ",
                "createdAt": "2019-02-26T06:44:54.913Z",
                "id": 5089
            },
            {
                "sender": {
                    "id": 5430,
                    "name": "Pitchee.ru",
                    "userpic": "/img/male.png"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Привет! Мы тут в Investinder.ru запустили Pitchee. С его помощью кто угодно сможет создать правильную презентацию о своем проекте для инвестора. Присоединяйся, потестируй (это бесплатно!), будем рады обратной связи! Прямая ссылка - www.pitchee.ru/",
                "createdAt": "2020-07-16T15:34:43.663Z",
                "id": 6868
            },
            {
                "sender": {
                    "id": 971,
                    "name": "Андрей Фадеев",
                    "userpic": "https://pp.vk.me/c624618/v624618084/14f54/akREs7gZ2BU.jpg"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Все еще работает?",
                "createdAt": "2020-12-28T10:14:22.550Z",
                "id": 8782
            },
            {
                "sender": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "receiver": {
                    "id": 971,
                    "name": "Андрей Фадеев",
                    "userpic": "https://pp.vk.me/c624618/v624618084/14f54/akREs7gZ2BU.jpg"
                },
                "message": "Похоже работает...",
                "createdAt": "2020-12-28T10:14:55.205Z",
                "id": 8783
            },
            {
                "sender": {
                    "id": 5467,
                    "name": "Digger",
                    "userpic": "/img/male.png"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Андрей, добрый день.\nНе могу вставить фото со сматрфона. \nКак это сделать? ",
                "createdAt": "2020-08-04T13:20:38.716Z",
                "id": 8594
            },
            {
                "sender": {
                    "id": 5446,
                    "name": "П.М.",
                    "userpic": "https://sun9-18.userapi.com/impf/c10758/u154844698/a_63c6cb2b.jpg?size=200x0&quality=90&sign=f5bf8115ad99511d30528130611ca2d6&c_uniq_tag=FJvoUWHhEe-U0l2GFxhxCbv4grZjEmT4oHQpsVGoC78&ava=1"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Приветствую Андрей!\nмой пост - https://startupfellows.ru/vacancy/3604\nГотов бы поддержать Вас и заодно получить премиум аккаунт на Вашем сайте, но не могу перевести деньги с Yandex кошелька, т.к. он не верифицирован. Могу оплатить/ заплатить покупку, счет. Как быть? \nС ув. П.М.",
                "createdAt": "2020-07-27T19:41:54.123Z",
                "id": 8575
            },
            {
                "sender": {
                    "id": 3642,
                    "name": "Семченков Алесь",
                    "userpic": "https://pp.userapi.com/c5259/u297239/a_c9d7d1da.jpg"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Оплатил 150руб\nОбъявление для выделения:\nhttps://startupfellows.ru/post/3843",
                "createdAt": "2021-03-19T18:47:02.621Z",
                "id": 8917
            },
            {
                "sender": {
                    "id": 5821,
                    "name": "Founder1",
                    "userpic": "/img/male.png"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Андрей, Здравствуйте! Подскажите пожалуйста, вы открыты для сотрудничества для работы над стартапом?",
                "createdAt": "2021-06-30T15:08:49.122Z",
                "id": 9065
            },
            {
                "sender": {
                    "id": 6023,
                    "name": "Dmitry92",
                    "userpic": "/img/male.png"
                },
                "receiver": {
                    "id": 404,
                    "name": "Андрей Фадеев",
                    "userpic": "https://lh5.googleusercontent.com/-5kPW_Ma5RLw/AAAAAAAAAAI/AAAAAAAAAIQ/bmeRe_nLLIg/photo.jpg"
                },
                "message": "Здравствуйте!",
                "createdAt": "2022-02-21T10:46:31.321Z",
                "id": 9422
            }
        ]
    );
});


app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});