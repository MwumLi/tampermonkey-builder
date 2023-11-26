const name = '新标签页打开外链';
const match = () => true;
function handle() {
  const allA = [...document.querySelectorAll('a')];
  allA.forEach(a => {
    a.target = '_blank';
  });
}

export default {
  name, match, handle
}