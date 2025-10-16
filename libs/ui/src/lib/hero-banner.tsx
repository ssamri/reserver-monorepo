import { ReactNode } from 'react';
import clsx from 'clsx';

export type HeroBannerProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
  titleId?: string;
};

export function HeroBanner({ eyebrow, title, description, actions, className, titleId = 'hero-title' }: HeroBannerProps) {
  return (
    <section className={clsx('rounded-4 p-5 shadow-lg bg-white', className)} aria-labelledby={titleId}>
      {eyebrow ? (
        <p className="text-uppercase fw-semibold text-primary small mb-2">{eyebrow}</p>
      ) : null}
      <h1 id={titleId} className="display-5 fw-bold">
        {title}
      </h1>
      {description ? <p className="lead text-secondary">{description}</p> : null}
      {actions ? <div className="d-flex flex-wrap gap-3 mt-4">{actions}</div> : null}
    </section>
  );
}
