import { Header } from '@/components/common/header';

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow bg-background">
        {children}
      </div>
       <footer className="py-6 text-center text-sm text-muted-foreground border-t mt-8">
        © {new Date().getFullYear()} College Cribs. Owner Portal.
      </footer>
    </div>
  );
}
