class TextWriter {
    constructor(outputArea, texts, speed = 50) {
        this.outputArea = outputArea;
        this.texts = texts;
        this.speed = speed;
    }

    async typeText(text) {
        return new Promise((resolve) => {
            let i = 0;
            const interval = setInterval(() => {
                if (i < text.length) {
                    this.outputArea.innerHTML += text[i]; // Используем innerHTML для контроля разметки
                    i++;
                } else {
                    clearInterval(interval);
                    resolve();
                }
            }, this.speed);
        });
    }

    async renderTexts() {
        for (const text of this.texts) {
            const span = document.createElement("span"); // Оборачиваем текст в <span>
            this.outputArea.appendChild(span);
            await this.typeText(text);
        }
    }
}



class MenuRenderer {
    constructor(outputArea, menuItems, speed = 50) {
        this.outputArea = outputArea;
        this.menuItems = menuItems;
        this.speed = speed;
    }

    async typeMenuItem(menuItem) {
        return new Promise((resolve) => {
            let i = 0;
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
                    menuLink.textContent += " "; // Добавляем пробел вместо переноса строки
                    resolve();
                }
            }, this.speed);
        });
    }

    async renderMenu() {
        for (const menuItem of this.menuItems) {
            await this.typeMenuItem(menuItem);
        }
    }
}


// Тексты
const introTexts = [
    "Добро пожаловать на мой первый сайт.\n",
    "Меня зовут Прокопенко Сергей Игоревич. Я студент Дальневосточного Федерального Университета."
];
const bottomTexts = ["Все права защищены©"];
// Меню
const menuItems = [
    { text: "1.VK", link: "https://vk.com/oo0010090" },
    { text: "2.Telegram", link: "https://t.me/ProkopenkoSR" },
    { text: "3.GitHub", link: "https://github.com/serptid" },
    { text: "4.Discord", link: "https://discord.com/users/533201254143229962" },
    { text: "5.Steam", link: "https://steamcommunity.com/id/SERP_TID" },
    { text: "6.Spotify", link: "https://open.spotify.com/user/31xappvpl5vfcxp5mw6oslo4zpha?si=47467846e8cc4f60" }
];
const bottom_menu = [
    { text: "1.Книги", link: "https://vk.com/oo0010090" },
    { text: "2.Музыка", link: "https://vk.com/oo0010090" },
    { text: "3.Фильмы", link: "https://vk.com/oo0010090" },

];


// Элементы DOM
const first = document.getElementById("first");
const menu_1 = document.getElementById("menu_1");
const second = document.getElementById("second");
const menu_2 = document.getElementById("menu_2");

// Экземпляры классов
const IntroWriter = new TextWriter(first, introTexts, 20);
const Menu1Renderer = new MenuRenderer(menu_1, menuItems, 20);
const BottomWriter = new TextWriter(second, bottomTexts, 20);
const Menu2Renderer = new MenuRenderer(menu_2, bottom_menu, 20);

// Асинхронный порядок выполнения
async function execute() {
    await IntroWriter.renderTexts();     // Вывод introTexts в first
    await Menu1Renderer.renderMenu();   // Вывод menuItems в menu_1
    await BottomWriter.renderTexts();   // Вывод bottomTexts в second
    await Menu2Renderer.renderMenu();   // Вывод bottom_menu в menu_2
    console.log("Все блоки текста и меню завершены.");
}

execute();
