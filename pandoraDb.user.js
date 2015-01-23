// ==UserScript==
// @name        Pandora Scraper
// @namespace   https://github.com/hbaughman
// @include     http://www.pandora.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     http://crypto-js.googlecode.com/svn/tags/3.0.2/build/rollups/md5.js
// @grant       none
// @version     0.1
// ==/UserScript==

var pdb = {
  watchForChanges: function(toBeWatched, callback) {
    // toBeWatched should be the last attribute updated by pandora. This is 
    // .playerBarAlbum as of 2014-12-15
    $(toBeWatched).on("DOMNodeInserted", function(data) {
      callback();
    });
  },

  getPlayInfo: function() {
    var playInfo = {
      title: $('.playerBarSong').text(),
      artist: $('.playerBarArtist').text(),
      album: $('.playerBarAlbum').text(),
      station: $('.stationListItem.selected').find('.stationNameText').attr('title'),
      liked: $('.thumbUpButton').hasClass('indicator'),
      user: $('.userName').text()
    };
    return playInfo;
  },



}