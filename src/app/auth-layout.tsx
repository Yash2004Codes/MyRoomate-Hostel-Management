import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <Link href="/" className="absolute top-8 left-8 flex items-center space-x-2 text-primary hover:opacity-80 transition-opacity">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
            <path d="M12 2L1 9.78V22h7v-6h8v6h7V9.78L12 2zm0 3.47L18.94 10H5.06L12 5.47zM9 14v6H4v-7.31l5-3.63zm11 6h-5v-6l5-3.63V20z"/>
          </svg>
        <span className="font-headline text-2xl font-bold">College Cribs</span>
      </Link>
      {children}
    </div>
  );
}
