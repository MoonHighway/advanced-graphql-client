import { Events } from "./Events.jsx";
import { LiftStatus } from "./LiftStatus.jsx";
import { Hotels } from "./Hotels.jsx";

export function App() {
  return (
    <>
      <header>
        <h1>Snowtooth Mountain - Admin Portal</h1>
      </header>
      <section className="container">
        <Events />
        <LiftStatus />
        <Hotels />
      </section>
    </>
  );
}
