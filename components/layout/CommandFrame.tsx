import { NavProvider } from "@/components/layout/NavContext";
import { TopBar } from "@/components/layout/TopBar";
import { LeftPanel } from "@/components/layout/LeftPanel";
import { RightPanel } from "@/components/layout/RightPanel";
import { MobileNav } from "@/components/layout/MobileNav";

/**
 * Three-column command-center shell:
 *   TopBar (full width) · [ LeftPanel | main | RightPanel ]
 * Side rails collapse responsively; main is always the scroll surface.
 */
export function CommandFrame({ children }: { children: React.ReactNode }) {
  return (
    <NavProvider>
      <div className="relative z-10 min-h-dvh">
        <TopBar />

        <div className="mx-auto w-full max-w-[1600px] px-3 sm:px-5">
          <div className="grid grid-cols-1 gap-4 py-4 lg:grid-cols-[228px_minmax(0,1fr)] xl:grid-cols-[228px_minmax(0,1fr)_300px]">
            {/* Left rail — sticky on desktop */}
            <div className="lg:sticky lg:top-16 lg:h-[calc(100dvh-5rem)] lg:overflow-y-auto lg:pr-1">
              <LeftPanel />
            </div>

            {/* Main content */}
            <main id="main-content" className="min-w-0 pb-24 lg:pb-8">
              {children}
            </main>

            {/* Right rail — sticky on wide desktop */}
            <div className="xl:sticky xl:top-16 xl:h-[calc(100dvh-5rem)] xl:overflow-y-auto xl:pl-1">
              <RightPanel />
            </div>
          </div>
        </div>

        <MobileNav />
      </div>
    </NavProvider>
  );
}
