import "./main.css";

import { finished, ongoing, droppedCrashing, droppedBullshit, retrospectives, type GameEntry } from "./gamelist";

function createEntryBlock(entry: GameEntry): string {
    const url = entry.video
        ? `https://youtu.be/${entry.video}&list=${entry.playlist}`
        : `https://youtube.com/playlist?list=${entry.playlist}`;
    let text = "";
    text += `<a href="${url}">`;
    text += `<span class="game-title">${entry.title}</span>`;
    if (entry.system || entry.year) text += `<span class="game-meta">`;
    if (entry.system) text += `<span class="game-meta-system">${entry.system}</span>`;
    if (entry.year) text += `<span class="game-meta-year">${entry.year}</span>`;
    if (entry.system || entry.year) text += `</span>`;
    text += `</a>`;
    if (entry.extra) text += `<span class="game-extra">${entry.extra}</span>`;
    return text;
}

function populateList(sectionId: string, entries: GameEntry[], reversed = false): void {
    const div = document.getElementById(sectionId);
    const ol = document.createElement("ol");
    div?.appendChild(ol);
    if (reversed) {
        ol.setAttribute("reversed", "");
        entries = entries.slice().reverse();
    }
    for (const game of entries) {
        const li = document.createElement("li");
        li.innerHTML = createEntryBlock(game);
        ol.appendChild(li);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    populateList("finished", finished, true);
    populateList("ongoing", ongoing);
    populateList("dropped-crashing", droppedCrashing);
    populateList("dropped-bullshit", droppedBullshit);
    populateList("retrospectives", retrospectives);
});
