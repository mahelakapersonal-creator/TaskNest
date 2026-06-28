const priorityStyles = {
  Low: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Medium: "bg-amber-50 text-amber-700 ring-amber-200",
  High: "bg-rose-50 text-rose-700 ring-rose-200",
};

const accent = {
  Low: "bg-emerald-400",
  Medium: "bg-amber-400",
  High: "bg-rose-400",
};

const fmt = (d) =>
  new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric" });

const TaskCard = ({ task, onToggle, onEdit, onDelete }) => {
  const completed = task.status === "Completed";

  return (
    <div className="card group relative animate-fade-in overflow-hidden p-4 transition hover:shadow-glow sm:p-5">
      <span
        className={`absolute inset-y-0 left-0 w-1.5 ${accent[task.priority]} ${
          completed ? "opacity-30" : ""
        }`}
      />

      <div className="flex items-start justify-between gap-3 pl-1.5">
        <div className="flex min-w-0 items-start gap-3">
          <button
            onClick={() => onToggle(task)}
            aria-label={completed ? "Mark pending" : "Mark completed"}
            className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 transition ${
              completed
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-slate-300 hover:border-brand-500"
            }`}
          >
            {completed && (
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            )}
          </button>
          <h4
            className={`truncate text-base font-semibold ${
              completed ? "text-slate-400 line-through" : "text-slate-900"
            }`}
          >
            {task.title}
          </h4>
        </div>
        <span
          className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${priorityStyles[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="mt-2 pl-8 text-sm leading-relaxed text-slate-500">
          {task.description}
        </p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2 pl-8 text-xs">
        <span
          className={`rounded-full px-2 py-0.5 font-medium ${
            completed
              ? "bg-emerald-50 text-emerald-600"
              : "bg-amber-50 text-amber-600"
          }`}
        >
          {task.status}
        </span>
        {task.dueDate && (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-500">
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            {fmt(task.dueDate)}
          </span>
        )}
        <span className="text-slate-400">Created {fmt(task.createdAt)}</span>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 pl-8">
        <button
          onClick={() => onEdit(task)}
          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
