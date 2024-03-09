const nodemailer = require("nodemailer");

module.exports = async (userEmail, url, subject,) => {
    const transporter = nodemailer.createTransport({
        //   host: "smtp.ethereal.email",
        //   port: 587,
        //   secure: false, // Use `true` for port 465, `false` for all other ports
        service: "gmail",
        auth: {
            user: "officemanish56@gmail.com",
            pass: "plmesgoalbhioybs",
        },
    });
    try {

        await transporter.sendMail({
            from: 'officemanish56@gmail.com', // sender address
            to: userEmail, // list of receivers
            subject: subject, // Subject line
            text: "Verification Link", // plain text body
            html: `<h1>${url}</h1> <b>Link expire in 1 Hour</b>  `, // html body
        });

    } catch (e) {

        console.log(e)
    }

}

