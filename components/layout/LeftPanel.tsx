import { Panel } from "@/components/hud/Panel";
import { Label } from "@/components/hud/Label";
import { NavButton } from "@/components/layout/NavButton";
import { StatusDot } from "@/components/hud/StatusDot";
import { NAV_ITEMS } from "@/lib/data/nav";
import { PROFILE } from "@/lib/data/profile";

/** Left command rail — navigation, identity readout, quick links. Desktop only. */
export function LeftPanel() {
  return (
    <aside className="hidden lg:flex lg:flex-col lg:gap-4">
      {/* Navigation */}
      <Panel label="NAVIGATION" code="NAV" dense>
        <nav aria-label="Primary modules" className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <NavButton key={item.id} item={item} />
          ))}
        </nav>
      </Panel>

      {/* Identity readout */}
      <Panel label="OPERATOR" code="ID" dense>
        <dl className="space-y-2.5">
          <Row label="CALLSIGN" value={PROFILE.callsign} />
          <Row label="SERIAL" value={PROFILE.serial} />
          <Row label="CLEARANCE" value={PROFILE.clearance} accent />
          <div className="flex items-center justify-between">
            <Label>STATUS</Label>
            <span className="flex items-center gap-1.5">
              <StatusDot tone="online" />
              <span className="mono text-[11px] text-text">{PROFILE.status}</span>
            </span>
          </div>
        </dl>
      </Panel>

      {/* Quick links */}
      <Panel label="QUICK LINKS" code="LNK" dense>
        <ul className="space-y-1">
          {PROFILE.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="mono group flex items-center justify-between px-1 py-1.5 text-[11px] text-dim transition-colors hover:text-accent"
              >
                <span className="flex items-center gap-2">
                  <span className="text-edge-bright group-hover:text-accent">▸</span>
                  {link.label}
                </span>
                <span className="opacity-0 transition-opacity group-hover:opacity-100">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </Panel>
    </aside>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <Label>{label}</Label>
      <span
        className={`mono text-[11px] ${accent ? "text-accent" : "text-text"}`}
      >
        {value}
      </span>
    </div>
  );
}
