/**
 * 对象格式化
 * @param {*} obj
 * @returns
 */
const formatObjToHtml = (obj) => {
  return `<div style="background: #aaaaaa55">${JSON.stringify(obj, null, 2)
    .replace(/\u0020/g, "&nbsp;")
    .replace(/\n/g, "<br/>")}</div>`;
};

module.exports.formatObjToHtml = formatObjToHtml;
