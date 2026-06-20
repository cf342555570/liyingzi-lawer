// Image optimization script — converts PNG lawyer photos to WebP and creates
// responsive variants. Run: node scripts/optimize-images.mjs

import { mkdir, readdir } from "node:fs/promises";
import { basename, dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const staticDir = join(root, "site", "static");
const distAssets = join(root, "dist", "assets");

// Files to optimize: [sourcePath, outputSizes]
// outputSizes: array of [suffix, width] pairs (largest first for social sharing)
const images = [
  {
    src: join(staticDir, "li-yingzi-lawyer.png"),
    sizes: [
      ["", 1200],        // default: 1200px wide WebP (~150KB)
      ["@2x", 1672],     // retina: original width (~250KB)
      ["-sm", 600],      // small: 600px (~50KB)
    ],
    ogWidth: 1200,
    ogHeight: 675,
  },
  {
    src: join(staticDir, "images", "li-yingzi-wechat-qr.png"),
    sizes: [["", 320]],  // QR: 320px is enough
    ogWidth: 320,
    ogHeight: 320,
  },
];

async function main() {
  for (const { src, sizes } of images) {
    try {
      const original = sharp(src);
      const metadata = await original.metadata();
      console.log(`Processing: ${basename(src)} (${metadata.width}x${metadata.height})`);

      const ext = extname(src);
      const base = basename(src, ext);
      const dir = dirname(src);

      for (const [suffix, width] of sizes) {
        const outName = `${base}${suffix}.webp`;

        // Write to static (source) directory
        const staticOut = join(dir, outName);
        await original
          .clone()
          .resize(width)
          .webp({ quality: 82 })
          .toFile(staticOut);
        const { size: staticSize } = await import("node:fs/promises").then(fs => fs.stat(staticOut));
        console.log(`  ${outName}: ${(staticSize / 1024).toFixed(0)}KB`);

        // Also copy to dist/assets if it exists
        try {
          await mkdir(join(distAssets, "images"), { recursive: true });
          const distOut = join(suffix === "" ? distAssets : join(distAssets, "images"), outName);
          await original
            .clone()
            .resize(width)
            .webp({ quality: 82 })
            .toFile(distOut);
        } catch {
          // dist/assets may not exist yet
        }
      }

      console.log(`Done: ${base}`);
    } catch (err) {
      if (err.code === "ENOENT") {
        console.log(`Skipping (not found): ${src}`);
      } else {
        console.error(`Error processing ${src}:`, err.message);
      }
    }
  }

  console.log("\nImage optimization complete.");
  console.log("Update layout.mjs and other files to reference .webp instead of .png.");
  console.log("Add <picture> elements with WebP + PNG fallback for browser compatibility.");
}

main().catch(console.error);
