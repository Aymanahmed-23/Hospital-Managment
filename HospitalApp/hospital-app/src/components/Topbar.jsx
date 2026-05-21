import { today } from "../utils";
import "./Topbar.css";

const PAGE_TITLES = {
  dashboard: "Dashboard",
  patients:  "Patients",
  doctors:   "Doctors",
  nurses:    "Nurses",
  wards:     "Wards",
};

export default function Topbar({ activePage }) {
  return (
    <div className="topbar">
      <div className="topbar-title">{PAGE_TITLES[activePage]}</div>
      <div className="topbar-actions">
        <div className="topbar-time">🕐 {today()}</div>
      </div>
    </div>
  );
}
