"use client";

import Error from "@/components/Error/Error";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return <Error message={error?.message || "404 Page not found"} />;
}
