// Элемент для вывода текста
const output = document.getElementById("output");

// Элемент для вывода меню
const outputArea = document.getElementById("output-area");

// Элемент для вывода текста после меню
const outputBottom = document.getElementById("bottom-output");

// Текст, который выводится первым
const introText = "Добро пожаловать на мой сайт.\nМеня зовут\n  ";

// Пункты меню
const menuItems = [
    { text: "1. Мой VK", link: "https://vk.com/oo0010090"},
    { text: "2. Мой Telegram", link: "https://t.me/ProkopenkoSR"},
    { text: "3. Мой GitHub", link: "https://github.com/serptid"},
    { text: "4. Мой Discord", link: "https://discord.com/users/sery0zha"},
    { text: "5. Мой Steam", link: "https://steamcommunity.com/id/SERP_TID"},
    { text: "6. Мой Spotify", link: "https://open.spotify.com/user/31xappvpl5vfcxp5mw6oslo4zpha?si=47467846e8cc4f60"}
];

// Текст, который выводится после меню
const bottomText = "\nЭто текст, который выводится после меню.";

// Функция для побуквенного вывода текста
function typeText(text, element, callback, speed = 50) {
    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text[i];
            i++;
        } else {
            clearInterval(interval);
            if (callback) callback(); // Вызываем коллбэк после завершения
        }
    }, speed);
}

// Функция для побуквенного добавления меню
function typeMenuItem(menuItem, callback) {
    let i = 0;

    // Создаём элемент ссылки
    const menuLink = document.createElement("a");
    menuLink.href = menuItem.link;
    menuLink.target = "_blank";
    menuLink.className = "menu-item";

    outputArea.appendChild(menuLink);

    const interval = setInterval(() => {
        if (i < menuItem.text.length) {
            menuLink.textContent += menuItem.text[i];
            i++;
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, 50);
}

// Функция для запуска вывода меню
function startMenu(callback) {
    const renderMenu = (index) => {
        if (index < menuItems.length) {
            typeMenuItem(menuItems[index], () => renderMenu(index + 1));
        } else if (callback) {
            callback(); // Вызываем коллбэк после завершения меню
        }
    };
    renderMenu(0);
}

// Последовательный запуск функций
typeText(introText, output, () => {
    startMenu(() => {
        typeText(bottomText, outputBottom); // Выводим bottomText после меню
    });
});
