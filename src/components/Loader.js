import React from "react";

export default function Loader({ label = null, display = false }) {
  return (
    display && <div className="loader">{label ? label : "Processing"}</div>
  );
}
