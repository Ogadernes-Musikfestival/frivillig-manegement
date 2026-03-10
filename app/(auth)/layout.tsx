import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <header className="flex items-center justify-between mb-24">
        <div className="flex gap-4 items-center">
          <Image
            src="/marker.svg"
            alt="Øgadernes musikfestival"
            height={36}
            width={36}
          />

          <h2 className="text-lg font-semibold tracking-widest uppercase">
            Den ømme frivillige
          </h2>
        </div>
      </header>
      {children}
    </div>
  );
}
