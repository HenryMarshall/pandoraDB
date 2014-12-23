// ==UserScript==
// @name        Pandora Scraper
// @namespace   https://github.com/hbaughman
// @include     http://www.pandora.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// @version     0.1
// ==/UserScript==

var scraper = {
  watchNowPlaying: function() {
    $('.playerBarSong').on("DOMNodeInserted", function(data) {
      var songInfo = scraper.getSongInfo();
      console.log("songInfo: ",songInfo);
    });
  },

  getSongInfo: function() {
    var songInfo = {
      title: $('.playerBarSong').text(),
      artist: $('.playerBarArtist').text(),
      album: $('.playerBarAlbum').text(),
      station: $('.stationListItem.selected').find('.stationNameText').attr('title'),
      liked: $('.thumbUpButton').hasClass('indicator')
    };
    return songInfo;
  }
}