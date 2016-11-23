
class CheckForceOptionsDefault {

    constructor(input) {
        this.options = {
            scores: 0,
            width: 0,
            text: '',
            content: '',
            passIndex: 2,
            BootstrapTheme: false,
            MaterializeTheme: false,
            minimumChars: 8,
            maximumChars: 12,
            elementRender: null,
            locale: 'en',
            verdicts: {
                "en": ["Weak", "Normal", "Medium", "Strong"],
                "pt-br": ["Fraca", "Normal", "Média", "Forte"]
            },
            uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            lowercase: "abcdefghijklmnopqrstuvwxyz",
            number: "0123456789",
            characters: "!@#$%^&*?_~",
            colors: ['#500', '#800', '#f60', '#050', '#5cb85c'],
            charsSpecialCheck: {
                haveChars: false,
                lengthChars: 0
            },
            numberCheck: {
                haveNumber: false,
                lengthNumber: 0
            },
            uppercaseCheck: {
                haveUppercase: false,
                lengthUppercase: 0
            },
            lowercaseCheck: {
                haveLowercase: false,
                lengthLowercase: 0
            },
            trigger: {
                selector: input || '.field-checkforce',
                eventListener: 'keyup'
            }
        };
    }

    getOptions(){
        return this.options;
    }
}

module.exports = CheckForceOptionsDefault;
