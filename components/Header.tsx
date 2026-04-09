import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight text-slate-900">
          Seal MVP
        </Link>
        <nav className="flex items-center gap-6 text-sm text-slate-600">
          <Link href="/pricing" className="hover:text-slate-900">
            Pricing
          </Link>
          <Link href="/history" className="hover:text-slate-900">
            History
          </Link>
        </nav>
      </div>
    </header>
  );
}
