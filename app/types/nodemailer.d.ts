// types/nodemailer.d.ts
export {}

declare global {
  /**
   * Auto-injected by nuxt-nodemailer
   * Returns a Nodemailer transporter with .sendMail() available
   */
  const useMail: () => {
    sendMail: (options: {
      to: string
      subject: string
      text?: string
      html?: string
      from?: string
    }) => Promise<any>
  }
}
