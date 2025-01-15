// config.ts
export const ENV = {
    BASE_URL: process.env.BASE_URL || 'https://gymlog.ru',
    HEADLESS: process.env.HEADLESS === 'true', // Read from environment variable
    TIMEOUT: process.env.TIMEOUT ? parseInt(process.env.TIMEOUT) : 5000, // Use fallback
    DEBUG: false  // Correctly parse the DEBUG environment variable
};

export const SELECTORS = {
    LOGIN: {
        EMAIL_INPUT: '#email',
        PASSWORD_INPUT: '#password',
        LOGIN_BUTTON: '.login-button',
        APPLY_DATA_BUTTON: '.btn.btn-primary.pull-right',
        ERROR_MESSAGE: '.alert.result.alert-danger',
    },
    REGISTRATION: {
        //EMAIL_INPUT: 'input[name="email"]',
        EMAIL_INPUT: '.form-wrapper.registration input[name="email"]',
        REGISTER_BUTTON: '.registration-button.scroll',
        ERROR_MESSAGE: '.description.result.error',
        FREE_WORK_BUTTON_TEXT: 'Начать работу бесплатно',
    },
};
