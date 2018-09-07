import ViewportChecker from './ViewportChecker';

window.addEventListener('DOMContentLoaded', () => {

  let vc = new ViewportChecker('.element', {offset: 200});

  console.log(vc);
});