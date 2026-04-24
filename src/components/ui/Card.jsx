export function Card({ as: Tag = "div", className = "", padding = "p-6", children, ...rest }) {
  return (
    <Tag
      className={`bg-surface-lowest rounded-xl shadow-soft ${padding} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  );
}
