export default function InputGroup({
  label,
  input,
  wrapperClass,
}: {
  label: React.ReactNode;
  input: React.ReactNode;
  wrapperClass: string;
}) {
  return (
    <>
      <div className={`inputGroupWrapper ${wrapperClass}`}>
        {label}
        {input}
      </div>
    </>
  );
}
