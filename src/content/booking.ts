// EmailJS configuration — https://www.emailjs.com
// Honey Travels' own EmailJS account. Booking confirmations are sent to
// OWNER_EMAIL (set as the template's "To Email" in the EmailJS dashboard). Once a client confirmation template exists, paste
// its ID into EMAILJS_TEMPLATE_ID_CLIENT and customers get a copy too.

export const EMAILJS_SERVICE_ID = "service_zvpldei";
export const EMAILJS_TEMPLATE_ID_OWNER = "template_ycmom9n";
export const EMAILJS_TEMPLATE_ID_CLIENT = ""; // not set up yet
export const EMAILJS_PUBLIC_KEY = "wioNFZt_QJZAA3-yC";

export const OWNER_EMAIL = "narenyashwanth760@gmail.com";

export const isEmailConfigured = () =>
  Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID_OWNER && EMAILJS_PUBLIC_KEY);

export const SERVICE_TYPES = [
  "Self-drive",
  "Chauffeur-driven",
  "Wedding & occasion",
  "Airport transfer",
  "Railway station pickup",
  "Outstation",
] as const;

export const PICKUP_LOCATIONS = [
  "Ahmedabad Airport (SVPI)",
  "Ahmedabad Railway Station (Kalupur)",
  "Sabarmati Railway Station",
  "Honey Travels office, Krishna Nagar",
  "Gandhinagar",
  "Hotel / home doorstep",
  "Wedding venue",
  "Other (specify in notes)",
] as const;

export const TERMS_AND_CONDITIONS = [
  { title: "Driving licence", text: "A valid original driving licence and one government photo ID are required at pickup for self-drive." },
  { title: "Security deposit", text: "A refundable security deposit is collected at pickup and returned after the car is checked in." },
  { title: "Fuel", text: "The car is handed over with a fuel level noted at pickup and must be returned at the same level." },
  { title: "Kilometres", text: "Each booking includes a daily km allowance; extra kilometres are charged at the confirmed rate." },
  { title: "Damages & fines", text: "Any damage, traffic challans or tolls during the rental period are the renter's responsibility." },
  { title: "Pricing", text: "Prices shown are estimates. Our team confirms the exact rate and availability before the booking is final." },
];
