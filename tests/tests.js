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