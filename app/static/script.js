class TextWriter {
    constructor(element, speed = 50) {
        this.element = element;
        this.speed = speed;
    }

    typeText(text, callback) {
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                this.element.textContent += text[i];
                i++;
            } else {
                clearInterval(interval);
                if (callback) callback();
            }
        }, this.speed);
    }
}

class MenuRenderer {
    constructor(outputArea, menuItems, speed = 50) {
        this.outputArea = outputArea;
        this.menuItems = menuItems;
        this.speed = speed;
    }

    typeMenuItem(menuItem, callback) {
        let i = 0;

        // Создаём элемент ссылки
        const menuLink = document.createElement("a");
        menuLink.href = menuItem.link;
        menuLink.target = "_blank";
        menuLink.className = "menu-item";

        this.outputArea.appendChild(menuLink);

        const interval = setInterval(() => {
            if (i < menuItem.text.length) {
                menuLink.textContent += menuItem.text[i];
                i++;
            } else {
                clearInterval(interval);
                if (callback) callback();
            }
        }, this.speed);
    }

    renderMenu(callback) {
        const renderMenuRecursively = (index) => {
            if (index < this.menuItems.length) {
                this.typeMenuItem(this.menuItems[index], () => renderMenuRecursively(index + 1));
            } else if (callback) {
                callback();
            }
        };
        renderMenuRecursively(0);
    }
}

// Использование классов
const introText = "Добро пожаловать на мой первый сайт.\n\nМеня зовут Прокопенко Сергей Игоревич. Я студент Дальневосточного Федерального Университета.";
const bottomText = "Все права защищены© ";
const menuItems = [
    { text: "1.VK", link: "https://vk.com/oo0010090"},
    { text: "2.Telegram", link: "https://t.me/ProkopenkoSR"},
    { text: "3.GitHub", link: "https://github.com/serptid"},
    { text: "4.Discord", link: "https://discord.com/users/533201254143229962"},
    { text: "5.Steam", link: "https://steamcommunity.com/id/SERP_TID"},
    { text: "6.Spotify", link: "https://open.spotify.com/user/31xappvpl5vfcxp5mw6oslo4zpha?si=47467846e8cc4f60"}
];

const first = document.getElementById("first");
const menu = document.getElementById("menu");
const next_1 = document.getElementById("next_1");

const Write = new TextWriter(first, 20);
const WriteMenu = new MenuRenderer(menu, menuItems, 50);

Write.typeText(introText, () => {
    WriteMenu.renderMenu(() => {
        const WriteBottom = new TextWriter(next_1, 10);
        WriteBottom.typeText(bottomText);
    });
});
