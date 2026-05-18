import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function SectionTitle({ title, subtitle, children }: SectionTitleProps) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <h2 className="text-4xl md:text-5xl font-serif font-medium tracking-wide mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-brand-text/70 tracking-wide">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
