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
