let translation;

async function loadTranslations() {
    if (getCurrentLanguage() === 'ar') {
        const translationArabicFile = await fetch('Translation/ar.json');
        translation = await translationArabicFile.json();
    }
    else {
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
            document.documentElement.dir = getCurrentLanguage() === 'ar' ? 'rtl' : 'ltr';

        }
    });
}

async function toggleLanguage() {
    var language = document.getElementById('language');
    document.documentElement.lang = language.value;
    await loadTranslations();
    translatePage();


}

function getCurrentLanguage() {
    return document.documentElement.lang;
}

window.addEventListener('DOMContentLoaded', async () => {
    await loadTranslations();
    translatePage();
});