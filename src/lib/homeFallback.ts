import type { City, DomainCategory, DomainProfile, DomainService } from "@/types";

/** Local catalog fallback used when the API is unavailable at build/request time. */
export const FALLBACK_CATEGORIES: DomainCategory[] = [
  { domain_category_id: "fc1", category_id: "fc1", name: "AC Services", icon: "❄️", sort_order: 0 },
  { domain_category_id: "fc2", category_id: "fc2", name: "Refrigeration", icon: "🧊", sort_order: 1 },
  { domain_category_id: "fc3", category_id: "fc3", name: "Laundry", icon: "🧺", sort_order: 2 },
  { domain_category_id: "fc4", category_id: "fc4", name: "Water Purifier", icon: "💧", sort_order: 3 },
  { domain_category_id: "fc5", category_id: "fc5", name: "Water Heating", icon: "🚿", sort_order: 4 },
  { domain_category_id: "fc6", category_id: "fc6", name: "Microwave Oven", icon: "📡", sort_order: 5 },
  { domain_category_id: "fc7", category_id: "fc7", name: "Dishwasher", icon: "🍽️", sort_order: 6 },
];

export const FALLBACK_SERVICES: DomainService[] = [
  { domain_service_id: "f1", service_id: "f1", name: "Air Conditioner Repair", description: "Repair, servicing, gas refill & performance check", category_id: "fc1", category_name: "AC Services", base_price: 499, gst_percent: 18, duration_mins: 60, is_featured: true, is_visible: true },
  { domain_service_id: "f2", service_id: "f2", name: "AC Installation", description: "Professional AC installation with safety & warranty", category_id: "fc1", category_name: "AC Services", base_price: 799, gst_percent: 18, duration_mins: 90, is_featured: true, is_visible: true },
  { domain_service_id: "f3", service_id: "f3", name: "AC Gas Refill", description: "R22, R32 & R410A gas charging", category_id: "fc1", category_name: "AC Services", base_price: 1299, gst_percent: 18, duration_mins: 60, is_featured: false, is_visible: true },
  { domain_service_id: "f4", service_id: "f4", name: "AC Uninstallation", description: "Safe AC removal & relocation service", category_id: "fc1", category_name: "AC Services", base_price: 399, gst_percent: 18, duration_mins: 60, is_featured: true, is_visible: true },
  { domain_service_id: "f5", service_id: "f5", name: "AC Deep Cleaning", description: "Foam jet cleaning for better cooling & long life", category_id: "fc1", category_name: "AC Services", base_price: 699, gst_percent: 18, duration_mins: 75, is_featured: true, is_visible: true },
  { domain_service_id: "f6", service_id: "f6", name: "AC PCB Repair", description: "Expert PCB diagnosis & repair service", category_id: "fc1", category_name: "AC Services", base_price: 1299, gst_percent: 18, duration_mins: 90, is_featured: true, is_visible: true },
  { domain_service_id: "f7", service_id: "f7", name: "AC Compressor Repair", description: "Compressor checking, repair & replacement", category_id: "fc1", category_name: "AC Services", base_price: 2499, gst_percent: 18, duration_mins: 120, is_featured: true, is_visible: true },
  { domain_service_id: "f8", service_id: "f8", name: "Refrigerator Repair", description: "Single door, double door & side-by-side models", category_id: "fc2", category_name: "Refrigeration", base_price: 399, gst_percent: 18, duration_mins: 60, is_featured: true, is_visible: true },
  { domain_service_id: "f9", service_id: "f9", name: "Washing Machine Repair", description: "Front load & top load washing machines", category_id: "fc3", category_name: "Laundry", base_price: 399, gst_percent: 18, duration_mins: 60, is_featured: false, is_visible: true },
  { domain_service_id: "f10", service_id: "f10", name: "Water Purifier Repair", description: "RO, UV & gravity water purifier service", category_id: "fc4", category_name: "Water Purifier", base_price: 499, gst_percent: 18, duration_mins: 60, is_featured: false, is_visible: true },
  { domain_service_id: "f11", service_id: "f11", name: "Geyser Repair", description: "Electric & gas water heater repair", category_id: "fc5", category_name: "Water Heating", base_price: 299, gst_percent: 18, duration_mins: 45, is_featured: false, is_visible: true },
  { domain_service_id: "f12", service_id: "f12", name: "Microwave Repair", description: "Solo, grill & convection microwave repair", category_id: "fc6", category_name: "Microwave Oven", base_price: 499, gst_percent: 18, duration_mins: 60, is_featured: false, is_visible: true },
  { domain_service_id: "f13", service_id: "f13", name: "Dishwasher Repair", description: "Dishwasher installation, service & repair", category_id: "fc7", category_name: "Dishwasher", base_price: 599, gst_percent: 18, duration_mins: 75, is_featured: false, is_visible: true },
];

export const FALLBACK_CITIES: City[] = [
  { id: "c1", name: "Bhubaneswar", state: "Odisha", is_active: true },
  { id: "c2", name: "Cuttack", state: "Odisha", is_active: true },
  { id: "c3", name: "Puri", state: "Odisha", is_active: true },
  { id: "c4", name: "Berhampur", state: "Odisha", is_active: true },
];

export const FALLBACK_PROFILE: DomainProfile = {
  id: "fallback-profile",
  domain_id: "fallback-domain",
  support_phone: "+91 9777260631",
  support_email: "support@bibekenterprises.com",
  office_address: "Plot No. 977/962, Jagyeswara Patana, Kapila Prasad, Old Town, Bhubaneswar",
  office_city: "Bhubaneswar",
  office_state: "Odisha",
  office_pincode: "751002",
  about_short: "Your trusted partner for home appliance repair and maintenance services in Bhubaneswar, Odisha.",
  facebook_url: "https://www.facebook.com/bibekenterprises",
  instagram_url: "https://www.instagram.com/bibekenterprises",
  youtube_url: "https://www.youtube.com/@bibekenterprises",
  linkedin_url: "https://www.linkedin.com/company/bibekenterprises",
};
