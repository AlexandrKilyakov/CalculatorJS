# Тестовое задание - Калькулятор 

Чтобы использовать данный калькулятор, необходимо:
1. Скачать репозиторий;
2. Разархивировать;
3. В консоли открыть корневую папку: 

![image](https://user-images.githubusercontent.com/76633175/133950771-e6456dce-5e21-4eed-985b-76c9245009a4.png)

4. Ввести следующую команду:

```
npm i -D eslint eslint_d eslint-config-airbnb eslint-config-prettier eslint-plugin-html eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier prettier stylelint stylelint-order stylelint-scss webpack webpack-cli http-server
```
5. Открыть в браузере файл "index.html".

После загрузки страницы, появится калькулятор.

![image](https://user-images.githubusercontent.com/76633175/133950889-6277575a-b1d7-417d-b6a8-657f89bc16d6.png)

Этот калькулятор может выполнять как базовые функции математики (+, -, *, /), так и более сложные.

![image](https://user-images.githubusercontent.com/76633175/133950962-e9337fb7-505f-4f37-9a38-f5dc87a185c7.png)

Чтобы правильно ввести уравнение, необходимо вводить каждый математический символ, который участвует в решении. Стоит про какой-то забыть, и придётся вводить заново. Если число под корнем, необходимо использовать как знак корня, так и скобки.

Знак "%" - Взятия остатка.

В консоли можно выполнить следующие команды:
1. npm run lint - проверяет файлы .js на возможные ошибки.
2. npm run lint:fix - исправляет файлы .js.
3. npm run webpack - сборка файлов js в один.
4. npm run start - запускает локальный сервер.

Для исправления файлов .css, можно установить плагин Stylefmt. Данные плагин переделывает файл .css по всем правилам, установленным в Stilelint.
