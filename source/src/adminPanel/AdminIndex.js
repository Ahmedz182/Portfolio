import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { App as AntApp, ConfigProvider, Drawer, theme as antTheme } from "antd";
import {
  AppstoreOutlined,
  ExportOutlined,
  FolderOutlined,
  IdcardOutlined,
  LogoutOutlined,
  MenuOutlined,
  MoonOutlined,
  PhoneOutlined,
  ShareAltOutlined,
  SolutionOutlined,
  SunOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { toggleTheme } from "../redux/rootSlice";
import { LIVE_SITE } from "../config";
import AdminHome from "./AdminHome";
import AdminHeroSection from "./AdminHeroSection";
import AdminIntro from "./AdminIntro";
import AdminExperience from "./AdminExperience";
import AdminProject from "./AdminProject";
import AdminContact from "./AdminContact";
import AdminSocial from "./AdminSocial";
import "./admin.css";

export const SECTIONS = [
  { key: "overview", label: "Overview", icon: <AppstoreOutlined />, element: <AdminHome />, group: "Dashboard" },
  { key: "projects", label: "Projects", icon: <FolderOutlined />, element: <AdminProject />, group: "Content" },
  { key: "experience", label: "Experience", icon: <SolutionOutlined />, element: <AdminExperience />, group: "Content" },
  { key: "hero", label: "Hero", icon: <IdcardOutlined />, element: <AdminHeroSection />, group: "Profile" },
  { key: "about", label: "About", icon: <UserOutlined />, element: <AdminIntro />, group: "Profile" },
  { key: "contact", label: "Contact", icon: <PhoneOutlined />, element: <AdminContact />, group: "Profile" },
  { key: "social", label: "Social links", icon: <ShareAltOutlined />, element: <AdminSocial />, group: "Profile" },
];

export const useAntTheme = () => {
  const isDark = useSelector((state) => state.root.theme === "dark");
  return {
    algorithm: isDark ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
    token: {
      colorPrimary: isDark ? "#f4f4f5" : "#2a1b3f",
      colorLink: isDark ? "#f4f4f5" : "#2a1b3f",
      colorError: isDark ? "#e5566f" : "#c4242a",
      colorBgContainer: isDark ? "#141416" : "#ffffff",
      colorBgElevated: isDark ? "#1b1b1e" : "#ffffff",
      colorBorder: isDark ? "#3d3d44" : "#d3d0d9",
      colorText: isDark ? "#f4f4f5" : "#1d1529",
      colorTextPlaceholder: isDark ? "#949499" : "#6b6676",
      borderRadius: 6,
      controlHeight: 38,
      fontFamily: '"Montserrat", system-ui, sans-serif',
      fontSize: 14,
    },
  };
};

const Nav = ({ active, onNavigate }) => {
  let group = null;
  return (
    <nav className="ad-nav" aria-label="Admin sections">
      {SECTIONS.map((section) => {
        const heading = section.group !== group && section.group !== "Dashboard" ? section.group : null;
        group = section.group;
        return (
          <React.Fragment key={section.key}>
            {heading ? <div className="ad-nav-group">{heading}</div> : null}
            <Link
              to={`/admin/${section.key}`}
              className="ad-nav-item"
              aria-current={active === section.key ? "page" : undefined}
              onClick={onNavigate}>
              {section.icon}
              {section.label}
            </Link>
          </React.Fragment>
        );
      })}
    </nav>
  );
};

const Brand = () => (
  <div className="ad-brand">
    <div className="ad-mark" aria-hidden="true">AF</div>
    <div>
      <div className="ad-brand-name">Portfolio admin</div>
      <div className="ad-brand-scope">ahmedz182.github.io</div>
    </div>
  </div>
);

const SidebarFoot = ({ onSignOut }) => {
  const dispatch = useDispatch();
  const { portfolioData, theme } = useSelector((state) => state.root);
  const isDark = theme === "dark";
  const name = portfolioData?.heroSection?.name;
  const img = portfolioData?.intro?.img;

  return (
    <div className="ad-sidebar-foot">
      <a className="ad-nav-item" href={LIVE_SITE} target="_blank" rel="noreferrer">
        <ExportOutlined />
        View live site
      </a>
      <button type="button" className="ad-nav-item" onClick={() => dispatch(toggleTheme())}>
        {isDark ? <SunOutlined /> : <MoonOutlined />}
        {isDark ? "Light theme" : "Dark theme"}
      </button>
      <button type="button" className="ad-nav-item" onClick={onSignOut}>
        <LogoutOutlined />
        Sign out
      </button>
      <div className="ad-user">
        {img ? <img className="ad-avatar" src={img} alt="" /> : <span className="ad-avatar" />}
        <div style={{ minWidth: 0 }}>
          <div className="ad-user-name">{name || "Owner"}</div>
          <div className="ad-user-role">Owner</div>
        </div>
      </div>
    </div>
  );
};

const AdminIndex = () => {
  const { section: sectionKey = "overview" } = useParams();
  const { portfolioData } = useSelector((state) => state.root);
  const navigate = useNavigate();
  const [sheetOpen, setSheetOpen] = useState(false);
  const antThemeConfig = useAntTheme();
  const hasToken = localStorage.getItem("token") !== null;

  const section = SECTIONS.find((s) => s.key === sectionKey);

  useEffect(() => {
    if (section) document.title = `${section.label} · Portfolio admin`;
  }, [section]);

  if (!hasToken) return <Navigate to="/login" replace />;
  if (!section) return <Navigate to="/admin/overview" replace />;

  const signOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <ConfigProvider theme={antThemeConfig}>
      <AntApp>
        <div className="ad">
          <div className="ad-shell">
            <aside className="ad-sidebar">
              <Brand />
              <Nav active={section.key} />
              <SidebarFoot onSignOut={signOut} />
            </aside>

            <header className="ad-topbar">
              <div className="ad-mark" aria-hidden="true">AF</div>
              <div className="ad-topbar-title">{section.label}</div>
              <button
                type="button"
                className="ad-icon-btn"
                aria-label="Open menu"
                onClick={() => setSheetOpen(true)}>
                <MenuOutlined />
              </button>
            </header>

            <main className="ad-main">
              <div className="ad-canvas">
                {portfolioData ? section.element : null}
              </div>
            </main>
          </div>

          <Drawer
            open={sheetOpen}
            onClose={() => setSheetOpen(false)}
            placement="left"
            width={280}
            closable={false}
            rootClassName="ad-portal ad-sheet">
            <Brand />
            <Nav active={section.key} onNavigate={() => setSheetOpen(false)} />
            <SidebarFoot onSignOut={signOut} />
          </Drawer>
        </div>
      </AntApp>
    </ConfigProvider>
  );
};

export default AdminIndex;
