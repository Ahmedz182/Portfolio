import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { App as AntApp, Form, Input, Modal } from "antd";
import { ExportOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, ConfirmDelete, PageHeader, filled, splitTech, useApi } from "./ui";

const { TextArea } = Input;

const ProjectImage = ({ src }) => {
  const [broken, setBroken] = useState(false);
  useEffect(() => setBroken(false), [src]);
  if (!src || broken) return <div className="ad-card-media">No image</div>;
  return (
    <div className="ad-card-media">
      <img src={src} alt="" loading="lazy" onError={() => setBroken(true)} />
    </div>
  );
};

const AdminProject = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const projects = portfolioData?.projects || [];
  const api = useApi();
  const { message } = AntApp.useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [editing, setEditing] = useState(null); // null = closed, {} = new, project = edit
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const imgPreview = Form.useWatch("img", form);

  const openEditor = (project) => {
    setEditing(project || {});
    form.resetFields();
    if (project) form.setFieldsValue(project);
  };

  // Deep links from the overview: "Add project" and a row's "Edit".
  useEffect(() => {
    const { create, edit } = location.state || {};
    if (create) openEditor(null);
    if (edit) {
      const project = projects.find((p) => p._id === edit);
      if (project) openEditor(project);
    }
    if (create || edit) navigate(location.pathname, { replace: true, state: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  const closeEditor = () => {
    if (!saving) setEditing(null);
  };

  const onFinish = async (values) => {
    setSaving(true);
    const result = editing?._id
      ? await api("post", `update-project/${editing._id}`, values)
      : await api("post", "add-project", values);
    setSaving(false);
    if (result.success) {
      message.success(result.message || "Project saved");
      setEditing(null);
    } else {
      message.error(result.message);
    }
  };

  const confirmDelete = async () => {
    setDeleteBusy(true);
    const result = await api("delete", `delete-project/${deleting._id}`);
    setDeleteBusy(false);
    if (result.success) {
      message.success(result.message || "Project deleted");
      setDeleting(null);
    } else {
      message.error(result.message);
    }
  };

  const noPreview = projects.filter((p) => !filled(p.preview)).length;
  const list = projects.slice().reverse();

  return (
    <>
      <PageHeader
        title="Projects"
        subtitle={
          projects.length === 0
            ? "Nothing on the site yet."
            : `${projects.length} on the site, newest first${noPreview ? ` · ${noPreview} without a preview link` : ""}`
        }>
        <Button variant="primary" onClick={() => openEditor(null)}>
          <PlusOutlined /> Add project
        </Button>
      </PageHeader>

      <div className="ad-cards">
        {list.length === 0 ? (
          <div className="ad-empty">
            No projects yet. Each one shows on the site with its image, stack and a preview link.
            <div>
              <Button variant="primary" onClick={() => openEditor(null)}>
                <PlusOutlined /> Add your first project
              </Button>
            </div>
          </div>
        ) : (
          list.map((project) => (
            <article className="ad-card" key={project._id}>
              <ProjectImage src={project.img} />
              <div className="ad-card-body">
                <h2 className="ad-card-title">{project.title}</h2>
                <div className="ad-tags">
                  {splitTech(project.technology).map((tech) => (
                    <span className="ad-pill" key={tech}>{tech}</span>
                  ))}
                </div>
                <p className="ad-card-desc ad-clamp-3">{project.desc}</p>
              </div>
              <div className="ad-card-foot">
                {filled(project.preview) ? (
                  <a className="ad-link" href={project.preview} target="_blank" rel="noreferrer">
                    Preview <ExportOutlined />
                  </a>
                ) : (
                  <span className="ad-pill ad-pill-warning">No preview link</span>
                )}
                <div>
                  <button type="button" className="ad-link" onClick={() => openEditor(project)}>
                    Edit
                  </button>
                  <button type="button" className="ad-link ad-link-danger" onClick={() => setDeleting(project)}>
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      <Modal
        open={editing !== null}
        title={editing?._id ? `Edit “${editing.title}”` : "Add project"}
        onCancel={closeEditor}
        footer={null}
        width={600}
        className="ad-modal"
        rootClassName="ad-portal"
        forceRender
        maskClosable={!saving}>
        <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
          <div className="ad-modal-body">
            <Form.Item label="Title" name="title" rules={[{ required: true, message: "Give the project a title." }]}>
              <Input placeholder="Hisaab: spend smart, settle easy" />
            </Form.Item>
            <Form.Item
              label="Built with"
              name="technology"
              extra={<span className="ad-form-hint">Separate with commas. Each one shows as a tag.</span>}
              rules={[{ required: true, message: "List the stack, e.g. React, Node.js." }]}>
              <Input placeholder="React, Node.js, MongoDB" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="desc"
              rules={[{ required: true, message: "Describe the project in a sentence or two." }]}>
              <TextArea rows={3} placeholder="What it does and what you built." />
            </Form.Item>
            <div className="ad-two">
              <Form.Item
                label="Image URL"
                name="img"
                rules={[{ required: true, message: "Add an image URL." }, { type: "url", message: "Use a full URL." }]}>
                <Input placeholder="https://…" />
              </Form.Item>
              <Form.Item
                label="Preview URL"
                name="preview"
                rules={[{ required: true, message: "Add a live or repo link." }, { type: "url", message: "Use a full URL." }]}>
                <Input placeholder="https://…" />
              </Form.Item>
            </div>
            {imgPreview ? (
              <div className="ad-card-media" style={{ borderRadius: 6, border: "1px solid var(--border)", marginBottom: 16 }}>
                <img src={imgPreview} alt="" />
              </div>
            ) : null}
          </div>
          <div className="ad-modal-foot">
            <Button onClick={closeEditor} disabled={saving}>Cancel</Button>
            <Button type="submit" variant="primary" loading={saving}>
              {editing?._id ? "Save project" : "Add project"}
            </Button>
          </div>
        </Form>
      </Modal>

      <ConfirmDelete
        open={!!deleting}
        name={deleting?.title}
        what="project"
        loading={deleteBusy}
        onCancel={() => !deleteBusy && setDeleting(null)}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default AdminProject;
