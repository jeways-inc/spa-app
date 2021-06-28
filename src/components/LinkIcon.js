import React, { useState } from "react";

export default function LinkIcon({ label, onClick = null, Icon }) {
  const [msg, setMsg] = useState(false);
  return (
    <li
      onClick={() => {
        if (!onClick) {
          setMsg(true);
          setTimeout(() => {
            setMsg(false);
          }, 2000);
        }
      }}
      className="link-icon"
    >
      {msg && <div className="not-imple">Not Implemented</div>}
      <Icon /> <span>{label}</span>
    </li>
  );
}
