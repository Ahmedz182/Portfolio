import React, { useState } from "react";
import { useSelector } from "react-redux";
import { App as AntApp, Form, Input, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Button, ConfirmDelete, PageHeader, Panel, useApi } from "./ui";

const { TextArea } = Input;

const AdminExperience = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const experiences = portfolioData?.experiences || [];
  const api = useApi();
  const { message } = AntApp.useApp();
  const [form] = Form.useForm();

  const [editing, setEditing] = useState(null); // null = closed, {} = new, role = edit
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const openEditor = (role) => {
    setEditing(role || {});
    form.resetFields();
    if (role) form.setFieldsValue(role);
  };

  const closeEditor = () => {
    if (!saving) setEditing(null);
  };

  const onFinish = async (values) => {
    setSaving(true);
    const result = editing?._id
      ? await api("post", `update-experience/${editing._id}`, values)
      : await api("post", "add-experience", values);
    setSaving(false);
    if (result.success) {
      message.success(result.message || "Role saved");
      setEditing(null);
    } else {
      message.error(result.message);
    }
  };

  const confirmDelete = async () => {
    setDeleteBusy(true);
    const result = await api("delete", `delete-experience/${deleting._id}`);
    setDeleteBusy(false);
    if (result.success) {
      message.success(result.message || "Role deleted");
      setDeleting(null);
    } else {
      message.error(result.message);
    }
  };

  const list = experiences.slice().reverse();
  const earliest = experiences[0]?.start_year;

  return (
    <>
      <PageHeader
        title="Experience"
        subtitle={
          experiences.length === 0
            ? "No roles yet. The Experience section stays hidden on the site until you add one."
            : `${experiences.length} ${experiences.length === 1 ? "role" : "roles"}${earliest ? `, since ${earliest}` : ""} · newest first, as on the site`
        }>
        <Button variant="primary" onClick={() => openEditor(null)}>
          <PlusOutlined /> Add role
        </Button>
      </PageHeader>

      {list.length === 0 ? (
        <div className="ad-empty">
          Add the roles you want on the site, with the years and what you did.
          <div>
            <Button variant="primary" onClick={() => openEditor(null)}>
              <PlusOutlined /> Add your first role
            </Button>
          </div>
        </div>
      ) : (
        <Panel>
          <table className="ad-table">
            <thead>
              <tr>
                <th style={{ width: "46%" }}>Role</th>
                <th>Company</th>
                <th>Period</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {list.map((role) => (
                <tr key={role._id}>
                  <td data-cell="role">
                    <div className="ad-row-title" style={{ whiteSpace: "normal" }}>{role.title}</div>
                    <div className="ad-row-sub ad-clamp-2" style={{ whiteSpace: "normal" }}>{role.desc}</div>
                  </td>
                  <td data-cell="company">{role.company}</td>
                  <td data-cell="period" className="num" style={{ whiteSpace: "nowrap" }}>
                    {role.start_year} – {role.end_year}
                  </td>
                  <td className="ad-cell-actions">
                    <button type="button" className="ad-link" onClick={() => openEditor(role)}>
                      Edit
                    </button>
                    <button type="button" className="ad-link ad-link-danger" onClick={() => setDeleting(role)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      )}

      <Modal
        open={editing !== null}
        title={editing?._id ? `Edit “${editing.title}”` : "Add role"}
        onCancel={closeEditor}
        footer={null}
        width={600}
        className="ad-modal"
        rootClassName="ad-portal"
        forceRender
        maskClosable={!saving}>
        <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
          <div className="ad-modal-body">
            <div className="ad-two">
              <Form.Item label="Role" name="title" rules={[{ required: true, message: "Add the job title." }]}>
                <Input placeholder="Software Engineer" />
              </Form.Item>
              <Form.Item label="Company" name="company" rules={[{ required: true, message: "Add the company." }]}>
                <Input placeholder="Artilence" />
              </Form.Item>
            </div>
            <div className="ad-two">
              <Form.Item label="Start" name="start_year" rules={[{ required: true, message: "Add the start year." }]}>
                <Input placeholder="2023" inputMode="numeric" />
              </Form.Item>
              <Form.Item
                label="End"
                name="end_year"
                extra={<span className="ad-form-hint">A year, or “Present”.</span>}
                rules={[{ required: true, message: "Add a year or “Present”." }]}>
                <Input placeholder="Present" />
              </Form.Item>
            </div>
            <Form.Item
              label="What you did"
              name="desc"
              rules={[{ required: true, message: "Describe the role in a few lines." }]}>
              <TextArea rows={4} placeholder="Shipped, owned, improved…" />
            </Form.Item>
          </div>
          <div className="ad-modal-foot">
            <Button onClick={closeEditor} disabled={saving}>Cancel</Button>
            <Button type="submit" variant="primary" loading={saving}>
              {editing?._id ? "Save role" : "Add role"}
            </Button>
          </div>
        </Form>
      </Modal>

      <ConfirmDelete
        open={!!deleting}
        name={deleting?.title}
        what="role"
        loading={deleteBusy}
        onCancel={() => !deleteBusy && setDeleting(null)}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default AdminExperience;
