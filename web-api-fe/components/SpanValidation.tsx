import { AlertCircle } from "@deemlol/next-icons";

export default function SpanValidation({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="validation-group text-red-500 text-xs flex items-center my-1">
      <div className="size-fit">
        <AlertCircle size={16} color="#f87171" strokeWidth={2} />
      </div>
      <span className="ml-1">{children}</span>
    </div>
  );
}
