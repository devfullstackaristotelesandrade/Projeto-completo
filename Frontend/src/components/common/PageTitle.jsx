function PageTitle({ title, description, eyebrow, actions, className = "page-header" }) {
  return (
    <header className={className}>
      <div>
        {eyebrow && <span className="page-eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {actions && <div className="page-title-actions">{actions}</div>}
    </header>
  );
}

export default PageTitle;
