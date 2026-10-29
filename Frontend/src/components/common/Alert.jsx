function Alert({ children, variant = "error", className = "", title }) {
  const classes = ["app-alert", `app-alert-${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} role={variant === "error" ? "alert" : "status"}>
      {title && <strong className="app-alert-title">{title}</strong>}
      <div>{children}</div>
    </div>
  );
}

export default Alert;
