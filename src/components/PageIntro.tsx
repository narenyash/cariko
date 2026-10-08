export default function PageIntro({
  kicker,
  title,
  children,
}: {
  kicker?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-24 sm:px-8 sm:pt-32">
      {kicker && <p className="text-xs font-semibold uppercase tracking-wider text-champagne">{kicker}</p>}
      <h1 className="mt-2 font-display text-5xl italic leading-[1.02] sm:text-6xl">{title}</h1>
      {children && <div className="mt-4 max-w-2xl text-lg text-bone/75">{children}</div>}
    </div>
  );
}
