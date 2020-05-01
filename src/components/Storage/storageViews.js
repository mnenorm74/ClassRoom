function revertDisplay() {
    let tableStorage = document.getElementById('table');
    let iconStorage = document.getElementById('icons');

    if (tableStorage.style.display == 'none') {
        tableStorage.style.display = 'inline';
        iconStorage.style.display = 'none';
    } else {
        tableStorage.style.display = 'none';
        iconStorage.style.display = 'inline';
    }
}
export default revertDisplay