# Проект: React-Burger

### Обзор
Содержание:
* Описание
* Функциональность
* Технологии

**Описание**
Сайт для заказа космических бургеров.
Цель проекта закрепить изученный материал.

**Функциональность**
Реализован пользовательский интерфейс окна "Создания бургера": просмотр ингредиентов, просмотр заказа.
В окне создания, указаны ингредиенты бургера и цена.
В окне ингредиентов указано кол-во использованных ингредиентов. 
Используется drag&drop ингредиентов в конструктор и между начинками в конструкторе.
Можно сделать заказ (условие для этого перетащите хотябы одну булку направо).
Если закрыть заказ до того как получим ответ от сервера, можно вернуться и посмотреть результат.
Если закрыть заказ после ответа от сервера (получен № заказа / ошибка), будет оформляться новый заказ при нажатии кнопки.
Данные хранятся в сторэдже, куках и локальном хранилище.
Реализован Личный кабинет, с возможностью редактировать профиль, и выйти из аккаунта.
Реализован вход в систему, востановление пароля, регистрация пользователя.
Окна регистрации недоступны авторизованному пользователю. Личный кабинет недоступен неавторизованному пользователю.
При нажатии на оформление заказы происходит переадресация на вход в аккаунт.
Типизировано по Typescript. Сторэдж тоже реализован в Typesript.


**Технологии**
html, css, js, typescript, библиотека react, redux , react-redux , redux-thunk , react-dnd , react-dnd-html5-backend, react-router-dom . Применяется шрифт JetBrains Mono и Набор UI-компонентов для курсового проекта React Developer Burger Ui Components.
Используется пакет react-intersection-observer и react-custom-scrollbars-2 для скролла ингредиентов в панели ингредиентов слева.
используется webpack, .nojekyll и normalize.css.

***Выполнил Григорьев Давид 2023***
