import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Modal } from "antd";
import { useDispatch } from "react-redux";
import { ReloadTrue } from "../redux/rootSlice";
import { API_BASE } from "../config";

export const NETWORK_ERROR = "Couldn't reach the server. Check your connection and try again.";

// Every write goes through here so callers get { success, message } back
// instead of an exception, and the portfolio refetches on success.
export const useApi = () => {
  const dispatch = useDispatch();
  return async (method, path, body) => {
    try {
      const response = await axios({ method, url: `${API_BASE}/portfolio/${path}`, data: body });
      if (response.data?.success) dispatch(ReloadTrue());
      return response.data || { success: false, message: NETWORK_ERROR };
    } catch (error) {
      console.error(error);
      return { success: false, message: error.response?.data?.message || NETWORK_ERROR };
    }
  };
};

export const Spinner = () => <span className="ad-spin" aria-hidden="true" />;

export const Button = ({ variant, loading, disabled, children, className = "", ...props }) => (
  <button
    type="button"
    {...props}
    className={`ad-btn ${variant ? `ad-btn-${variant}` : ""} ${className}`}
    disabled={loading || disabled}>
    {loading ? <Spinner /> : null}
    {children}
  </button>
);

export const PageHeader = ({ title, subtitle, children }) => (
  <div className="ad-title-row">
    <div>
      <h1 className="ad-title">{title}</h1>
      {subtitle ? <div className="ad-subtitle">{subtitle}</div> : null}
    </div>
    {children ? <div className="ad-actions">{children}</div> : null}
  </div>
);

export const Panel = ({ title, meta, children, className = "" }) => (
  <section className={`ad-panel ${className}`}>
    {title ? (
      <div className="ad-panel-head">
        <h2 className="ad-panel-title">{title}</h2>
        {meta ? <div className="ad-panel-meta">{meta}</div> : null}
      </div>
    ) : null}
    {children}
  </section>
);

export const Section = ({ title, description, children }) => (
  <div className="ad-section">
    <div>
      <h3 className="ad-section-title">{title}</h3>
      {description ? <p className="ad-section-desc">{description}</p> : null}
    </div>
    <div>{children}</div>
  </div>
);

export const ConfirmDelete = ({ open, name, what, onCancel, onConfirm, loading }) => (
  <Modal
    open={open}
    title={`Delete “${name}”?`}
    onCancel={onCancel}
    footer={null}
    width={420}
    className="ad-modal"
    rootClassName="ad-portal"
    centered>
    <p className="ad-confirm-text">
      This {what} will be removed from the live site. This can't be undone.
    </p>
    <div className="ad-modal-foot">
      <Button onClick={onCancel}>Cancel</Button>
      <Button variant="danger" loading={loading} onClick={onConfirm}>
        Delete {what}
      </Button>
    </div>
  </Modal>
);

// A settings form bound to one record: tracks unsaved edits, keeps the
// fields in sync when fresh data arrives, and stamps "Saved" after a save.
export const useRecordForm = (record) => {
  const [form] = Form.useForm();
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState(null);

  useEffect(() => {
    if (record && !dirty) form.setFieldsValue(record);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [record]);

  const reset = () => {
    form.resetFields();
    form.setFieldsValue(record || {});
    setDirty(false);
  };

  return {
    form,
    dirty,
    saving,
    savedAt,
    setSaving,
    markSaved: () => {
      setDirty(false);
      setSavedAt(new Date());
    },
    reset,
    onValuesChange: () => {
      setDirty(true);
      setSavedAt(null);
    },
  };
};

export const SaveBar = ({ state, note, disabledReason }) => {
  const { dirty, saving, savedAt, reset } = state;
  let status = note;
  if (disabledReason) status = disabledReason;
  else if (dirty) status = "Unsaved changes";
  else if (savedAt) status = `Saved at ${savedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;

  return (
    <div className="ad-savebar">
      <span className="ad-savebar-note">{status}</span>
      {dirty && !disabledReason ? (
        <Button onClick={reset} disabled={saving}>
          Discard
        </Button>
      ) : null}
      <Button type="submit" variant="primary" loading={saving} disabled={!dirty || !!disabledReason}>
        Save changes
      </Button>
    </div>
  );
};

export const filled = (value) =>
  Array.isArray(value) ? value.length > 0 : value !== undefined && value !== null && String(value).trim() !== "";

export const splitTech = (value) =>
  String(value || "")
    .split(/[,|/]/)
    .map((t) => t.trim())
    .filter(Boolean);
