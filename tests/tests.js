var testData = {
  playInfo: {
    title: "Beat It",
    artist: "Michael Jackson",
    album: "Thriller",
    station: "Michael Jackson Radio",
    liked: false,
    user: "foo@bar.com"
  }, 

  newEntry: {
    title: "Beat It",
    artist: "Michael Jackson",
    album: "Thriller",
    liked: [],
    playCount: { _total: 0 }
  },

  playedEntry: {
    title: "Beat It",
    artist: "Michael Jackson",
    album: "Thriller",
    liked: [],
    playCount: { _total: 7, "Michael Jackson Radio": 5, "Pop Rock Radio": 2 }
  }
};

var GM_config = {
  getValue: undefined
}

// Replicate Greasemonkey functions for testing purposes
function GM_getValue(songId) {
  return GM_config.getValue;
}


// Tests

QUnit.test("getPlayInfo", function(assert) {
  assert.deepEqual(pdb.getPlayInfo(), testData.playInfo);
});

// Refactor these two tests
QUnit.test("watchForChanges with changes", function(assert) {
  assert.expect(1);

  pdb.watchForChanges(".playerBarAlbum", function() {
    assert.ok(true);
  });

  $('.playerBarAlbum').text("changed")
});

QUnit.test("watchForChanges with no change", function(assert) {
  assert.expect(0);

  pdb.watchForChanges(".playerBarAlbum", function() {
    assert.ok(true);
  });
});

QUnit.test("getOrBuildEntry", function(assert) {
  assert.propEqual(pdb.getOrBuildEntry(testData.playInfo), testData.newEntry);

  // This makes GM_getValue return an entry
  GM_config.getValue = JSON.stringify(testData.playedEntry);
  assert.propEqual(pdb.getOrBuildEntry(testData.playInfo), testData.playedEntry);
});

QUnit.test("buildEntry", function(assert) {
  assert.propEqual(new pdb.buildEntry(testData.playInfo), testData.newEntry);
});

QUnit.test("generateId", function(assert) {
  assert.equal(pdb.generateId(testData.playInfo), "d7a68217c6318f883e95d81bffd71da8");
});

QUnit.test("incrementEntry", function(assert) {
  var newIncremented = pdb.incrementEntry(testData.playInfo, testData.newEntry),
      newExpected = {"_total":1, "Michael Jackson Radio": 1};
  assert.deepEqual(newIncremented.playCount, newExpected);

  var playedIncremented = pdb.incrementEntry(testData.playInfo, testData.playedEntry),
      playedExpected = {"_total":8, "Michael Jackson Radio": 6, "Pop Rock Radio": 2}
  assert.deepEqual(playedIncremented.playCount, playedExpected)
});