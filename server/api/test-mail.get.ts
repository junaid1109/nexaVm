export default defineEventHandler(async () => {
  const mail = useMail()

  try {
    const info = await mail.sendMail({
      to: 'yourfriend@example.com',
      subject: 'SMTP Test from Nuxt',
      text: '🎉 Your SMTP connection works!',
    })

    return { success: true, messageId: info.messageId }
  } catch (error: any) {
    console.error('SMTP error:', error)
    return { success: false, error: error.message }
  }
})
