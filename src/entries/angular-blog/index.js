import { createCommandPalette } from '../../utils';
import Site from '../../sites/angular-blog';

// Your code here...
const { registerCmd, refreshCmdMenu } = createCommandPalette();

Site(registerCmd);
refreshCmdMenu();
