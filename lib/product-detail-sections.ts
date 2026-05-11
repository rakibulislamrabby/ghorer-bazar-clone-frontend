import type { Product } from "@/lib/catalog-types";

export type ProductDetailSections = {
  introLine: string;
  descriptionParagraphs: string[];
  keyFeatures: string[];
  healthBenefits: string[];
  usageStorage: string[];
};

/** Split long description into readable paragraphs (sentence groups). */
function splitIntoParagraphs(text: string, maxSentencesPerParagraph = 3): string[] {
  const sentences = text
    .replace(/\s+/g, " ")
    .trim()
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean);
  const paras: string[] = [];
  for (let i = 0; i < sentences.length; i += maxSentencesPerParagraph) {
    paras.push(sentences.slice(i, i + maxSentencesPerParagraph).join(" "));
  }
  return paras.length ? paras : [text];
}

function inferHealthBenefits(product: Product): string[] {
  const name = product.name.toLowerCase();
  const tags = product.tags.map((t) => t.toLowerCase());
  const lines: string[] = [];

  if (tags.includes("honey") || name.includes("honey")) {
    lines.push("Honey has been used across cultures as a natural alternative to refined sugar in beverages and snacks.");
    lines.push("Contains natural sugars and small amounts of pollen compounds depending on floral source.");
  }
  if (
    name.includes("oil") ||
    name.includes("ghee") ||
    tags.some((t) => t.includes("oil") || t.includes("ghee"))
  ) {
    lines.push("Dietary fats support absorption of fat-soluble vitamins when eaten with vegetables and balanced meals.");
    lines.push("Moderate use aligns with general nutrition guidance; consult a dietitian for personalised advice.");
  }
  if (name.includes("date") || tags.includes("dates")) {
    lines.push("Dates provide dietary fibre and natural sweetness useful for active days or post-workout snacks.");
  }
  if (name.includes("cumin") || name.includes("spice") || tags.includes("spices")) {
    lines.push("Whole spices retain aromatic oils until you grind or toast them at home.");
  }
  if (lines.length === 0) {
    lines.push("Enjoy this product as part of a varied diet.");
    lines.push("Consult qualified professionals for medical nutrition concerns.");
  }
  return lines.slice(0, 6);
}

export function buildProductDetailSections(product: Product): ProductDetailSections {
  const keyFeatures: string[] = [];

  if (product.filterType) {
    keyFeatures.push(`Type: ${product.filterType}`);
  }
  if (product.specifications?.length) {
    for (const s of product.specifications) {
      const n = s.name.toLowerCase();
      if (n.includes("storage") || n.includes("shelf")) continue;
      keyFeatures.push(`${s.name}: ${s.value}`);
    }
  }
  if (product.sku) keyFeatures.push(`SKU / article code: ${product.sku}`);
  if (product.variants.length > 0) {
    keyFeatures.push(`Pack sizes: ${product.variants.map((v) => v.label).join(", ")}`);
  }
  if (product.tags.length > 0) {
    keyFeatures.push(`Highlights: ${product.tags.join(", ")}`);
  }
  if (keyFeatures.length === 0) {
    keyFeatures.push(`Premium listing from ${product.brand} on Ghorer Bazar.`);
  }

  const storageLines: string[] = [];
  const shelfSpec = product.specifications?.find((s) => s.name.toLowerCase().includes("shelf"));
  const storSpec = product.specifications?.find((s) => s.name.toLowerCase().includes("storage"));
  if (shelfSpec) storageLines.push(`Shelf life: ${shelfSpec.value}`);
  if (storSpec) storageLines.push(`Storage: ${storSpec.value}`);
  storageLines.push("Reseal packaging after each use to keep aroma and texture.");
  storageLines.push("Keep away from children handling hot pans or stove-top pours.");

  return {
    introLine: product.shortDescription,
    descriptionParagraphs: splitIntoParagraphs(product.description),
    keyFeatures,
    healthBenefits: inferHealthBenefits(product),
    usageStorage: storageLines,
  };
}
