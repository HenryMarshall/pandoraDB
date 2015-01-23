var testData = {
  scraped: {
    title: "Beat It",
    artist: "Michael Jackson",
    album: "Thriller",
    station: "Michael Jackson Radio",
    liked: false,
    user: "foo@bar.com"
  }
};

QUnit.test("pdb.getPlayInfo", function(assert) {

  assert.deepEqual( pdb.getPlayInfo(), testData.scraped );
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
  assert.equal(pdb.generateId(testData.scraped), "d7a68217c6318f883e95d81bffd71da8");
});