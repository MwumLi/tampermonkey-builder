const name = '[Markdown]复制当前页连接';
const match = () => true;
async function handle() {
  const title = document.title;
  const url = location.href;
  await navigator.clipboard.writeText(`[${title}](${url})`);
}

export default {
  name, match, handle
}