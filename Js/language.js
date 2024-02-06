let translation;

async function loadTranslations(language) {
    const lang = language || localStorage.getItem('lang') || 'en';

    if (lang === 'ar') {
        const translationArabicFile = await fetch('Translation/ar.json');
        translation = await translationArabicFile.json();
    } else {
        const translationEnglishFile = await fetch('Translation/en.json');
        translation = await translationEnglishFile.json();
    }
}

function translatePage() {
    const elements = document.querySelectorAll('[data-translation-key]');

    elements.forEach(element => {
        const translationKey = element.getAttribute('data-translation-key');
        const translatedText = translation[translationKey];

        if (translatedText) {
            element.textContent = translatedText;
        }
    });

    const placeholders = document.querySelectorAll('[placeholder]');
    placeholders.forEach(placeholder => {
        const placeholderText = placeholder.getAttribute('placeholder');
        const translatedText = translation[placeholderText];

        if (translatedText) {
            placeholder.setAttribute('placeholder', translatedText);
        }
    });

    document.documentElement.dir = getCurrentLanguage() === 'ar' ? 'rtl' : 'ltr';
}

async function toggleLanguage() {
    const language = document.getElementById('language').value;
    document.documentElement.lang = language;
    localStorage.setItem('lang', language);
    await loadTranslations(language);
    translatePage();
}

function getCurrentLanguage() {
    return document.documentElement.lang;
}

window.addEventListener('DOMContentLoaded', async () => {
    const storedLang = localStorage.getItem('lang');
    await loadTranslations(storedLang);
    translatePage();
});
