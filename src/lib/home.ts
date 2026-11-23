import type { DomainCategory, DomainService } from "@/types";

/**
 * Homepage presentation helpers.
 *
 * Category and service artwork is resolved in this order:
 *   1. An admin/CDN image attached to the service (Cloudinary URL).
 *   2. A Cloudinary asset when NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is configured.
 *   3. The bundled fallback artwork under /public/images/home.
 *
 * The Cloudinary folder can be changed with
 * NEXT_PUBLIC_CLOUDINARY_SERVICE_FOLDER, e.g. "bibekenterprises/services".
 */
const CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim() ||
  process.env.CLOUDINARY_CLOUD_NAME?.trim();
const CLOUD_FOLDER =
  process.env.NEXT_PUBLIC_CLOUDINARY_SERVICE_FOLDER?.trim() || "bibekenterprises/services";

export const HOME_ORANGE = "#F97316";

export function cloudinaryImage(publicId: string, width = 720): string | null {
  if (!CLOUD_NAME) return null;
  const folder = CLOUD_FOLDER.replace(/^\/+|\/+$/g, "");
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_${width}/${folder}/${publicId}`;
}

export function categoryKey(name: string): string {
  const value = name.toLowerCase();
  if (value.includes("water purifier") || value.includes("ro ")) return "water-purifier";
  if (value.includes("microwave")) return "microwave";
  if (value.includes("dishwasher")) return "dishwasher";
  if (value.includes("geyser") || value.includes("water heating")) return "geyser";
  if (value.includes("washing") || value.includes("laundry")) return "washing-machine";
  if (value.includes("refrigerat")) return "refrigerator";
  return "ac";
}

const CATEGORY_LABELS: Record<string, string> = {
  "AC Services": "AC Repair",
  Refrigeration: "Refrigerator",
  Laundry: "Washing Machine",
  "Water Purifier": "Water Purifier (RO)",
  "Water Heating": "Geyser",
  "Microwave Oven": "Microwave Oven",
  Dishwasher: "Dishwasher",
};

export function categoryLabel(name: string): string {
  return CATEGORY_LABELS[name] ?? name;
}

export function categoryFallback(name: string): string {
  return `/images/home/categories/${categoryKey(name)}.webp`;
}

export function categoryImage(name: string): string {
  return cloudinaryImage(`categories/${categoryKey(name)}`, 440) ?? categoryFallback(name);
}

const SERVICE_VISUALS: Record<string, string> = {
  "Air Conditioner Repair": "ac-repair",
  "AC Installation": "ac-installation",
  "AC Uninstallation": "ac-uninstallation",
  "AC Deep Cleaning": "ac-deep-cleaning",
  "AC PCB Repair": "ac-pcb-repair",
  "AC Compressor Repair": "ac-compressor-repair",
};

const SERVICE_LABELS: Record<string, string> = {
  "Air Conditioner Repair": "AC Service & Repair",
  "Refrigerator Repair": "Refrigerator Repair",
  "Washing Machine Repair": "Washing Machine Repair",
  "Water Purifier Repair": "RO Water Purifier Service",
  "Geyser Repair": "Geyser Service",
  "Microwave Repair": "Microwave Repair",
  "Dishwasher Repair": "Dishwasher Repair",
};

export function serviceLabel(name: string): string {
  return SERVICE_LABELS[name] ?? name;
}

export function serviceFallback(service: Pick<DomainService, "name" | "category_name">): string {
  const key = SERVICE_VISUALS[service.name];
  return key
    ? `/images/home/services/${key}.webp`
    : categoryFallback(service.category_name);
}

/** Prefer an admin/CDN image, then Cloudinary, then the bundled fallback. */
export function serviceImage(
  service: Pick<DomainService, "name" | "category_name" | "image_url" | "thumbnail_url">
): string {
  const uploaded = service.image_url || service.thumbnail_url;
  if (uploaded && /^https?:\/\//i.test(uploaded)) return uploaded;
  const cloud = cloudinaryImage(`services/${categoryKey(service.category_name)}`, 720);
  return cloud ?? serviceFallback(service);
}

const POPULAR_ORDER = [
  "Air Conditioner Repair",
  "AC Installation",
  "AC Uninstallation",
  "AC Deep Cleaning",
  "AC PCB Repair",
  "AC Compressor Repair",
];

export function popularServices(services: DomainService[]): DomainService[] {
  const ranked = [...services].sort((a, b) => {
    const ai = POPULAR_ORDER.indexOf(a.name);
    const bi = POPULAR_ORDER.indexOf(b.name);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
  return ranked.slice(0, 6);
}

export function featuredService(services: DomainService[]): DomainService | null {
  return (
    services.find((s) => s.name === "AC Uninstallation") ??
    services.find((s) => s.name === "AC Installation") ??
    services[0] ??
    null
  );
}

export const CATEGORY_ORDER = [
  "AC Services",
  "Refrigeration",
  "Laundry",
  "Water Purifier",
  "Water Heating",
  "Microwave Oven",
  "Dishwasher",
];

export function orderedCategories(categories: DomainCategory[]): DomainCategory[] {
  return [...categories].sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a.name);
    const bi = CATEGORY_ORDER.indexOf(b.name);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
}
