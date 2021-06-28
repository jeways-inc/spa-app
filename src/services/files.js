import API from "./api";

/**
 *
 * @param {Object} file information of the file to fetch from dropbox account. if not specified
 * the root folder is fetched
 * @returns
 */
const getList = (file = null) => {
  return API.post("list_folder", {
    path: file ? file.id.trim() : "",
    recursive: false,
    include_media_info: false,
    include_deleted: false,
    include_has_explicit_shared_members: false,
    include_mounted_folders: true,
    include_non_downloadable_files: true,
  });
};

/**
 *
 * @param {Object} file information about the file to fetch his content
 * @returns
 */
const getFileContent = () => API.get("/root/file");

export default {
  getList,
  getFileContent,
};
