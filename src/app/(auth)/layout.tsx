import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main lang="en">
      <Header transparent={true} />
      <div>{children}</div>
    </main>
  );
}