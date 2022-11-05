const button2 = document.querySelector('.dongmo');
const icon = document.querySelector('.bab');
const danhsach = document.querySelector('.cottrai');
const mapping = document.querySelector('.cotphai');
const mapping2 = document.querySelector('.cottrai');
const h4 = document.querySelector('h4');

button2.addEventListener('click', function () {
    const color = button2.getAttribute('img-color');
    if (color === 'pink') {
        danhsach.style.display = 'block';
        icon.classList = 'fas fa-chevron-left';
        mapping.style = 'flex: unset';
        // mapping2.style = 'flex: 0 0 36.666667%;max-width: 21%; transition: 0s;';
        button2.setAttribute('img-color', 'whit');
    } else {
        danhsach.style.display = 'none';
        icon.classList = 'fas fa-chevron-right';
        mapping.style = 'flex: unset;';
        // mapping2.style = 'flex: 0 0 0%;max-width: 8%; transition: 0.9s;';
        button2.setAttribute('img-color', 'pink');
    }
});