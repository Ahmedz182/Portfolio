import React from "react";
import { useSelector } from "react-redux";
import { Form, Input } from "antd";
import { PageHeader, Panel, SaveBar, Section, useRecordForm } from "./ui";

// The API has no endpoint for contact details yet, so this view shows what
// the site renders and says plainly that edits can't be saved from here.
const AdminContact = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const detail = portfolioData?.detail;
  const state = useRecordForm(detail);

  return (
    <>
      <PageHeader title="Contact" subtitle="Shown in the Say hello section. Email and phone become tap-to-contact links." />

      <div className="ad-settings ad-settings-single">
        <div className="ad-notice">
          Contact details can't be saved from the dashboard yet: the API has no update endpoint for them. Edit them in the
          database for now.
        </div>
        <Panel>
          <Form form={state.form} layout="vertical" requiredMark={false} disabled>
            <Section title="You" description="How visitors address you.">
              <div className="ad-two">
                <Form.Item label="Full name" name="name">
                  <Input placeholder="—" />
                </Form.Item>
                <Form.Item label="Gender" name="gender">
                  <Input placeholder="—" />
                </Form.Item>
              </div>
            </Section>
            <Section title="Reach me" description="Shown on the site exactly as written.">
              <Form.Item label="Email" name="email">
                <Input type="email" placeholder="—" />
              </Form.Item>
              <Form.Item label="Phone" name="phone">
                <Input type="tel" placeholder="—" />
              </Form.Item>
              <Form.Item label="Location" name="location">
                <Input placeholder="—" />
              </Form.Item>
            </Section>
            <SaveBar state={state} disabledReason="Read only until the API supports saving" />
          </Form>
        </Panel>
      </div>
    </>
  );
};

export default AdminContact;
