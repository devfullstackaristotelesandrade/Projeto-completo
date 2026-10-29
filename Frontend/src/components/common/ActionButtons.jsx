function ActionButtons({ onEdit, onDelete, editLabel = "✏️ Editar", deleteLabel = "🗑️ Excluir", deleting = false }) {
  return (
    <div className="admin-row-actions">
      {onEdit && (
        <button type="button" className="admin-edit-button" onClick={onEdit}>
          {editLabel}
        </button>
      )}
      {onDelete && (
        <button type="button" className="admin-delete-button" onClick={onDelete} disabled={deleting}>
          {deleting ? "Aguarde..." : deleteLabel}
        </button>
      )}
    </div>
  );
}

export default ActionButtons;
