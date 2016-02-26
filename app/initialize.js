import application from './application';
import { syncFiles } from './libs/file';
import scdl from './libs/soundcloud';


window.player = document.querySelector("#player");

const sync = document.querySelector("#sync-from-files");
sync.addEventListener("click", () => {
    syncFiles();
}, false);

const importSC = document.querySelector("#import");
const importURL = document.querySelector("#import-text");
importSC.addEventListener("click", () => {
    scdl.import(importURL.value);
}, false);


application.start();
