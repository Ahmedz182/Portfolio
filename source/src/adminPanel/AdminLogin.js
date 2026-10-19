import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { ConfigProvider, Form, Input } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { API_BASE } from "../config";
import { useAntTheme } from "./AdminIndex";
import { Button, NETWORK_ERROR } from "./ui";
import "./admin.css";

const AdminLogin = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const antThemeConfig = useAntTheme();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Sign in · Portfolio admin";
  }, []);

  if (localStorage.getItem("token") !== null) return <Navigate to="/admin" replace />;

  const onFinish = async (values) => {
    setSubmitting(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE}/Auth/login`, values);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/admin");
        return;
      }
      setError(response.data.message || "That email and password don't match.");
    } catch (err) {
      console.error(err);
      setError(err.response ? "That email and password don't match." : NETWORK_ERROR);
    }
    form.setFieldValue("password", "");
    setSubmitting(false);
  };

  return (
    <ConfigProvider theme={antThemeConfig}>
      <div className="ad">
        <div className="ad-login">
          <div className="ad-login-card">
            <div className="ad-brand">
              <div className="ad-mark" aria-hidden="true">AF</div>
              <div>
                <div className="ad-brand-name">Portfolio admin</div>
                <div className="ad-brand-scope">ahmedz182.github.io</div>
              </div>
            </div>
            <section className="ad-panel ad-login-panel">
              <h1 className="ad-title" style={{ fontSize: 20, lineHeight: "28px" }}>Sign in</h1>
              <p className="ad-subtitle" style={{ marginBottom: 20 }}>Edit what your portfolio shows.</p>
              {error ? <div className="ad-login-error" role="alert">{error}</div> : null}
              <Form form={form} layout="vertical" requiredMark={false} onFinish={onFinish}>
                <Form.Item
                  label="Email or username"
                  name="email"
                  rules={[{ required: true, message: "Enter your email or username." }]}>
                  <Input autoComplete="username" autoFocus />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Enter your password." }]}>
                  <Input.Password autoComplete="current-password" />
                </Form.Item>
                <Button type="submit" variant="primary" loading={submitting} style={{ width: "100%", height: 40, marginTop: 8 }}>
                  {submitting ? "Signing in…" : "Sign in"}
                </Button>
              </Form>
            </section>
            <Link to="/" className="ad-link ad-login-back">
              <ArrowLeftOutlined /> Back to the portfolio
            </Link>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default AdminLogin;
