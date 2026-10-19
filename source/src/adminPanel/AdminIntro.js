import React from "react";
import { useSelector } from "react-redux";
import { App as AntApp, Form, Input, Select } from "antd";
import { PageHeader, Panel, SaveBar, Section, filled, useApi, useRecordForm } from "./ui";

const { TextArea } = Input;

const AdminIntro = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const { intro, heroSection } = portfolioData || {};
  const api = useApi();
  const { message } = AntApp.useApp();
  const state = useRecordForm(intro);
  const live = Form.useWatch([], state.form) || intro || {};
  const skills = live.skills || [];

  const onFinish = async (values) => {
    state.setSaving(true);
    const result = intro?._id
      ? await api("post", `update-intro/${intro._id}`, values)
      : await api("post", "add-intro", values);
    state.setSaving(false);
    if (result.success) {
      state.markSaved();
      message.success("About updated on the live site");
    } else {
      message.error(result.message);
    }
  };

  return (
    <>
      <PageHeader title="About" subtitle="Your story in two paragraphs, a photo, and the skills listed under them." />

      <div className="ad-settings">
        <Panel>
          <Form
            form={state.form}
            layout="vertical"
            requiredMark={false}
            onFinish={onFinish}
            onValuesChange={state.onValuesChange}>
            <Section title="Story" description={`Your name (${heroSection?.name || "from Hero"}) is placed after the salutation.`}>
              <Form.Item label="Salutation" name="salution" rules={[{ required: true, message: "Add a salutation, e.g. “Hello! I'm”." }]}>
                <Input placeholder="Hello! I'm" />
              </Form.Item>
              <Form.Item label="First paragraph" name="desc1" rules={[{ required: true, message: "Add the first paragraph." }]}>
                <TextArea rows={4} placeholder="Continues straight after your name." />
              </Form.Item>
              <Form.Item label="Second paragraph" name="desc2">
                <TextArea rows={4} placeholder="Optional." />
              </Form.Item>
            </Section>
            <Section title="Skills" description="Press Enter or type a comma after each one. Order is kept.">
              <Form.Item name="skills" label="Skills">
                <Select mode="tags" placeholder="React, Node.js, Flutter" tokenSeparators={[","]} open={false} suffixIcon={null} />
              </Form.Item>
            </Section>
            <Section title="Photo" description="Shown beside the story.">
              <Form.Item label="Image URL" name="img" rules={[{ type: "url", message: "Use a full URL, e.g. https://…" }]}>
                <Input placeholder="https://…" />
              </Form.Item>
            </Section>
            <SaveBar state={state} note="Changes go live as soon as you save." />
          </Form>
        </Panel>

        <aside className="ad-preview">
          <Panel title="Preview" meta={`${skills.length} ${skills.length === 1 ? "skill" : "skills"}`}>
            <div className="ad-panel-body">
              <div className="ad-preview-frame">
                {filled(live.img) ? <img className="ad-preview-img" style={{ marginTop: 0, marginBottom: 14 }} src={live.img} alt="" /> : null}
                <div className="pv-desc ad-clamp-3" style={{ marginTop: 0 }}>
                  {live.salution || "Hello! I'm"} <strong>{heroSection?.name}</strong> {live.desc1}
                </div>
                <div className="ad-preview-skills">
                  {skills.slice(0, 12).map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                  {skills.length > 12 ? <span>+{skills.length - 12}</span> : null}
                </div>
              </div>
            </div>
          </Panel>
        </aside>
      </div>
    </>
  );
};

export default AdminIntro;
