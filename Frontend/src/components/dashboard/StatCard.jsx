function StatCard({ icon, label, value = 0, caption, className = "stat-card", iconClassName = "stat-icon" }) {
  return (
    <article className={className}>
      <div className={iconClassName} aria-hidden="true">{icon}</div>
      <div>
        <span>{label}</span>
        <strong>{value ?? 0}</strong>
        {caption && <small>{caption}</small>}
      </div>
    </article>
  );
}

export default StatCard;
