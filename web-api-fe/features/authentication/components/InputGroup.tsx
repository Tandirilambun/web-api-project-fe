import SpanValidation from "@/components/SpanValidation";

export default function InputGroup({
  label,
  input,
  wrapperClass,
  errors,
}: {
  label: React.ReactNode;
  input: React.ReactNode;
  wrapperClass?: string;
  errors?: string;
}) {
  return (
    <>
      <div className={`inputGroupWrapper ${wrapperClass}`}>
        {label}
        {input}
        {errors && <SpanValidation>{errors}</SpanValidation>}
      </div>
    </>
  );
}
