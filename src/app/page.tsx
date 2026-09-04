import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Method } from "@/components/sections/method";
import { Services } from "@/components/sections/services";
import { Work } from "@/components/sections/work";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const params = await searchParams;

  return (
    <>
      <Hero />
      <Services />
      <Method />
      <Work />
      <About />
      <Contact sent={params.sent === "1"} />
    </>
  );
}
