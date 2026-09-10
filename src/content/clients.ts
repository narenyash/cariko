/**
 * "Who we've driven" — the source catalog names specific celebrities and
 * officials, but personality rights are enforceable in India and no written
 * permission has been confirmed for any of them. Until permission is on
 * file per person, these stay anonymized by role/occasion, which the
 * business's own brief says carries most of the trust signal with none of
 * the legal exposure. Swap an entry to a real name only once permission for
 * that specific person and photo is confirmed in writing.
 */
export interface ClientMoment {
  role: string;
  occasion: string;
}

export const clientMoments: ClientMoment[] = [
  { role: "A leading Bollywood actor", occasion: "on a 2024 Ahmedabad shoot" },
  { role: "A television actor and reality show host", occasion: "during wedding season" },
  { role: "A veteran Bollywood actress", occasion: "for a family function" },
  { role: "A legendary playback singer", occasion: "for a public event in the city" },
  { role: "A television actor known for a long-running drama", occasion: "on a personal visit" },
  { role: "An international professional wrestler", occasion: "on tour through Ahmedabad" },
  { role: "A leading Punjabi singer", occasion: "for a concert visit" },
  { role: "A television host and actor", occasion: "for a brand shoot" },
  { role: "A television actress", occasion: "for a personal event" },
  { role: "The president of India's cricket board", occasion: "for an official visit" },
  { role: "A European government delegation", occasion: "for an official visit" },
];
