import { createTransport } from "nodemailer";
import { env } from "../config";

const transport = createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASSWORD,
  },
});

export const send = async (
  from: string,
  to: string,
  subject: string,
  body: any
) => {
 try {
   const res = await transport.sendMail({
			from,
			to,
			subject,
			text: body,
		});
    
		if (res.accepted) {
			return {
				message: "Mail sent successfully:" + res.messageId,
				success: true,
			};
		}
		return { message: "Error occured sending mail", success: false };
 } catch (e) {
  console.error(e)
 }

};
export const sendMany = async (
  from: string,
  to: string[],
  subject: string,
  body: any
) => {
  const all = await Promise.all(
    to.map((val) => send(from, val, subject, body))
  );
  return all;
};
