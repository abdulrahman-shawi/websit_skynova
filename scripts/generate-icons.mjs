import { mkdirSync, readFileSync } from "node:fs";
import sharp from "sharp";

const svg = readFileSync("app/icon.svg");

mkdirSync("public/icons", { recursive: true });

await sharp(svg).resize(192, 192).png().toFile("public/icons/icon-192.png");
await sharp(svg).resize(512, 512).png().toFile("public/icons/icon-512.png");
await sharp(svg).resize(180, 180).png().toFile("public/apple-touch-icon.png");

console.log("Icons generated: 192, 512, apple-touch-icon");
