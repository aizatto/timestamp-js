import * as nodeModule from 'node:module';

if (typeof nodeModule.registerHooks !== 'function') {
  throw new Error(
    [
      'Unsupported Node.js runtime for this build.',
      "Cloudflare's Vite integration imports node:module.registerHooks, which is available in Node.js v22.15.0 and newer 22.x releases, or Node.js v24+.",
      `Current runtime: ${process.version}.`,
      'Update .nvmrc, local Node, or the Cloudflare Pages NODE_VERSION setting before building.',
    ].join('\n')
  );
}
