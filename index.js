const Discord = require("discord.js");
const { prefix, token, giphytoken } = require("./config.json");
const client = new Discord.Client;
var GphApiClient = require('giphy-js-sdk-core')
giphy = GphApiClient(giphytoken)
var fs = require('fs');
var roleAssignChannel = 695360884960264244;



client.once("ready", () =>{
    console.log("Ready")
    let roleChannel = client.channels.get("695360884960264244");
    
    if(roleChannel != null)
    {
       
        //roleChannel.send("```ROLE UPDATE: CLICK ON ANY OF THE REACTIONS BELOW TO GET YOUR ROLE.\n:belle: for the Simp role\n:whiteass: for the Smallest Penis ```")
    }else console.log("role assign channel not set!")
})

client.on("message", message => {
    console.log(message.content);

    //SNAKE A PLAYER. 
    if(message.content.startsWith(`${prefix}snake`)) {
        let memeber = message.mentions.members.first();
        if(memeber == null){
            message.channel.send("Please mention somebody to snake.");
        }
        else{
            giphy.search("gifs", {"q": "snake"})
                .then((response) => {
                    var totalResponses = response.data.length;
                    console.log(totalResponses);
                    var responseIndex = Math.floor((Math.random() *10) +1) % totalResponses;
                    var responseFinal = response.data[responseIndex];

                    message.channel.send(memeber.displayName + " is a snake." , { files: [responseFinal.images.fixed_height.url]})
                })
        }
    }

    //ASK 8 BALL A QUESTION
    if(message.content.startsWith(`${prefix}8ball`)) {
        var responses = ["As I see it, yes.", "Ask again later.", "Better not tell you now.", "Cannot predict now.","Concentrate and ask again.","Don’t count on it.","It is certain.","It is decidedly so.","Most likely.","My reply is no.","My sources say no.","Outlook not so good.","Outlook good.","Reply hazy, try again.","Signs point to yes.","Very doubtful.","Without a doubt.","Yes.","Yes – definitely.","You may rely on it."];

        message.channel.send(responses[Math.floor(Math.random() * 20)]);
    }

    //ASK A YES OR NO QUESTION
    if(message.content.startsWith(`${prefix}ask`)) {
        var responses = ["Yes", "No"];

        message.channel.send(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    //GET YOUR PENIS SIZE
    if(message.content.startsWith(`${prefix}size`)) {
        let memeber = message.mentions.members.first();
        let size = Math.floor(Math.random() * 16);
        
        let draw = "8";
        for(i = 0; i != size; i++){
            draw += "=";
        }

        if(memeber == null){
            message.channel.send("Your penis is " + (size) + " inches. " + draw + "D");
        }else{
            message.channel.send(memeber.displayName + "'s penis is " + (size) + " inches. " + draw + "D");
        }
    }

    //SEND A GIF OF YOUR CHOICE
    if(message.content.startsWith(`${prefix}gif`)) {
        let gifWord = message.content.slice(4, message.content.length);
        giphy.search("gifs", {"q": gifWord})
                .then((response) => {
                    var totalResponses = response.data.length;
                    console.log(totalResponses);
                    var responseIndex = Math.floor((Math.random() *10) +1) % totalResponses;
                    var responseFinal = response.data[responseIndex];

                    message.channel.send({files: [responseFinal.images.fixed_height.url]})
                })

    }
    //HELP
})




client.login(token);