// ==UserScript==
// @name        Pandora Scraper
// @namespace   https://github.com/hbaughman
// @include     http://www.pandora.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     http://crypto-js.googlecode.com/svn/tags/3.0.2/build/rollups/md5.js"
// @grant       none
// @version     0.1
// ==/UserScript==

var scraper = {
  watchNowPlaying: function() {
    // .playerBarAlbum is the last attribute updated by pandora. It /is/
    // refreshed even if next song is on the same album.
    $('.playerBarAlbum').on("DOMNodeInserted", function(data) {
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

var db = {

  buildEntry: function(songInfo) {
    this.title: songInfo.title,
    this.artist: songInfo.artist,
    this.album: songInfo.album,
    this.liked: [],
    this.playCount: { _total: 0 }
  },

  generateSongId: function(virginEntry) {
    return CryptoJS.MD5(virginEntry);
  },

  getEntry: function(virginEntry) {
    var id = generateSongId(virginEntry),
        // Returns undefined if entry DNE.
        getDbEntry = GM_getValue(id);

    return getDbEntry ? $.parseJSON(getDbEntry) : virginEntry;
  },

  incrementEntry: function(entry) {
    
  }
}