import React from "react";
import { useSelector } from "react-redux";
import { App as AntApp, Form, Input } from "antd";
import { PageHeader, Panel, SaveBar, Section, filled, useApi, useRecordForm } from "./ui";

const NETWORKS = [
  { name: "github", label: "GitHub", icon: "ri-github-fill", placeholder: "https://github.com/…" },
  { name: "linkdein", label: "LinkedIn", icon: "ri-linkedin-box-fill", placeholder: "https://www.linkedin.com/in/…" },
  { name: "facebook", label: "Facebook", icon: "ri-facebook-circle-line", placeholder: "https://facebook.com/…" },
  { name: "instagram", label: "Instagram", icon: "ri-instagram-line", placeholder: "https://instagram.com/…" },
  { name: "whatsapp", label: "WhatsApp", icon: "ri-whatsapp-line", placeholder: "https://wa.me/92…" },
];

const AdminSocial = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const intro = portfolioData?.intro;
  const api = useApi();
  const { message } = AntApp.useApp();
  const state = useRecordForm(intro);
  const live = Form.useWatch([], state.form) || intro || {};
  const count = NETWORKS.filter((n) => filled(live[n.name])).length;

  const onFinish = async (values) => {
    state.setSaving(true);
    const result = intro?._id
      ? await api("post", `update-intro/${intro._id}`, values)
      : await api("post", "add-intro", values);
    state.setSaving(false);
    if (result.success) {
      state.markSaved();
      message.success("Social links updated on the live site");
    } else {
      message.error(result.message);
    }
  };

  return (
    <>
      <PageHeader
        title="Social links"
        subtitle={`${count} of ${NETWORKS.length} shown in the site's side rail. Leave a field empty to hide that icon.`}
      />

      <div className="ad-settings ad-settings-single">
        <Panel>
          <Form
            form={state.form}
            layout="vertical"
            requiredMark={false}
            onFinish={onFinish}
            onValuesChange={state.onValuesChange}>
            <Section title="Profiles" description="Each link opens in a new tab.">
              {NETWORKS.map((network) => (
                <Form.Item
                  key={network.name}
                  label={network.label}
                  name={network.name}
                  rules={[{ type: "url", message: "Use a full URL, e.g. https://…" }]}>
                  <Input prefix={<i className={network.icon} style={{ color: "var(--muted)" }} />} placeholder={network.placeholder} />
                </Form.Item>
              ))}
            </Section>
            <SaveBar state={state} note="Changes go live as soon as you save." />
          </Form>
        </Panel>
      </div>
    </>
  );
};

export default AdminSocial;
