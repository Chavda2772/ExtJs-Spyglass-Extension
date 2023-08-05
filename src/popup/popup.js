console.log('Popup working fine.');

document.getElementById('btnClicked').addEventListener('click', () => {
  document.getElementsByTagName('body')[0].style.backgroundColor = 'red';
});
