import AppHeader from "@/components/app-header";
import AppSidebar from "@/components/app-sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <div className="flex flex-col w-full sm:pl-14">
        <AppHeader />
        <main className="flex-1 p-4 sm:p-6 bg-muted/40">
            {children}
        </main>
      </div>
    </div>
  );
}
