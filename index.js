
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      message: "Type the URL your looking for: ",
      name: "url",
    },
  ])
  .then((answers) => {
    const link = answers.url;
    const qr_image = qr.image(link,{type: 'png'});
    qr_image.pipe(fs.createWriteStream("qr_code.png"));

    fs.writeFile("url.txt",link,(err)=>{
        if(err) throw err;
        console.log("This file has been saved");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("This program must be run in a terminal.");
    } else {
      console.error("unexpected error: ",error);
    }
  });
