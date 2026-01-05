import "./main.css";

import { finished, ongoing, droppedCrashing, droppedBullshit, retrospectives, type GameEntry } from "./gamelist";

function createEntryBlock(entry: GameEntry): string {
    return (
        `<a href="${entry.video ? `https://youtu.be/${entry.video}&list=${entry.playlist}` : `https://youtube.com/playlist?list=${entry.playlist}`}">` +
        `<span class="game-title">${entry.title}</span>` +
        (entry.system || entry.year
            ? `<span class="game-meta">` +
              (entry.system ? `<span class="game-meta-system">${entry.system}</span>` : "") +
              (entry.year ? `<span class="game-meta-year">${entry.year}</span>` : "") +
              `</span>`
            : "") +
        `</a>` +
        (entry.extra ? `<span class="game-extra">${entry.extra}</span>` : "")
    );
}

function populateList(sectionId: string, entries: GameEntry[], reversed = false): void {
    const div = document.getElementById(sectionId);
    const ol = document.createElement("ol");
    if (reversed) {
        ol.setAttribute("reversed", "");
        entries = entries.slice().reverse();
    }
    for (const game of entries) {
        const li = document.createElement("li");
        li.innerHTML = createEntryBlock(game);
        ol.appendChild(li);
    }
    div?.appendChild(ol);
}

document.addEventListener("DOMContentLoaded", () => {
    populateList("finished", finished, true);
    populateList("ongoing", ongoing);
    populateList("dropped-crashing", droppedCrashing);
    populateList("dropped-bullshit", droppedBullshit);
    populateList("retrospectives", retrospectives);
});
