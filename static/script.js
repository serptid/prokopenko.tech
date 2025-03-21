class MenuRenderer {
    constructor(outputArea, menuItems, speed = 50) {
        this.outputArea = outputArea;
        this.menuItems = menuItems;
        this.speed = speed;
    }

    typeMenuItem(menuItem, callback) {
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

// Данные меню
const menuItems = [
    { text: "1.VK", link: "https://vk.com/oo0010090"},
    { text: "2.Telegram", link: "https://t.me/ProkopenkoSR"},
    { text: "3.GitHub", link: "https://github.com/serptid"},
    { text: "4.Discord", link: "https://discord.com/users/533201254143229962"},
    { text: "5.Steam", link: "https://steamcommunity.com/id/SERP_TID"},
    { text: "6.Spotify", link: "https://open.spotify.com/user/31xappvpl5vfcxp5mw6oslo4zpha?si=47467846e8cc4f60"}
];

const menu = document.getElementById("menu");
const WriteMenu = new MenuRenderer(menu, menuItems, 50);
WriteMenu.renderMenu();
