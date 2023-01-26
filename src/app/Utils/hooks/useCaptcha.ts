export const useCaptcha = () => {
    const setCaptcha = () => {
        let characters = '';
        let n = Math.round((Math.random() * 100 + 1) * (Math.random() * 10 + 1));

        for (let i = 0; i < 5 + n % 4; i++) {
            characters += choices[Math.round(Math.random() * 620 % 61)]
        }

        return characters;
    }
    let captcha = setCaptcha()
    return [captcha, setCaptcha];
}

const choices = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';