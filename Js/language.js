let translations;

async function loadTranslations() {
    const response = await fetch('Translation/ar.json');
    translations = await response.json();
}

function translatePage() {
    const elements = document.querySelectorAll('[data-translation-key]');

    elements.forEach(element => {
        const translationKey = element.getAttribute('data-translation-key');
        const translatedText = translations[translationKey];

        if (translatedText) {
            element.textContent = getCurrentLanguage() === 'ar' ? translatedText : translationKey;
        }
    });
}

async function toggleLanguage() {
    await loadTranslations(); 
    translatePage();

    document.documentElement.lang = getCurrentLanguage() === 'ar' ? 'en' : 'ar';
}

function getCurrentLanguage() {
    return document.documentElement.lang;
}

window.addEventListener('DOMContentLoaded', async () => {
    await loadTranslations();
    translatePage();
});