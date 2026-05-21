import { useState, useEffect } from "react";
import Sidebar   from "./components/Sidebar";
import Topbar    from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Patients  from "./pages/Patients";
import Doctors   from "./pages/Doctors";
import Nurses    from "./pages/Nurses";
import Wards     from "./pages/Wards";
import { fetchDoctors, fetchNurses, fetchWards, fetchPatients } from "./data/seedData";
import "./styles/global.css";
import "./App.css";

export default function App() {
  const [page,     setPage]     = useState("dashboard");
  const [patients, setPatients] = useState([]);
  const [doctors,  setDoctors]  = useState([]);
  const [nurses,   setNurses]   = useState([]);
  const [wards,    setWards]    = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    Promise.all([fetchPatients(), fetchDoctors(), fetchNurses(), fetchWards()])
      .then(([p, d, n, w]) => {
        setPatients(p);
        setDoctors(d);
        setNurses(n);
        setWards(w);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ color: 'white', padding: 40 }}>Loading...</div>;

  const admitted = patients.filter((p) => p.status === "admitted").length;

  return (
    <div className="app">
      <Sidebar
        activePage={page}
        onNavigate={setPage}
        admittedCount={admitted}
      />
      <main className="main">
        <Topbar activePage={page} />
        <div className="content">
          {page === "dashboard" && (
            <Dashboard patients={patients} doctors={doctors} nurses={nurses} wards={wards} />
          )}
          {page === "patients" && (
            <Patients
              patients={patients}
              setPatients={setPatients}
              doctors={doctors}
              nurses={nurses}
              wards={wards}
            />
          )}
          {page === "doctors" && (
            <Doctors doctors={doctors} setDoctors={setDoctors} />
          )}
          {page === "nurses" && (
            <Nurses nurses={nurses} setNurses={setNurses} />
          )}
          {page === "wards" && <Wards wards={wards} />}
        </div>
      </main>
    </div>
  );
}