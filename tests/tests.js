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

QUnit.test("pdb.getPlayInfo", function(assert) {
  assert.deepEqual(pdb.getPlayInfo(), testData.playInfo);
});

// Refactor these two tests
QUnit.test("pdb.watchForChanges with changes", function(assert) {
  assert.expect(1);

  pdb.watchForChanges(".playerBarAlbum", function() {
    assert.ok(true);
  });

  $('.playerBarAlbum').text("changed")
});

QUnit.test("pdb.watchForChanges with no change", function(assert) {
  assert.expect(0);

  pdb.watchForChanges(".playerBarAlbum", function() {
    assert.ok(true);
  });
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