import React, { useState } from "react";

const STATUS = ["open", "in_progress", "closed"];
function TicketFormModal({ onClose, onSubmit, initial }) {
  const isEdit = Boolean(initial?.id);
  const [values, setValues] = useState({
    id: initial?.id,
    title: initial?.title || "",
    status: initial?.status || "open",
    description: initial?.description || "",
    priority: initial?.priority || "medium",
  });
  const [errors, setErrors] = useState({});

  function setField(name, val) {
    setValues((v) => ({ ...v, [name]: val }));
  }

  function validate() {
    const e = {};
    if (!values.title.trim()) e.title = "Title is required.";
    if (!STATUS.includes(values.status))
      e.status = 'Status must be "open", "in_progress", or "closed".';
    if (values.description && values.description.length > 1000)
      e.description = "Description is too long (max 1000 chars).";
    return e;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    onSubmit(values, isEdit);
  }

  return (
    <div className='modal-backdrop' onClick={onClose} role='presentation'>
      <div
        className='modal'
        role='dialog'
        aria-modal='true'
        aria-labelledby='ticket-form-title'
        onClick={(e) => e.stopPropagation()}
      >
        <header className='modal-head'>
          <h2 id='ticket-form-title'>
            {isEdit ? "Edit Ticket" : "Create Ticket"}
          </h2>
          <button className='modal-close' aria-label='Close' onClick={onClose}>
            ×
          </button>
        </header>

        <form className='modal-body' onSubmit={handleSubmit} noValidate>
          <div className='field'>
            <label htmlFor='title'>
              Title <span className='req'>*</span>
            </label>
            <input
              id='title'
              value={values.title}
              onChange={(e) => setField("title", e.target.value)}
              aria-describedby={errors.title ? "err-title" : undefined}
              required
            />
            {errors.title && (
              <p id='err-title' className='error'>
                {errors.title}
              </p>
            )}
          </div>

          <div className='field'>
            <label htmlFor='status'>
              Status <span className='req'>*</span>
            </label>
            <select
              id='status'
              value={values.status}
              onChange={(e) => setField("status", e.target.value)}
              aria-describedby={errors.status ? "err-status" : undefined}
              required
            >
              <option value='open'>Open</option>
              <option value='in_progress'>In Progress</option>
              <option value='closed'>Closed</option>
            </select>
            {errors.status && (
              <p id='err-status' className='error'>
                {errors.status}
              </p>
            )}
          </div>

          <div className='field'>
            <label htmlFor='description'>Description</label>
            <textarea
              id='description'
              rows='4'
              value={values.description}
              onChange={(e) => setField("description", e.target.value)}
              aria-describedby={
                errors.description ? "err-description" : undefined
              }
              placeholder='Optional details to help resolve the ticket…'
            />
            {errors.description && (
              <p id='err-description' className='error'>
                {errors.description}
              </p>
            )}
          </div>

          <div className='modal-actions'>
            <button type='button' className='btn btn-ghost' onClick={onClose}>
              Cancel
            </button>
            <button type='submit' className='btn btn-primary'>
              {isEdit ? "Save Changes" : "Create Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TicketFormModal;
