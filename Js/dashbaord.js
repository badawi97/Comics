function setSidebarHeight() {
    var headerHeight = document.getElementById('headerNav').offsetHeight;
    var sidebar = document.getElementById('sidebar');
    var mainContent = document.getElementById('mainContent');
    var sidebarItems = document.getElementById('sidebarItems');

    var sidebarHight = 'auto';
    if (window.innerWidth > 768) {
        sidebarItems?.classList?.add('flex-column');
        sidebarItems?.classList?.remove('flex-row');
        sidebarHight = 'calc(100vh - ' + headerHeight + 'px)';
        mainContent.style.height = sidebarHight;
    }
    else {
        sidebarItems?.classList?.remove('flex-column');
        sidebarItems?.classList?.add('flex-row');
    }
    sidebar.style.height = sidebarHight;

}

function navigateSidebarItems() {
    // Retrieve image source from localStorage
    var imagePath = localStorage.getItem("imagePath");

    // Set image source dynamically
    if (imagePath) {
        document.getElementById("profileImage").src = imagePath;
    }
    const sidebarItems = document.querySelectorAll('[name^="sidebarItems"]');
    const dynamicContentContainer = document.getElementById('dynamicContentContainer');

    const loadDefaultPage = async () => {
        const defaultTranslationKey = 'explore-comics';
        const defaultItem = document.querySelector(`[role="${defaultTranslationKey}"]`);

        if (defaultItem) {
            defaultItem.click();
        }
        else {
            console.error(`Default item with translation key ${defaultTranslationKey} not found.`);
        }
    };

    sidebarItems.forEach(item => {
        item.addEventListener('click', async (event) => {
            const translationKey = event.target.getAttribute('role');

            const response = await fetch(`${translationKey}.html`);

            if (response.ok) {
                dynamicContentContainer.innerHTML = await response.text();

                sidebarItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                item.classList.add('active');
                if (translationKey == 'reports') {
                    loadComicsReport();
                }
            } else {
                console.error(`Failed to fetch content for ${translationKey}`);
            }
        });
    });

    loadDefaultPage();
}

function logOut() {
    localStorage.clear();
    window.location.href = "index.html";

}

window.addEventListener('load', setSidebarHeight);

window.addEventListener('resize', setSidebarHeight);

document.addEventListener('DOMContentLoaded', navigateSidebarItems());
