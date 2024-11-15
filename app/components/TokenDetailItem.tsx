interface TokenDetailItemProps {
  label: string;
  value: string | number;
  className?: string;
}

export default function TokenDetailItem({
  label,
  value,
  className,
}: TokenDetailItemProps) {
  return (
    <div className="flex flex-col">
      <p className="text-gray-400 text-sm">{label}</p>
      <p className={`${className} font-semibold`}>{value}</p>
    </div>
  );
}
