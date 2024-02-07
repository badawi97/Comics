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
            await loadDynamicContentContainer(translationKey);
            sidebarItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            item.classList.add('active');
        });
    });

    loadDefaultPage();
}

function logOut() {
    localStorage.clear();
    window.location.href = "index.html";

}

async function loadDynamicContentContainer(translationKey) {
    const dynamicContentContainer = document.getElementById('dynamicContentContainer');

    const htmlPage = await fetch(`${translationKey}.html`);
    const jsFile = await fetch(`./Js/${translationKey}.js`);
    var ksFileContent = await jsFile.text();
    eval(ksFileContent)


    if (htmlPage.ok) {
        dynamicContentContainer.innerHTML = await htmlPage.text();
    } else {
        console.error(`Failed to fetch content for ${translationKey}`);
    }
}

async function uploadCover() {
    var formData = new FormData();
    formData.append('imageFile', document.getElementById('imageFile').files[0]);
    formData.append('imageFiles', document.getElementById('imageFiles').files[0]);
    formData.append('title', document.getElementById('title').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('comicsTypes', document.getElementById('comicsTypes').value);
    formData.append('publishedBy', localStorage.getItem('userId'));

    try {
        var response = await fetch('./Php/upload.php', {
            method: 'POST',
            body: formData
        });
        var data = await response.json();
        console.log('Image uploaded:', data);
        alert("Comic have been Created !")
        loadDynamicContentContainer('explore-comics');
        // Handle the response as needed
    } catch (error) {
        console.error('Error uploading image:', error);
    }
}

document.getElementById('displayUserName').innerHTML = localStorage.getItem('userName')
window.addEventListener('load', setSidebarHeight);

window.addEventListener('resize', setSidebarHeight);

document.addEventListener('DOMContentLoaded', navigateSidebarItems());
