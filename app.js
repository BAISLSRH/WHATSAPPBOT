const qri = require('qr-image');
var fs = require("fs");
const qrcode = require("qrcode-terminal");
const { Client, LocalAuth, MessageMedia, List,Location } = require("whatsapp-web.js");


//checking for save session
const client = new Client({
  authStrategy: new LocalAuth(),
});

//DELETE loginsuccess TEXT FILE
const path = './loginsuccess.txt'
fs.unlink(path, (err) => {
  if (err) {
    console.error(err)
    return
  }
  //file removed
})

client.initialize();

//generate qr code
client.on("qr", (qr) => {
//export qr code to image (svg format)
  const qr_svg = qri.image(qr , { type:'svg'});
qr_svg.pipe(require('fs').createWriteStream('qrimage.svg'));
const svg_string = qri.imageSync(qr , { type:'svg'});
  
  
//QR CODE SHOW IN CMD
  qrcode.generate(qr, { small: true }); 
 
});
//AUTHENTICATION MESSAGE
client.on("authenticated", () => {
  console.log("AUTHENTICATED");
});
//READY MESSAGE
client.on("ready", () => {
  console.log("Client is ready!");
//DELETE API.TEXT FILE
  const fs = require('fs')
  const path = './qrimage.svg'
  fs.unlink(path, (err) => {
    if (err) {
      console.error(err)
      return
    }
    //file removed
  })

  //CREATE LOGIN SUCCESS TEXT FILE
  fs.writeFile("loginsuccess.txt","LOGIN SUCCESSFULLY",function(error){
    if(error){
      console.log("unable to write");
    }
  })

});

//Replying Messages with image local file
client.on("message", async (message) => {
  
	//message from hello
	if (message.body === "BASIL") {
		message.reply("Hiiiii");
    }
	//message with location
	else if (message.body === "2") {
        message.reply(new Location(22.096361, 59.290694, 'MAKKAH HYPERMARKET\nBUHASSAN BRANCH, NEAR FAROUK MOSQUE'));
	}
	//message from Apple
	else if (message.body === "1") {
		//get media from media
		const pdf = await MessageMedia.fromFilePath(
		'C:/Users/Administrator/Desktop/whatsapp/media/p.pdf'
		);
		//replying with media
		client.sendMessage(message.from, pdf, {
		caption: "heres pdf",
		});
		message.reply("*WEEKEND OFFER*\nValid From *26.05.2022* to *28.05.2022*");
	}
	//menu message
	else if (message.body !== "menu_1_2") {
		//get media from url
		const menu = await MessageMedia.fromFilePath(
		'C:/Users/Administrator/Desktop/whatsapp/media/buhassan.jpg'
		);
		
		//replying with media
		client.sendMessage(message.from, menu, {
		caption: "🅼🅰🅺🅺🅰🅷 🅷🆈🅿🅴🆁 BUHASSAN OFFICIAL WHATSAPP\n\n🏘 HOME MENU\n🏘  القائمة الرئيسية \n👉 Type  *1*  : Our Latest Offers.\n👈🏼 أرسل *1* : آخر عروضنا.\n👉 Type  *2*  : Location.\n👈🏼 أرسل  *2* : موقعك.\nThank You for Contacting Us.\n.أشكركم على الاتصال بنا",
		});
	}
  
	//lists
	else if (message.body === "list") {
		//get message lists
		const productsList = new List(
		"Where the Dreams Come True",
		"CLICK HERE",
		[
			{
			title: "CATOGORIES",
			rows: [
				{ id: "Offer", title: "Offer" },
				{ id: "Location", title: "Location" },
			],
			},
		],
		"MAKKAH HYPER BUHASSAN"
		);
		//send lists to clint
		client.sendMessage(message.from, productsList);
	}
	
});