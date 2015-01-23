QUnit.test("pdb.getSongInfo", function(assert) {
  var expected = {
    title: "Beat It",
    artist: "Michael Jackson",
    album: "Thriller",
    station: "Michael Jackson Radio",
    liked: false
  };

  assert.deepEqual( pdb.getSongInfo(), expected );
});

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