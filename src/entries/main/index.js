import '../../metadata';
import LinkCmd from '../../commands/link';
import CopyLinkToMarkdownCmd from '../../commands/copy-link-to-markdown';
import SiteAngularBlog from '../../sites/angular-blog';
import { createCommandPalette } from '../../utils';

// Your code here...
const { registerCmd, refreshCmdMenu } = createCommandPalette();

registerCmd(LinkCmd);
registerCmd(CopyLinkToMarkdownCmd);


SiteAngularBlog(registerCmd);

refreshCmdMenu();