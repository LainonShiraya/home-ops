import { House } from "lucide-react";
type LogoProps = {
  vertical?: boolean;
};

function Logo({ vertical = false }: LogoProps) {
  return (
    <div
      className={`flex ${vertical ? "flex-col" : "flex-row"} items-center justify-center gap-2`}
    >
      <div className="flex size-10 items-center justify-center rounded-xl bg-blue-600 text-white">
        <House size={22} strokeWidth={2.5} />
      </div>

      <span className="text-2xl font-bold tracking-tight text-slate-900">
        HomeOps
      </span>
    </div>
  );
}

export default Logo;
