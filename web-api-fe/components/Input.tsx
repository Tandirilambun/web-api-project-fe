export default function Input({
  type,
  name,
  id,
  placeholder,
  className,
}: {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  className: string;
}) {
  return (
    <>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className={className}
      />
    </>
  );
}
