import React from "react";
import { FaPlusCircle, FaCloudUploadAlt } from "react-icons/fa";
import LinkIcon from "./LinkIcon";

const buttons = [
  { label: "NEW FOLDER", icon: FaPlusCircle },
  { label: "UPLOAD", icon: FaCloudUploadAlt },
];

const Header = () => {
  return (
    <header>
      <nav>
        <div className="logo">BFE</div>
        <ul>
          {buttons.map((button) => {
            return (
              <LinkIcon
                key={button.label}
                label={button.label}
                Icon={button.icon}
              />
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
