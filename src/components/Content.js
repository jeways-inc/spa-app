import React, { useEffect, useState } from "react";
import {
  FaChevronDown,
  FaTrash,
  FaFolderOpen,
  FaArrowLeft,
  FaFolder,
  FaFile,
} from "react-icons/fa";

import APIClient from "../services/files";
import { getPath, hideIcon, setDate, setSize } from "../utils/help";
import Loader from "./Loader";

const Content = () => {
  const [contextMenu, setContextMenu] = useState(false);
  const [current, setCurrent] = useState(null);
  const [error, setError] = useState(null);
  const [process, setProcess] = useState(false);
  const [parent, setParent] = useState(null);
  const [prev, setPrev] = useState(false);
  const [data, setData] = useState([]);

  const handleMouseEnter = (event) => setCurrent(event.target.dataset.info);
  const handleClick = () => setContextMenu(true);
  const handMouseLeave = () => {
    setCurrent(null);
    setContextMenu(false);
  };

  /**
   * Get the parent folder in the structure hierarchie
   */
  const getParent = () => {
    const parentPath = { id: parent, prev: parent };
    if (parent.length === 1) setParent(null);
    getDocList(parentPath);
  };

  /**
   * fetch files list from the dropbox account
   * @param {Object} filePath information of the file or folder to fetch
   * @returns
   */
  const getDocList = async (filePath = null) => {
    setProcess(true);
    filePath && filePath.id.length > 1 ? setPrev(true) : setPrev(false);
    const response = await APIClient.getList(filePath);
    setProcess(false);
    if (!response.ok) return setError("Something went wrong !");
    setData(response.data.entries);
    if (filePath && (filePath.path_lower || filePath.prev)) {
      const prev_path = getPath(filePath);
      const current_path = getPath(filePath, "current");
      setParent(prev_path);
      setPrev(current_path);
    }
  };

  useEffect(() => {
    getDocList();
  }, []);

  return (
    <div className="content">
      {prev && (
        <li onClick={getParent}>
          <FaArrowLeft /> <span>Previous</span>
        </li>
      )}
      <Loader label="Loading" display={process} />
      <div className="head">
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>Name</div>
        <div>Size</div>
        <div>Last Modified</div>
      </div>
      {data.map((row) => {
        const isFolder = row[".tag"] === "folder";
        return (
          <div
            key={row.id}
            data-info={row.id}
            className="items"
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
            onMouseLeave={handMouseLeave}
          >
            <div>
              {current === row.id && isFolder && (
                <FaChevronDown className="color-p" />
              )}
            </div>
            <div>
              <input
                type="checkbox"
                id={row.id}
                onChange={(event) => event.target.dataset.info === row.id}
              />
            </div>
            <div>
              {isFolder ? (
                <FaFolder className="color-p" />
              ) : (
                <FaFile className="color-p" />
              )}
              &nbsp;&nbsp;{row.name}
            </div>
            <div>{setSize(row.size)}</div>
            <div>{setDate(row.server_modified)}</div>
            {contextMenu && current === row.id && (
              <div className="context-menu">
                <ul>
                  {isFolder && (
                    <li onClick={() => getDocList(row)}>
                      <FaFolderOpen /> <span>OPEN</span>
                    </li>
                  )}
                  <li>
                    <FaTrash /> <span>REMOVE</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Content;
