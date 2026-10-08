import { Suspense } from "react";
import BookingFlow from "@/components/BookingFlow";

export const metadata = { title: "Book a car" };

export default function BookPage() {
  return (
    <Suspense fallback={null}>
      <BookingFlow />
    </Suspense>
  );
}
