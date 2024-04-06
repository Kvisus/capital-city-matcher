const Column = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`flex flex-col gap-2 ` + className}>{children}</div>;
};
export default Column;
