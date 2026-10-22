import { existsSync } from "node:fs";
import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

const roots = [
	"src/content/pages",
	"public/assets/webflow/styles",
	"public/assets/webflow/scripts",
];
const files = [];

for (const root of roots) {
	const pending = [root];
	while (pending.length) {
		const directory = pending.pop();
		for (const name of await readdir(directory)) {
			const file = join(directory, name);
			if ((await stat(file)).isDirectory()) pending.push(file);
			else files.push(file);
		}
	}
}

const missing = new Set();
const publicDirectories = /^\/assets\/webflow\//;

for (const file of files) {
	const contents = await readFile(file, "utf8");
	const references = [...contents.matchAll(/(?:src|href|poster|data-poster-url|data-video-urls|srcset)="([^"]+)"/g)]
		.flatMap((match) => match[1].split(",").map((value) => value.trim().split(/\s+/)[0]));

	for (const match of contents.matchAll(/url\(["']?([^)"']+)/g)) {
		references.push(match[1]);
	}

	for (let reference of references) {
		if (!reference || /^(?:https?:|data:|mailto:|#|javascript:)/.test(reference)) continue;
		reference = reference.split(/[?#]/, 1)[0];

		let target;
		if (reference.startsWith("/")) {
			if (!publicDirectories.test(reference)) continue;
			target = join("public", decodeURIComponent(reference));
		} else if (file.startsWith("public/")) {
			target = resolve(dirname(file), decodeURIComponent(reference));
		} else {
			continue;
		}

		if (!existsSync(target)) missing.add(`${file} -> ${reference}`);
	}
}

if (missing.size) {
	console.error(`Missing local references:\n${[...missing].join("\n")}`);
	process.exitCode = 1;
} else {
	console.log("Asset audit: no missing local references in editable pages, CSS, or JS.");
}
