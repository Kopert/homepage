import type { Plugin } from "vite";

import * as gamelist from "./gamelist";

export default function injectGamelists(): Plugin {
    return {
        name: "inject-gamelists",

        transformIndexHtml: {
            handler(html: string): string {
                function createEntryBlock(entry: gamelist.GameEntry): string {
                    return (
                        `<li>` +
                        `<a href="${entry.video ? `https://youtu.be/${entry.video}&list=${entry.playlist}` : `https://youtube.com/playlist?list=${entry.playlist}`}">` +
                        `<span class="game-title">${entry.title}</span>` +
                        (entry.system || entry.year
                            ? `<span class="game-meta">` +
                              (entry.system ? `<span class="game-meta-system">${entry.system}</span>` : "") +
                              (entry.year ? `<span class="game-meta-year">${entry.year}</span>` : "") +
                              `</span>`
                            : "") +
                        `</a>` +
                        (entry.extra ? `<span class="game-extra">${entry.extra}</span>` : "") +
                        `</li>`
                    );
                }
                function createList(entries: gamelist.GameEntry[], reversed = false): string {
                    return (
                        `<ol${reversed ? ' reversed=""' : ""}>` +
                        (reversed ? entries.slice().reverse() : entries).map(createEntryBlock).join("") +
                        `</ol>`
                    );
                }
                const sections = {
                    finished: createList(gamelist.finished, true),
                    ongoing: createList(gamelist.ongoing),
                    droppedCrashing: createList(gamelist.droppedCrashing),
                    droppedBullshit: createList(gamelist.droppedBullshit),
                    retrospectives: createList(gamelist.retrospectives),
                };
                for (const [id, content] of Object.entries(sections)) html = html.split(`<!-- ${id} -->`).join(content);
                return html;
            },
        },
    };
}
