const TaskFilters = ({ filters, setFilters }) => {
  const update = (key, value) => setFilters((f) => ({ ...f, [key]: value }));

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <svg className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => update("search", e.target.value)}
          className="input pl-10"
        />
      </div>
      <select
        value={filters.status}
        onChange={(e) => update("status", e.target.value)}
        className="input sm:w-40"
      >
        <option value="">All status</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
      <select
        value={filters.priority}
        onChange={(e) => update("priority", e.target.value)}
        className="input sm:w-40"
      >
        <option value="">All priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  );
};

export default TaskFilters;
