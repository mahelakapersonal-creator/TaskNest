import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import StatCard from "../components/StatCard";
import TaskFilters from "../components/TaskFilters";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

const Icon = {
  total: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
  ),
  pending: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
  ),
  completed: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
  ),
  high: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22V4a1 1 0 0 1 1-1h11l-2 4 2 4H5"/></svg>
  ),
};

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });
  const [filters, setFilters] = useState({ search: "", status: "", priority: "" });
  const [editing, setEditing] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadStats = useCallback(async () => {
    const { data } = await api.get("/tasks/stats");
    setStats(data);
  }, []);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    const params = {};
    if (filters.search) params.search = filters.search;
    if (filters.status) params.status = filters.status;
    if (filters.priority) params.priority = filters.priority;
    const { data } = await api.get("/tasks", { params });
    setTasks(data);
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const refresh = async () => {
    await Promise.all([loadTasks(), loadStats()]);
  };

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (task) => {
    setEditing(task);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
  };

  const handleSubmit = async (form) => {
    if (editing) {
      await api.put(`/tasks/${editing._id}`, form);
    } else {
      await api.post("/tasks", form);
    }
    closeForm();
    refresh();
  };

  const handleToggle = async (task) => {
    await api.put(`/tasks/${task._id}`, {
      status: task.status === "Completed" ? "Pending" : "Completed",
    });
    refresh();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return;
    await api.delete(`/tasks/${id}`);
    refresh();
  };

  return (
    <div className="mx-auto max-w-5xl px-4 pb-28 pt-6 sm:pb-12">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Hello, {user?.name?.split(" ")[0] || "there"} 👋
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Here's what's on your plate today.
          </p>
        </div>
        <button onClick={openCreate} className="btn-primary hidden sm:inline-flex">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          New task
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total tasks" value={stats.total} color="brand" icon={Icon.total} />
        <StatCard label="Pending" value={stats.pending} color="amber" icon={Icon.pending} />
        <StatCard label="Completed" value={stats.completed} color="green" icon={Icon.completed} />
        <StatCard label="High priority" value={stats.byPriority?.high ?? 0} color="rose" icon={Icon.high} />
      </div>

      {/* Filters */}
      <div className="mb-5">
        <TaskFilters filters={filters} setFilters={setFilters} />
      </div>

      {/* Task list */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="card h-36 animate-pulse bg-slate-100/60" />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <div className="card flex flex-col items-center justify-center px-6 py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-600">
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          </span>
          <h3 className="mt-4 text-lg font-bold text-slate-900">No tasks yet</h3>
          <p className="mt-1 max-w-xs text-sm text-slate-500">
            Create your first task and start staying on top of your day.
          </p>
          <button onClick={openCreate} className="btn-primary mt-5">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
            Add a task
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onToggle={handleToggle}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Mobile floating action button */}
      <button
        onClick={openCreate}
        aria-label="New task"
        className="btn-primary fixed bottom-6 right-5 z-30 h-14 w-14 rounded-full p-0 shadow-glow sm:hidden"
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
      </button>

      <TaskForm
        open={formOpen}
        editing={editing}
        onSubmit={handleSubmit}
        onClose={closeForm}
      />
    </div>
  );
};

export default Dashboard;
