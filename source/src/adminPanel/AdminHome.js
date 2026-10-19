import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ExportOutlined, PlusOutlined, RightOutlined } from "@ant-design/icons";
import { LIVE_SITE } from "../config";
import { Button, PageHeader, Panel, filled, splitTech } from "./ui";

// The fields the live site renders, grouped by the admin view that edits them.
const PROFILE_FIELDS = [
  { section: "hero", where: "Hero", source: "heroSection", key: "name", label: "Name" },
  { section: "hero", where: "Hero", source: "heroSection", key: "caption", label: "Caption" },
  { section: "hero", where: "Hero", source: "heroSection", key: "desc", label: "Hero description" },
  { section: "hero", where: "Hero", source: "heroSection", key: "img", label: "Hero image" },
  { section: "hero", where: "Hero", source: "heroSection", key: "hireMeBtn", label: "Hire me link" },
  { section: "hero", where: "Hero", source: "heroSection", key: "resumeBtn", label: "Resume link" },
  { section: "about", where: "About", source: "intro", key: "img", label: "About photo" },
  { section: "about", where: "About", source: "intro", key: "salution", label: "Salutation" },
  { section: "about", where: "About", source: "intro", key: "desc1", label: "About, first paragraph" },
  { section: "about", where: "About", source: "intro", key: "desc2", label: "About, second paragraph" },
  { section: "about", where: "About", source: "intro", key: "skills", label: "Skills" },
  { section: "contact", where: "Contact", source: "detail", key: "email", label: "Email" },
  { section: "contact", where: "Contact", source: "detail", key: "phone", label: "Phone" },
  { section: "contact", where: "Contact", source: "detail", key: "location", label: "Location" },
];

const SOCIAL_KEYS = ["github", "linkdein", "facebook", "instagram", "whatsapp"];

