export { default } from "next-auth/middleware";

export const config = { matcher: ["/ticketpage", "/ticketpage/[id]", "/ticketpage/new"] };