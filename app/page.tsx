import { Suspense } from "react";
import { OSApp } from "@/components/OSApp";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg" />}>
      <OSApp />
    </Suspense>
  );
}
