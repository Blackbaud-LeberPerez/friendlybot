var Bot    = require('ttapi');
var AUTH   = 'fPLcVsKRFxCuXDUJgdtQXnbT';
var USERID = '523cbc4caaa5cd604208c221';
var ROOMID = '5239ba6eaaa5cd1c65cd5115';

var bot = new Bot(AUTH, USERID, ROOMID);

bot.on('speak', function (data) {
  // Get the data
  var name = data.name;
  var text = data.text;

  if (text.match(/(swallow|hard|like it)/gi) != null){
      bot.speak("That's what she said!");
  } else if (name.match(/DJ Luminate/)){
      bot.speak('Who are you, DJ Luminate?');
  } else if (text.match(/^\/hello$/i)) {
      bot.speak('Hey! How are you @'+name+'?');
  }
});


bot.on('newsong', function(data){
  var songName = data.room.metadata.current_song.metadata.song;
  var artist = data.room.metadata.current_song.metadata.artist;

  if( Math.floor((Math.random()*2)) % 2 == 0){
    bot.speak('OMG! ' + songName);
  } else {
    bot.speak('I just love ' + artist);
  }

  bot.vote('up');
});
