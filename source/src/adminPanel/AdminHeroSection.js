import React from "react";
import { useSelector } from "react-redux";
import { App as AntApp, Form, Input } from "antd";
import { PageHeader, Panel, SaveBar, Section, filled, useApi, useRecordForm } from "./ui";

const { TextArea } = Input;

const AdminHeroSection = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const heroSection = portfolioData?.heroSection;
  const api = useApi();
  const { message } = AntApp.useApp();
  const state = useRecordForm(heroSection);
  const live = Form.useWatch([], state.form) || heroSection || {};

  const onFinish = async (values) => {
    state.setSaving(true);
    const result = await api("post", `update-heroSEction/${heroSection._id}`, values);
    state.setSaving(false);
    if (result.success) {
      state.markSaved();
      message.success("Hero updated on the live site");
    } else {
      message.error(result.message);
    }
  };

  return (
    <>
      <PageHeader title="Hero" subtitle="The first screen visitors see: your name, a one-line pitch and two calls to action." />

      <div className="ad-settings">
        <Panel>
          <Form
            form={state.form}
            layout="vertical"
            requiredMark={false}
            onFinish={onFinish}
            onValuesChange={state.onValuesChange}>
            <Section title="Introduction" description="Your name types itself out, followed by the caption and a short paragraph.">
              <Form.Item label="Name" name="name" rules={[{ required: true, message: "Add your name." }]}>
                <Input placeholder="M. Ahmed Fayyaz" />
              </Form.Item>
              <Form.Item label="Caption" name="caption" rules={[{ required: true, message: "Add a one-line caption." }]}>
                <Input placeholder="I build products for the web and mobile." />
              </Form.Item>
              <Form.Item label="Description" name="desc" rules={[{ required: true, message: "Add a short paragraph." }]}>
                <TextArea rows={4} placeholder="Two or three sentences about what you do." />
              </Form.Item>
            </Section>
            <Section title="Calls to action" description="Where the Hire me and Resume buttons go. A button with no link is hidden.">
              <Form.Item label="Hire me link" name="hireMeBtn" rules={[{ type: "url", message: "Use a full URL, e.g. https://…" }]}>
                <Input placeholder="https://www.linkedin.com/in/…" />
              </Form.Item>
              <Form.Item label="Resume link" name="resumeBtn" rules={[{ type: "url", message: "Use a full URL, e.g. https://…" }]}>
                <Input placeholder="https://drive.google.com/…" />
              </Form.Item>
            </Section>
            <Section title="Photo" description="Shown beside the introduction on wide screens.">
              <Form.Item label="Image URL" name="img" rules={[{ type: "url", message: "Use a full URL, e.g. https://…" }]}>
                <Input placeholder="https://…" />
              </Form.Item>
            </Section>
            <SaveBar
              state={state}
              note="Changes go live as soon as you save."
              disabledReason={heroSection?._id ? null : "No hero record to update"}
            />
          </Form>
        </Panel>

        <aside className="ad-preview">
          <Panel title="Preview" meta="Updates as you type">
            <div className="ad-panel-body">
              <div className="ad-preview-frame">
                <div className="pv-hi">Hi, I am</div>
                <div className="pv-name">{live.name || "Your name"}</div>
                <div className="pv-caption">{live.caption || "Your caption"}</div>
                <div className="pv-desc ad-clamp-3">{live.desc || "A short paragraph about you."}</div>
                <div className="pv-btns">
                  <span className="pv-btn" data-off={filled(live.hireMeBtn) ? undefined : ""}>Hire Me</span>
                  <span className="pv-btn" data-off={filled(live.resumeBtn) ? undefined : ""}>Resume</span>
                </div>
                {filled(live.img) ? <img className="ad-preview-img" src={live.img} alt="" /> : null}
              </div>
            </div>
          </Panel>
        </aside>
      </div>
    </>
  );
};

export default AdminHeroSection;
