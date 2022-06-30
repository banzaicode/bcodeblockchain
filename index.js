import PKG from './package.json' assert {type: "json"};

const { name, version } = PKG;

console.log(`Iniciamos ${name} v${version}`);