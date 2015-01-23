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

  getSongInfo: function() {
    var songInfo = {
      title: $('.playerBarSong').text(),
      artist: $('.playerBarArtist').text(),
      album: $('.playerBarAlbum').text(),
      station: $('.stationListItem.selected').find('.stationNameText').attr('title'),
      liked: $('.thumbUpButton').hasClass('indicator')
    };
    return songInfo;
  },

  // buildEntry: function(songInfo) {
  //   this.title: songInfo.title,
  //   this.artist: songInfo.artist,
  //   this.album: songInfo.album,
  //   this.liked: [],
  //   this.playCount: { _total: 0 }
  // }

  generateId: function(song) {
    var hash = CryptoJS.MD5(song.title + song.artist + song.album);
    return hash.toString();
  },

  // getEntry: function(virginEntry) {
  //   var id = generateSongId(virginEntry),
  //       // Returns undefined if entry DNE.
  //       getDbEntry = GM_getValue(id);

  //   return getDbEntry ? $.parseJSON(getDbEntry) : virginEntry;
  // },

  // incrementEntry: function(entry) {
    
  // }
}