const AdminHome = () => {
  const navigate = useNavigate();
  const { portfolioData } = useSelector((state) => state.root);
  const { experiences = [], projects = [], intro = {}, heroSection = {} } = portfolioData || {};

  const missing = PROFILE_FIELDS.filter((f) => !filled(portfolioData?.[f.source]?.[f.key]));
  const done = PROFILE_FIELDS.length - missing.length;
  const percent = Math.round((done / PROFILE_FIELDS.length) * 100);

  const newestFirst = (list) => list.slice().reverse();
  const recentProjects = newestFirst(projects).slice(0, 5);
  const recentRoles = newestFirst(experiences).slice(0, 4);
  const noPreview = projects.filter((p) => !filled(p.preview));
  const skills = intro?.skills || [];
  const socialCount = SOCIAL_KEYS.filter((k) => filled(intro?.[k])).length;
  const latestRole = recentRoles[0];

  let finding;
  if (missing.length === 0 && noPreview.length === 0) {
    finding = "Everything the live site shows is filled in.";
  } else {
    const parts = [];
    if (missing.length) parts.push(`${missing.length} profile ${missing.length === 1 ? "field is" : "fields are"} empty`);
    if (noPreview.length) parts.push(`${noPreview.length} ${noPreview.length === 1 ? "project has" : "projects have"} no preview link`);
    finding = parts.join(" and ") + ".";
  }

  return (
    <>
      <PageHeader
        title="Overview"
        subtitle={
          <>
            {heroSection?.name ? <strong>{heroSection.name}</strong> : null}
            {heroSection?.name ? " · " : null}
            {finding}
          </>
        }>
        <a className="ad-btn" href={LIVE_SITE} target="_blank" rel="noreferrer">
          <ExportOutlined /> View site
        </a>
        <Button variant="primary" onClick={() => navigate("/admin/projects", { state: { create: true } })}>
          <PlusOutlined /> Add project
        </Button>
      </PageHeader>

      <Panel className="ad-kpis">
        <div className="ad-kpi">
          <div className="ad-kpi-label">Projects</div>
          <div className="ad-kpi-value">{projects.length}</div>
          <div className="ad-kpi-sub">{recentProjects[0] ? `Newest: ${recentProjects[0].title}` : "None yet"}</div>
        </div>
        <div className="ad-kpi">
          <div className="ad-kpi-label">Roles</div>
          <div className="ad-kpi-value">{experiences.length}</div>
          <div className="ad-kpi-sub">
            {latestRole ? `${latestRole.start_year} – ${latestRole.end_year}` : "None yet"}
          </div>
        </div>
        <div className="ad-kpi">
          <div className="ad-kpi-label">Skills listed</div>
          <div className="ad-kpi-value">{skills.length}</div>
          <div className="ad-kpi-sub">{skills.slice(0, 3).join(", ") || "None yet"}</div>
        </div>
        <div className="ad-kpi">
          <div className="ad-kpi-label">Social links</div>
          <div className="ad-kpi-value">
            {socialCount}
            <small>/ {SOCIAL_KEYS.length}</small>
          </div>
          <div className="ad-kpi-sub">Shown in the site's side rail</div>
        </div>
      </Panel>

      <div className="ad-grid ad-grid-2-1">
        <div className="ad-stack">
          <Panel title="Projects" meta={`${projects.length} on the site`}>
            {recentProjects.length === 0 ? (
              <div className="ad-empty-inline">No projects yet. Add one and it appears on the site straight away.</div>
            ) : (
              <ul className="ad-rows">
                {recentProjects.map((project) => (
                  <li className="ad-row" key={project._id}>
                    {project.img ? (
                      <img className="ad-thumb" src={project.img} alt="" loading="lazy" />
                    ) : (
                      <span className="ad-thumb" />
                    )}
                    <div className="ad-row-main">
                      <div className="ad-row-title">{project.title}</div>
                      <div className="ad-row-sub">{splitTech(project.technology).join(" · ") || "—"}</div>
                    </div>
                    <div className="ad-row-end">
                      {!filled(project.preview) ? (
                        <span className="ad-pill ad-pill-warning ad-hide-sm">No preview</span>
                      ) : null}
                      <Link
                        className="ad-link"
                        to="/admin/projects"
                        state={{ edit: project._id }}>
                        Edit
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {projects.length > recentProjects.length ? (
              <div className="ad-panel-foot">
                <span>Showing the 5 newest</span>
                <Link className="ad-link" to="/admin/projects">
                  View all {projects.length} <RightOutlined />
                </Link>
              </div>
            ) : null}
          </Panel>

          <Panel title="Experience" meta={`${experiences.length} ${experiences.length === 1 ? "role" : "roles"}`}>
            {recentRoles.length === 0 ? (
              <div className="ad-empty-inline">No roles yet. The Experience section stays hidden until you add one.</div>
            ) : (
              <ul className="ad-rows">
                {recentRoles.map((role) => (
                  <li className="ad-row" key={role._id}>
                    <div className="ad-row-main">
                      <div className="ad-row-title">{role.title}</div>
                      <div className="ad-row-sub">{role.company}</div>
                    </div>
                    <div className="ad-row-end num">
                      {role.start_year} – {role.end_year}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="ad-panel-foot">
              <span>Newest first, as on the site</span>
              <Link className="ad-link" to="/admin/experience">
                Manage roles <RightOutlined />
              </Link>
            </div>
          </Panel>
        </div>

        <Panel title="Live site checklist" meta={`${percent}%`}>
          <div className="ad-panel-body">
            <div
              className="ad-meter"
              role="progressbar"
              aria-valuenow={done}
              aria-valuemin={0}
              aria-valuemax={PROFILE_FIELDS.length}>
              <span style={{ width: `${percent}%` }} />
            </div>
            <div className="ad-meter-legend num">
              <span>{done} of {PROFILE_FIELDS.length} profile fields</span>
              <span>{missing.length} empty</span>
            </div>

            {missing.length === 0 ? (
              <p className="ad-section-desc" style={{ marginTop: 16 }}>
                Every profile field the site renders has a value.
              </p>
            ) : (
              <ul className="ad-missing">
                {missing.slice(0, 6).map((field) => (
                  <li key={`${field.source}.${field.key}`}>
                    <Link to={`/admin/${field.section}`}>
                      <span>{field.label}</span>
                      <span className="ad-where">{field.where} <RightOutlined /></span>
                    </Link>
                  </li>
                ))}
                {missing.length > 6 ? (
                  <li className="ad-where" style={{ paddingTop: 9 }}>and {missing.length - 6} more</li>
                ) : null}
              </ul>
            )}

            {noPreview.length > 0 ? (
              <ul className="ad-missing" style={missing.length ? { marginTop: 0 } : undefined}>
                {noPreview.slice(0, 3).map((project) => (
                  <li key={project._id}>
                    <Link to="/admin/projects" state={{ edit: project._id }}>
                      <span>Preview link for {project.title}</span>
                      <span className="ad-where">Projects <RightOutlined /></span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </Panel>
      </div>
    </>
  );
};

export default AdminHome;
