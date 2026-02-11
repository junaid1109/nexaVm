import { object, string } from 'yup';

const schema = object({
    'email': string().required().email(),
    'partner-area': string().required(),
});

export default defineEventHandler(async (event) => {
    const result = await readValidatedBody(event, body => schema.validate(body))

    const { sendMail } = useNodeMailer()

    try {

        await sendMail({
            subject: 'Thank you for your partner request',
            to:  'noreply@nexavm.com',
            cc: 'sales@nexavm.com', 
            text: `
                Thank you for your request!
                \n\n
                Find here a copy of your data:
                \n\n
                Work email: ${result['email']}\n
                Partnership Area of Interest*:${result['partner-area']}\n
                \n
                Our team will be back at you as soon as possible!
                \n
                NexaVM
            `,
            html: `
                    <h1>Thank you for your partner request!</h1>
                    <p> Find here a copy of your data: </p>
                    <dl>
                        <dt> Work Email </dt>
                        <dd> ${result['email']} </dd>
                        <dt>  Partnership Area of Interest </dt>
                        <dd> ${result['partner-area']} </dd>
                    </dl>
                    <p>Our team will be back at you as soon as possible!</p>
                    <p>NexaVM</p>
                `,
        })

        await sendMail({
            subject: 'Thank you for your partner request',
            to: result.email,
            text: `
                    Dear client,

                    Thank you for your interest in NexaVM.
                    You can download your trial version using the links below:

                    - NexaVM Secure Server Virtualization: https://shorturl.at/k9kEj
                    - Documentation: https://shorturl.at/W016b

                    If you have any questions or need more information, contact our sales team at sales@nexavm.com.
                    We’ll reach out soon to support you during your evaluation.

                    You can also visit our community at hive.nexavm.com or email support@nexavm.com for technical help.

                    Best regards,
                    The NexaVM Sales Team
                    https://nexavm.com
                            `,
                            html: `
                                <p>Dear Client,</p>
                                <p>Thank you for your interest in NexaVM.</p>
                                <p>You can download your trial version using the links below:</p>
                                <ul>
                                    <li><a href="https://shorturl.at/k9kEj">NexaVM Secure Server Virtualization</a></li>
                                    <li><a href="https://shorturl.at/W016b">Documentation</a></li>
                                </ul>
                                <p>If you have any questions, feel free to contact our sales team at <a href="mailto:sales@nexavm.com">sales@nexavm.com</a>. We will reach out soon to help you during your evaluation.</p>
                                <p>You can also visit our community at <a href="https://hive.nexavm.com">hive.nexavm.com</a> or contact <a href="mailto:support@nexavm.com">support@nexavm.com</a> for technical assistance.</p>
                                <p>Best regards,<br>The NexaVM Sales Team<br><a href="https://nexavm.com">nexavm.com</a></p>
                            `,
                });
       return { success: true, message: 'Email sent successfully!' }
  } catch (err: any) {
    console.error(err)
    return { success: false, message: 'Failed to send email', error: err.message }
  }
})