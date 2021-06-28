const units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

/**
 * Format date to make it easy to read
 * @param {String} date to format.
 * @return {String} formated date.
 */
exports.setDate = (date) => {
  if (date) return new Date(date).toGMTString().split(" GMT")[0];
  return "";
};

/**
 * Set size of the file to mske it easy to read
 * @param {Number} size in bytes of the file
 * @return {Number} eazy number to read.
 */
exports.setSize = (size = null) => {
  if (size) {
    let l = 0,
      n = parseInt(size, 10) || 0;
    while (n >= 1024 && ++l) n = n / 1024;
    return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
  }
  return "";
};

/**
 * Get current or previous folder path.
 * @param {Object} file information of each row in the file list
 * @return {String} the previous or current path in the hierarchie structure
 */
exports.getPath = (file, state = "prev") => {
  const fi = file.prev ? file.prev : file.path_lower;
  const pa1 = fi.split("/");
  pa1.shift();
  let link = "";
  const len = pa1.length;
  const leng = state !== "prev" ? len : len - 1;
  const condition = state !== "prev" ? len >= 1 : len > 1;
  return loop(condition, leng, pa1);
};

function loop(condition, size, tab) {
  let li = "";
  if (condition)
    for (let i = 0; i < size; i++) {
      const elt = tab[i];
      li += "/" + elt;
    }
  return li;
}
