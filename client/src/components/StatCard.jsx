const SCHEMES = {
  brand: {
    icon: "bg-brand-100 text-brand-600",
    value: "text-slate-900",
  },
  amber: {
    icon: "bg-amber-100 text-amber-600",
    value: "text-slate-900",
  },
  green: {
    icon: "bg-emerald-100 text-emerald-600",
    value: "text-slate-900",
  },
  rose: {
    icon: "bg-rose-100 text-rose-600",
    value: "text-slate-900",
  },
};

const StatCard = ({ label, value, color = "brand", icon }) => {
  const scheme = SCHEMES[color] || SCHEMES.brand;
  return (
    <div className="card animate-fade-in p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${scheme.icon}`}
        >
          {icon}
        </span>
      </div>
      <p className={`mt-3 text-2xl font-extrabold ${scheme.value} sm:text-3xl`}>
        {value}
      </p>
      <p className="mt-0.5 text-xs font-medium text-slate-500 sm:text-sm">
        {label}
      </p>
    </div>
  );
};

export default StatCard;
