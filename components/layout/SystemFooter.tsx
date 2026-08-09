import { Divider } from "@/components/hud/Divider";
import { PROFILE } from "@/lib/data/profile";

/** Terminal-style footer closing the interface. */
export function SystemFooter() {
  return (
    <footer className="mt-12 pt-2">
      <Divider label="END OF TRANSMISSION" />
      <div className="mt-5 flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className="mono text-[11px] text-dim">
          <span className="text-accent">$</span> {PROFILE.callsign}
          <span className="text-edge-bright"> · </span>
          {PROFILE.name}
          <span className="text-edge-bright"> · </span>
          {PROFILE.role}
        </p>
        <p className="mono text-[10px] text-edge-bright">
          BUILD 2.4.1 · {new Date().getFullYear()} · ALL SYSTEMS NOMINAL
        </p>
      </div>
      <p className="mono mt-3 text-center text-[10px] text-dim/70">
        <span className="animate-blink text-accent">▮</span> session secured ·
        unauthorized access prohibited
      </p>
    </footer>
  );
}
