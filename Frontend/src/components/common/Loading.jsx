function Loading({ message = "Carregando...", description = "", className = "app-loading" }) {
  return (
    <div className={className} role="status" aria-live="polite">
      <span className="loading-spinner" aria-hidden="true" />
      <h2>{message}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export default Loading;
