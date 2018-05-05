let nodemailer = require('nodemailer');

module.exports.enviarCorreo = (req, res) => {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rameweb2018@gmail.com',
      pass: 'proyecto2018'
    }
  });

  let mailOptions = {
    from: 'rameweb2018@gmail.com',
    to: req.body.to,
    subject: req.body.subject,
    text: 'Bienvenido a randajad, que disfrutes tu tiempo laboral',
  };

  console.log(mailOptions);

  transporter.sendMail(mailOptions,(error, info)=>{
    if(error){
      res.json({success:false, msg:error});
    }
    else{
      res.json({success:true});
    }
  });
};