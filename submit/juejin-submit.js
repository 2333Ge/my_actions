const nodeMailer = require("nodemailer");
const axios = require("axios");

/**抽奖 */
const checkInUrl = "https://api.juejin.cn/growth_api/v1/check_in";
/**签到 */
const drawUrl = "https://api.juejin.cn/growth_api/v1/lottery/draw";

const emailInfo = {
  user: "ych.class@qq.com",
  from: "ych.class@qq.com",
  to: "ych.class@qq.com",
};

const formatObjToHtml = (obj) => {
  return `<div style="background: #aaaaaa55">${JSON.stringify(obj, null, 2)
    .replace(/\u0020/g, "&nbsp;")
    .replace(/\n/g, "<br/>")}</div>`;
};

/**
 * 签到
 */
const checkInAPI = async (cookie) => {
  let { data } = await axios({
    url: checkInUrl,
    method: "post",
    headers: { Cookie: cookie },
  });
  return data;
};

/**
 * 抽奖，免费一次和和消耗两百是一个接口
 */
const drawAPI = async (cookie) => {
  let { data } = await axios({
    url: drawUrl,
    method: "post",
    headers: { Cookie: cookie },
  });
  return data;
};

/**
 * 发送邮件
 */
const sendQQEmail = async (subject, html, pass) => {
  let { user, from, to } = emailInfo;
  const transporter = nodeMailer.createTransport({
    service: "qq",
    auth: { user, pass },
  });
  transporter.sendMail({ from, to, subject, html }, (err) => {
    if (err) return console.log(`发送邮件失败：${err}`);
    console.log("发送邮件成功");
  });
};

/**
 * 签到、抽奖、发邮件
 */
const submit = async (cookie, qqEmailPass) => {
  console.log("params====>", cookie, qqEmailPass);

  const checkInData = await checkInAPI(cookie);
  const drawData = await drawAPI(cookie);

  console.log("api result====>", checkInData, drawData);

  const checkInSuccess = checkInData.data;
  const drawSuccess = drawData.data;

  const title = `掘金签到${checkInSuccess ? "成功" : "失败"}，抽奖${
    drawSuccess ? "成功" : "失败"
  }`;

  const line1 = checkInSuccess
    ? `签到成功: 今日获得${checkInData.data.incr_point}积分<br/>`
    : "";

  const line2 = drawSuccess
    ? `抽奖成功, 获得：${drawData.data.lottery_name}<br/>`
    : "";

  const line3 = !checkInSuccess ? `签到失败：${checkInData.err_msg}<br/>` : "";

  const line4 = !drawSuccess ? `抽奖失败：${drawData.err_msg}<br/>` : "";

  const line5 = `签到返回结果:<br/> ${formatObjToHtml(checkInData)}<br/>`;

  const line6 = `抽奖返回结果:<br/> ${formatObjToHtml(drawData)}<br/>`;

  sendQQEmail(
    title,
    `${line1}${line2}${line3}${line4}${line5}${line6}`,
    qqEmailPass
  );
};

module.exports.submit = submit;
