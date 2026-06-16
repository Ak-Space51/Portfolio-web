import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="font-mono text-sm uppercase tracking-[0.4em] text-accent">
          ERROR // 404
        </p>
        <h1 className="mt-3 font-display text-5xl font-bold uppercase tracking-wide text-text text-glow">
          SIGNAL LOST
        </h1>
        <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted">
          The requested module could not be located.
        </p>
        <Link
          href="/"
          className="clip-btn mt-6 inline-block border border-accent-active bg-accent-active/10 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-accent-active transition-colors hover:bg-accent-active/20"
        >
          RETURN TO SYSTEM
        </Link>
      </div>
    </div>
  );
}
