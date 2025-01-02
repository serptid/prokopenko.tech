export class RegistrationSystem {
    constructor({ formId, successId, errorId }) {
        this.registerForm = document.getElementById(formId);
        this.successMessage = document.getElementById(successId);
        this.errorMessage = document.getElementById(errorId);
        this.users = {}; // Простая база данных для хранения пользователей

        this.init();
    }

    init() {
        this.registerForm.addEventListener("submit", (event) => {
            event.preventDefault();
            this.register();
        });
    }

    register() {
        const username = document.getElementById("reg-username").value;
        const password = document.getElementById("reg-password").value;

        if (this.users[username]) {
            // Пользователь уже существует
            this.errorMessage.textContent = "Пользователь с таким логином уже существует!";
            this.errorMessage.style.display = "block";
            this.successMessage.style.display = "none";
        } else {
            // Регистрация нового пользователя
            this.users[username] = password;
            this.successMessage.textContent = "Регистрация прошла успешно! Вы можете войти.";
            this.successMessage.style.display = "block";
            this.errorMessage.style.display = "none";
        }
    }
}

export class AuthSystem {
    constructor({ formId, errorId, containerClass, users, onSuccess }) {
        this.authForm = document.getElementById(formId);
        this.authError = document.getElementById(errorId);
        this.container = document.querySelector(containerClass);
        this.users = users; // Используем базу данных пользователей
        this.onSuccess = onSuccess;

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

        if (this.users[username] && this.users[username] === password) {
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
