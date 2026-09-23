import { ReferenceExperience } from "@/components/reference-experience";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string; service?: string }>;
}) {
  const params = await searchParams;
  return (
    <ReferenceExperience
      initialSuccess={params.sent === "1"}
      initialError={params.error === "1"}
      initialService={params.service ?? ""}
    />
  );
}
