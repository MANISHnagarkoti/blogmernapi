const nodemailer = require("nodemailer");

module.exports = async (userEmail,url) => {
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

        const info = await transporter.sendMail({
            from: 'officemanish56@gmail.com', // sender address
            to: userEmail, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: url, // html body
        });

    } catch (e) {

        console.log(e)
    }

}

