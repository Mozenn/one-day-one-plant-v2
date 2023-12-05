"use client";

import Error from "@/components/Error/Error";

export default function NotFoundPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return <Error message="404 Page not found" />;
}
