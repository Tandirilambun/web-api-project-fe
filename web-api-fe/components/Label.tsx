export default function Label({
  htmlFor,
  fontSize = "9pt",
  children,
}: {
  htmlFor: string;
  fontSize?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <label htmlFor={htmlFor} className={`text-[${fontSize}] font-semibold`}>{children}</label>
    </>
  );
}
