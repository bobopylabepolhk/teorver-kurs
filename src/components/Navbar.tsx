import { NavLink } from "react-router-dom";

const links = [1, 2, 3, 4, 5, 6];

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "8px",
        width: "100%",
        marginBottom: "16px",
      }}
    >
      {links.map((n) => (
        <NavLink key={n} to={`/${n}`}>
          Задание {n}
        </NavLink>
      ))}
      <NavLink to="/" style={{ alignSelf: "end", marginLeft: "auto" }}>
        Оригинальный график
      </NavLink>
    </nav>
  );
}
