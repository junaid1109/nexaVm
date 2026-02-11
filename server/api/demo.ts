import { object, string } from 'yup';

const schema = object({
    'first-name': string().required(),
    'last-name': string().required(),
    'email': string().required().email(),
    'phone-number': string(),
    'company-name': string().required(),
    'company-size': string().required(),
    'company-field': string().required(),
    'product-of-interest': string().required()
});

export default defineEventHandler(async (event) => {
    const result = await readValidatedBody(event, body => schema.validate(body))

    const { sendMail } = useNodeMailer()

    try {

        await sendMail({
            subject: 'Thank you for your demo request',
            to:  'noreply@nexavm.com',
            cc: 'sales@nexavm.com', 
            text: `
                Thank you for your request!
                \n\n
                Find here a copy of your data:
                \n\n
                First name: ${result['first-name']}\n
                Last name: ${result['last-name']}\n 
                Work email: ${result['email']}\n
                Work phone number:${result['phone-number']}\n
                Company name:${result['company-name']}\n
                Company size:${result['company-size']}\n
                Company field:${result['company-field']}\n
                Product of interest:${result['product-of-interest']}\n
                \n
                Our team will be back at you as soon as possible!
                \n
                NexaVM
            `,
            html: `
                <h1>Thank you for your demo request!</h1>
                <p> Find here a copy of your data: </p>
                <dl>
                    <dt> First Name </dt>
                    <dd> ${result['first-name']} </dd>
                    <dt> Last Name </dt>
                    <dd> ${result['last-name']} </dd>
                    <dt> Work Email </dt>
                    <dd> ${result['email']} </dd>
                    <dt> Work Phone Number </dt>
                    <dd> ${result['phone-number']} </dd>
                    <dt> Company Name </dt>
                    <dd> ${result['company-name']} </dd>
                    <dt> Company Size </dt>
                    <dd> ${result['company-size']} </dd>
                    <dt> Company Field </dt>
                    <dd> ${result['company-field']} </dd>
                    <dt> Product of Interest </dt>
                    <dd> ${result['product-of-interest']} </dd>
                </dl>
                <p>Our team will be back at you as soon as possible!</p>
                <p>NexaVM</p>
        `,
        })

         await sendMail({
            subject: 'Thank you for your demo request',
            to: result.email,
            text: `
                    Hi ${result['first-name']},

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
                                <p>Hi ${result['first-name']},</p>
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