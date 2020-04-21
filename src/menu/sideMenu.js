let rotated = false;
document.querySelector('.drag').addEventListener('click', (e) => {
    console.log('ded');
    let element = e.target;
    console.log(element);
    let menu = document.querySelector('#menu');
    //element.style.transitionDuration = `${1000}ms`;
    menu.style.left =!rotated ? '0' : '-15vw'
    element.style.transform = !rotated ? 'rotate(180deg)' : 'rotate(0deg)';
    rotated = !rotated;
})