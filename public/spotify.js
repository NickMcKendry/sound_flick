const app = {};

app.apiUrl = 'https://galvanize-cors.herokuapp.com/https://api.spotify.com/v1';

//allow user to enter names
app.events = function() {
  $('form').on('submit', function(e){
    e.preventDefault();
    let artists = $('input[type=search]').val();
    artists = artists.split(',');
    let search = artists.map(artistName => app.searchArtist(artistName));

    app.retrieveArtistInfo(search);



  })
}

//get artists from spotify
app.searchArtist = (artistName) => $.ajax({
  url: `${app.apiUrl}/search`,
  method: 'GET',
  dataType: 'json',
  data: {
    q: artistName,
    type: 'artist'
  }

});
//get ids
app.getArtistAlbums = (artistId) => $.ajax({
  url: `${app.apiUrl}/artists/${artistId}/albums`,
  method: 'GET',
  dataType: 'json',
  data: {
    album_type: 'album'
  }

})

//then get tracks with albums tracks endpoint
app.getArtistTracks = (id) => $.ajax({
    url: `${app.apiUrl}/albums/${id}/tracks`,
    method: 'GET',
    dataType: 'json',

})


//then build playlist

app.buildPLayList = function(tracks) {
  $.when(...tracks)
    .then((...tracksResults) => {
      tracksResults = tracksResults.map(getFirstElement)
        .map(item => item.items)
        .reduce(flatten, [])
        .map(item => item.id)
        const randomTracks = [];
        for(let i = 0; i < 30; i++) {
          randomTracks.push(getRandomTrack(tracksResults));
        }

        const baseUrl = `https://embed.spotify.com/?theme=white&uri=spotify:trackset:Your Random Playlist:${randomTracks.join()}`;

        $('.playlist').html(`<iframe src="${baseUrl}" height="400"></iframe>`)

        console.log(baseUrl)

    });
}


app.retrieveArtistInfo = function(search){
  $.when(...search)
    .then((...results) => {
      results = results.map(getFirstElement)
      .map((res) =>  res.artists.items[0].id)
        .map(id => app.getArtistAlbums(id));

        app.retrieveArtistTracks(results);
    })
}

app.retrieveArtistTracks = function(artistAlbums){
  $.when(...artistAlbums)
  .then((...albums) => {
    albumIds = albums.map(getFirstElement)
    .map(res => res.items)
    .reduce(flatten, [])
    .map(album => album.id)
    .map(ids => app.getArtistTracks(ids));
    app.buildPLayList(albumIds);
  })
}

const getFirstElement = (item) => item[0];

const flatten = (prev,curr) => [...prev,...curr];

const getRandomTrack = (trackArray) => {
  const randoNum = Math.floor(Math.random() * trackArray.length)
  return trackArray[randoNum]
}

app.init =  function() {
  app.events( )
}

$(app.init);
