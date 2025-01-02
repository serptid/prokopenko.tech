export class AuthSystem {
    constructor({ formId, errorId, containerClass, validCredentials, onSuccess }) {
        this.authForm = document.getElementById(formId);
        this.authError = document.getElementById(errorId);
        this.container = document.querySelector(containerClass);
        this.validCredentials = validCredentials;
        this.onSuccess = onSuccess;

        // Инициализация события
        this.init();
    }

    init() {
        this.authForm.addEventListener("submit", (event) => {
            event.preventDefault();
            this.authenticate();
        });
    }

    authenticate() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const isValid =
            username === this.validCredentials.username &&
            password === this.validCredentials.password;

        if (isValid) {
            this.onAuthSuccess();
        } else {
            this.onAuthFail();
        }
    }

    onAuthSuccess() {
        // Скрываем контейнер аутентификации
        this.container.style.display = "none";
        this.authError.style.display = "none";
        // Вызываем переданную функцию для отображения текста
        if (typeof this.onSuccess === "function") {
            this.onSuccess();
        }
    }

    onAuthFail() {
        // Отображаем ошибку
        this.authError.textContent = "Неверный логин или пароль!";
        this.authError.style.display = "block";
    }
}
