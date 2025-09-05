import "./assets/global.css";
export const metadata = {
  title: "LawGPT",
  description: "Your AI ParaLegal Assistant",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;