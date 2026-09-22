export default function Button({
    type,
    children,
    onClick,
    className,
}: {
    type: "submit" | "reset" | "button";
    children: React.ReactNode;
    onClick?: () => void;
    className: string;
}) {
    return <>
    <button type={type} onClick={onClick} className={className}>{children}</button>
    </>
}