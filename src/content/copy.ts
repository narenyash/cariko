import { site, formatFollowers } from "./site";

export const trustFacts = [
  { label: "Fleet", value: `${site.fleetSize} cars across ${site.brandCount} brands` },
  { label: "Hours", value: site.hours },
  { label: "Reputation", value: `${site.rating} average across ${site.reviewCount} reviews` },
  { label: "Following", value: `${formatFollowers(site.instagramFollowers)} followers on Instagram` },
];

export const howItWorks = [
  {
    step: "Choose",
    body: "Pick a car and how you want it — wedding & occasion, chauffeur-driven, or self-drive. Estimated pricing is shown before you enter a single detail.",
  },
  {
    step: "Confirm",
    body: "Send the enquiry on WhatsApp. Our team confirms the exact rate, deposit, and what's included — nothing is charged until that's settled.",
  },
  {
    step: "Handover",
    body: "Self-drive needs a valid licence and refundable deposit at pickup. Wedding and chauffeur bookings just need the date locked in.",
  },
];

export const navLinks = [
  { href: "/fleet", label: "Fleet" },
  { href: "/book", label: "Book" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export interface Service {
  id: "weddings" | "chauffeur" | "self-drive";
  title: string;
  kicker: string;
  body: string;
  points: string[];
  image: string;
  href: string;
}

export const services: Service[] = [
  {
    id: "weddings",
    title: "Weddings & occasions",
    kicker: "Baraat to bidaai",
    body: "Vintage Rolls-Royces, limousines, open jeeps and full convoys — decorated, chauffeured, and on time for the muhurat.",
    points: [
      "Floral decoration included on wedding cars",
      "Convoys of matching cars arranged on request",
      "Uniformed chauffeur for the whole function",
    ],
    image: "/fleet/rolls-royce-golden.jpg",
    href: "/fleet?category=wedding",
  },
  {
    id: "chauffeur",
    title: "Chauffeur-driven",
    kicker: "Corporate & VIP",
    body: "Airport pickups, client visits, outstation trips and VIP movement in Mercedes, BMW, Audi, Jaguar and Range Rover.",
    points: [
      "Hourly, full-day and outstation packages",
      "Verified, experienced drivers",
      "Ahmedabad, Gandhinagar and beyond",
    ],
    image: "/fleet/mercedes-s-class.jpg",
    href: "/fleet?mode=chauffeur",
  },
  {
    id: "self-drive",
    title: "Self-drive",
    kicker: "Keys in your hand",
    body: "Thar, XUV700, Safari, Harrier and luxury sedans for weekends, road trips and the days you'd rather drive yourself.",
    points: [
      "Valid driving licence + ID at pickup",
      "Refundable security deposit",
      "Daily km allowance, clearly stated upfront",
    ],
    image: "/fleet/thar-4x4-automatic.jpg",
    href: "/fleet?mode=self-drive",
  },
];

export const faqs = [
  {
    q: "How do I book a car?",
    a: "Pick a car, choose wedding, chauffeur or self-drive, and send the enquiry on WhatsApp. Our team confirms the exact rate and availability, usually within minutes.",
  },
  {
    q: "Are the prices on the site final?",
    a: "No — they're estimated ranges so you know the ballpark. The exact rate depends on the date, hours, kilometres and decoration, and is confirmed before anything is booked.",
  },
  {
    q: "What do I need for self-drive?",
    a: "A valid driving licence, a government photo ID, and a refundable security deposit at pickup. The deposit is returned after the car comes back in the same condition.",
  },
  {
    q: "Do wedding cars come decorated?",
    a: "Most wedding and occasion cars include decoration. On ultra-luxury cars like the Rolls-Royce Ghost it's available at an extra charge — the listing says which.",
  },
  {
    q: "Do you serve outside Ahmedabad?",
    a: "Yes. We regularly cover Gandhinagar, and Vadodara and outstation trips on request with a chauffeur.",
  },
  {
    q: "How far in advance should I book?",
    a: "For weddings in peak season, book as early as you can — popular cars go weeks ahead. For self-drive and chauffeur, a day or two is usually enough.",
  },
];
