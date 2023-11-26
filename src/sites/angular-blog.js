// 浏览器打开 https://blog.angular.io/introducing-angular-v17-4d7033312e4b 看看效果
export default function(registerCmd) {
    registerCmd({
        name: 'TOC of Help',
        match: ({hostname, pathname}) =>  {
          if(hostname !== 'blog.angular.io') return false;
          return !!pathname.length;
        },
        handle() {
          const links = [...document.querySelectorAll('article')[0].querySelectorAll('h1,h2,h3,h4')]
            .map(h => {
              const level = +h.tagName.slice(1);
              const indentSpaces = '&nbsp;&nbsp;&nbsp;&nbsp;';
              const textSpace = new Array(level-1).fill(indentSpaces);
              return {
                text: textSpace+h.textContent.trim(),
                href: `#${h.id}`,
                level: +h.tagName.slice(1)
              }
            })
            .map(item => {
              return `<li><a href="${item.href}">${item.text}</a></li>`
            });
          const style=`
            position: fixed;
            right: 50px;
            top: 100px;
            background: #ddd;
            padding: 5px;
            list-style-position: inside;
        `;
          const toc = `<ul style="${style}">${links.join('')}</ul>`;
          document.body.insertAdjacentHTML('beforeend', toc);
          document.body.insertAdjacentHTML('beforeend', `<style>html {
            scroll-behavior: smooth;
          }</style>`);
        }
      });
}