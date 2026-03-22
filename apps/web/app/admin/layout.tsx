import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getAdminSession } from "@/lib/auth";
import Link from "next/link";
import { MapPin, LayoutDashboard, List, CalendarDays, LogOut } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  async function logout() {
    "use server";
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#0D1117" }}>
      {/* Sidebar */}
      <aside
        className="w-56 shrink-0 border-r flex flex-col"
        style={{ borderColor: "#30363D", backgroundColor: "#0D1117" }}
      >
        {/* Logo */}
        <div className="p-5 border-b" style={{ borderColor: "#30363D" }}>
          <div className="flex items-center gap-2">
            <MapPin size={18} style={{ color: "#D4A853" }} />
            <span className="font-bold text-sm tracking-tight" style={{ color: "#F0F6FC" }}>
              VisitFlorence
            </span>
          </div>
          <p className="text-xs mt-1 font-mono" style={{ color: "#8B949E" }}>Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:text-white"
            style={{ color: "#8B949E" }}
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
          <Link
            href="/admin/listings"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:text-white"
            style={{ color: "#8B949E" }}
          >
            <List size={16} />
            Listings
          </Link>
          <Link
            href="/admin/events"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:text-white"
            style={{ color: "#8B949E" }}
          >
            <CalendarDays size={16} />
            Events
          </Link>
        </nav>

        {/* Footer */}
        <div className="p-3 border-t" style={{ borderColor: "#30363D" }}>
          <p className="px-3 mb-2 text-xs font-mono truncate" style={{ color: "#8B949E" }}>
            {session.email}
          </p>
          <form action={logout}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:text-white min-h-[44px]"
              style={{ color: "#8B949E" }}
            >
              <LogOut size={16} />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
