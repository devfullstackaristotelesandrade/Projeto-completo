function EmptyState({ icon = "📭", title = "Nenhum registro encontrado", description, action, className = "empty-state" }) {
  return (
    <section className={className}>
      <div className="empty-icon" aria-hidden="true">{icon}</div>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action && <div className="empty-state-action">{action}</div>}
    </section>
  );
}

export default EmptyState;
