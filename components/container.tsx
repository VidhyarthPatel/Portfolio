import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

function Container({ children, className }: ContainerProps) {
  return (
    <div className={`${className} mx-auto w-full max-w-200 bg-neutral-50 dark:bg-neutral-900`}>
      {children}
    </div>
  );
}

export default Container;
