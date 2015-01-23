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

  getOrBuildEntry: function(playInfo) {
    var songId = pdb.generateId(playInfo),
        songDb = GM_getValue(songId),
        songEntry = songDb ? $.parseJSON(songDb) : new pdb.buildEntry(playInfo);

        console.log(songEntry);
    return songEntry;
  },

  generateId: function(playInfo) {
    var hash = CryptoJS.MD5(playInfo.title + playInfo.artist + playInfo.album);
    return hash.toString();
  },

  buildEntry: function(playInfo) {
    this.title = playInfo.title;
    this.artist = playInfo.artist;
    this.album = playInfo.album;
    this.liked = [];
    this.playCount = { "_total": 0 };
  },

  incrementEntry: function(playInfo, songEntry) {
    var station = playInfo.station,
        // Duplicates primitive data-type
        stationCount = songEntry.playCount[station];

    if (playInfo.liked && songEntry.liked.indexOf(station) === -1) {
      songEntry.liked.push(station);
    }

    ++songEntry.playCount._total;
    songEntry.playCount[station] = stationCount ? ++stationCount : 1;

    return songEntry;
  }

}