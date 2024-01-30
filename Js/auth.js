let userId = localStorage.getItem('userId')
if (!userId) {
    window.location.href = 'index.html';
}