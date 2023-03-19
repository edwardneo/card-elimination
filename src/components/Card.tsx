interface CardProps {
  className?: string,
  index?: number,
  color?: string,
  onClick?(): void
}

export function Card({ className, index, color, onClick }: CardProps) {
  const style = {
    ...(color ? {backgroundColor: color} : {}),
    ...(index ? {left: `${index * 75}px`} : {})
  };

  return (
    <div
      className={`card ${className}`}
      onClick={onClick ? onClick : () => {}}
      style={style}
    />
  );
}