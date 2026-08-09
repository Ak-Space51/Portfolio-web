import { Background } from "@/components/background/Background";
import { BootSequence } from "@/components/boot/BootSequence";
import { CommandFrame } from "@/components/layout/CommandFrame";
import { Terminal } from "@/components/terminal/Terminal";
import { SystemFooter } from "@/components/layout/SystemFooter";

import { HeroModule } from "@/components/modules/HeroModule";
import { ProfileModule } from "@/components/modules/ProfileModule";
import { OperationsModule } from "@/components/modules/OperationsModule";
import { CapabilitiesModule } from "@/components/modules/CapabilitiesModule";
import { ExperienceModule } from "@/components/modules/ExperienceModule";
import { TransmitModule } from "@/components/modules/TransmitModule";

export default function Home() {
  return (
    <>
      <Background />
      <BootSequence />

      <CommandFrame>
        <HeroModule />
        <ProfileModule />
        <OperationsModule />
        <CapabilitiesModule />
        <ExperienceModule />
        <TransmitModule />
        <SystemFooter />
      </CommandFrame>

      <Terminal />
    </>
  );
}
