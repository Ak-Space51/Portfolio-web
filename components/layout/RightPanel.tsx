import { Panel } from "@/components/hud/Panel";
import { Label } from "@/components/hud/Label";
import { Counter } from "@/components/hud/Counter";
import { SignalGraph } from "@/components/hud/SignalGraph";
import { SYSTEM_METRICS } from "@/lib/data/profile";

const FEED: { t: string; msg: string; tone?: "ok" | "accent" }[] = [
  { t: "08:42:11", msg: "build pipeline · passed", tone: "ok" },
  { t: "08:41:03", msg: "deploy · edge-prod", tone: "accent" },
  { t: "08:39:55", msg: "commit · feat/hud-grid" },
  { t: "08:37:20", msg: "tests · 482 passed", tone: "ok" },
  { t: "08:35:02", msg: "review · OP-2207 merged" },
  { t: "08:31:47", msg: "uptime check · 99.98%", tone: "ok" },
];

/** Right diagnostics rail — telemetry, signal graph, activity feed. xl+ only. */
export function RightPanel() {
  return (
    <aside className="hidden xl:flex xl:flex-col xl:gap-4">
      {/* Telemetry */}
      <Panel label="DIAGNOSTICS" code="SYS" dense>
        <div className="grid grid-cols-2 gap-3">
          {SYSTEM_METRICS.map((m) => (
            <div key={m.label} className="bg-bg/50 p-2.5 ring-1 ring-edge/70">
              <Label className="text-[8px]">{m.label}</Label>
              <div className="mt-1 text-lg text-accent">
                <Counter
                  value={m.value}
                  decimals={m.display === "%" ? 2 : 0}
                  suffix={m.display}
                />
              </div>
            </div>
          ))}
        </div>
      </Panel>

      {/* Live signal */}
      <Panel label="SIGNAL" code="NET" dense>
        <SignalGraph />
        <div className="mono mt-2 flex justify-between text-[10px] text-dim">
          <span>THROUGHPUT</span>
          <span className="text-accent">NOMINAL</span>
        </div>
      </Panel>

      {/* Activity feed */}
      <Panel label="ACTIVITY FEED" code="LOG" dense>
        <ul className="space-y-1.5">
          {FEED.map((e, i) => (
            <li key={i} className="mono flex items-start gap-2 text-[10px] leading-tight">
              <span className="text-edge-bright">{e.t}</span>
              <span
                className={
                  e.tone === "accent"
                    ? "text-accent"
                    : e.tone === "ok"
                      ? "text-text"
                      : "text-dim"
                }
              >
                {e.msg}
              </span>
            </li>
          ))}
        </ul>
      </Panel>
    </aside>
  );
}
