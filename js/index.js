// Setup variables
var accountNames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];

var keyword ='', status= 'all';

// On start
getData(status, keyword);
$('.dropbtn').text("All");

// On ready
$(document).ready(function() {
 
  $('#search').keypress(function (e) {
    if (e.which == 13) {
      keyword = $(this).val();
      getData(status, keyword);
    }
  });
  
  $("#all").on("click", function() {
    status = 'all';
    $('.dropbtn').text("All");
    getData(status, keyword);
  });
  $("#online").on("click", function() {
    status = 'online';
    $('.dropbtn').text("Online");
    getData(status, keyword);
  });
  $("#offline").on("click", function() {
    status = 'offline';
    $('.dropbtn').text("Offline");
    getData(status, keyword);
  });
});

// Main Function
function getData(status, keyword){  
  $(".result").html("");
  
  $.each( accountNames, function(key,val) {
    $.getJSON( getChannelURL(val), function(data) { //get account info
     $.getJSON( getStreamURL(val), function(streamingData) { //to check if account is streaming
       
       //check if logo is null
       var logoURL;
         if (data.logo === null || data.logo === undefined)
           logoURL = 'https://image.flaticon.com/icons/svg/149/149071.svg';
         else logoURL = data.logo;
       
       //Check if account is online or offline
       if (streamingData.stream != null){ //if account is streaming
         if (status === "all" || status === "online"){
           if (data.display_name.indexOf(keyword) !== -1){
             $(".result").append(getResultBlock(logoURL, data.url, data.display_name, 'green', data.status));
           }
         }
       } else if (streamingData.stream === null) { //if account is not streaming
         if (status === "all" || status === "offline"){
           if (data.url === undefined){
             if (status === "all"){
               if (val.indexOf(keyword) !== -1){
                 $(".result").append(getResultBlock(logoURL, 'javaScript:void(0);', val, 'gray', 'Undefined'));
               }
             }
           } else
             if (data.display_name.indexOf(keyword) !== -1){
               $(".result").append(getResultBlock(logoURL, data.url, data.display_name, 'red', "Offline"));
             }
         }
       }
     });
    });
  });    
}

// Functions
function getStreamURL(account) {
  return 'https://wind-bow.glitch.me/twitch-api/streams/' + account + '?callback=?';
}

function getChannelURL(account) {
  return 'https://wind-bow.glitch.me/twitch-api/channels/' + account + '?callback=?';
}

function getResultBlock(logoURL, dataURL, dataDisplayName, colorSign, dataStatus ){
  return '<div class= "result-block"><img class="logo" src="'+ logoURL + '" alt="logo">' + '<div class="result-content"><a href="' + dataURL+'" target="_blank"> '+ dataDisplayName + '</a><span class="'+ colorSign +'-sign"></span><br>' + '<span class="status">' + dataStatus + '</span></div></div><hr>';
}