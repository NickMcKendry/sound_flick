
// Create a new audio object
var audio = document.createElement('audio');
$(audio).addClass('player')
var songUpload = document.querySelector('#fileupload')
$('#fileupload').change(function (){
  console.log("change happened");
  var songUpload = document.querySelector('#fileupload')
  audio.src = songUpload.files[0].name
  console.log(songUpload.files[0])
  audio.controls = true;
  //  $('#mp3_player').append(audio)
  // document.audio.append(songUpload)
  // audio.style.width = window.innerWidth;
  audio.loop = true
  audio.autoplay = true;
  loadSong(songUpload.files[0]);

})


function loadSong(file) {
  var that = this
  console.log("working");
var songUpload = document.querySelector('#fileupload')
  var reader = new FileReader();

  reader.onload = function(event) {

    the_url = event.target.result
    var audioContext = that.audioContext;
    if(audioContext === null) {
      console.log(that.audioContext)
      return;
    }

    console.log(that.audioContext)
    //  console.log(the_url)
     var sourceHolder = $('#mp3_player').add('audio');
     console.log(sourceHolder)
     $('document').append(sourceHolder)
    $(sourceHolder).append("<source src='" + the_url + "'/>")
    // document.body.appendChild(audio)
   // document.audio.append(songUpload)
   audio.style.width = window.innerWidth + 'px';
   audio.loop = true;
   audio.autoplay = true;
  }
  var fileRead = reader.readAsArrayBuffer(file);
  console.log(fileRead)

  $('#fileupload').change(function(){
    // console.log(the_url)
    console.log("change happened");
    var songUpload = document.querySelector('#fileupload')
    audio.src = songUpload.files[0].name
    console.log(songUpload.files[0])
    audio.controls = true;
    //  document.body.appendChild(audio)
    // document.audio.append(songUpload)
    audio.style.width = window.innerWidth + 'px';
    audio.loop = true;
    audio.autoplay = true;
    loadSong(songUpload.files[0]);
  })

}

//establish all variables that analyser will use
var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
//initialize mp3 after page loads html
window.addEventListener('load', initMp3Player, false);

function initMp3Player() {
  //add audio element to audiobox
  document.getElementById('analyser_render').appendChild(audio);
  //assign context to new audio context object
  context = new AudioContext();
  //create analyser on context
  analyser = context.createAnalyser();
  analyser.smoothingTimeConstant = 0.9;
  analyser.fftSize = 1024;

  //assign canvas to the analyser
  canvas = document.getElementById('analyser_render');
  //set canvas to 2d
  ctx = canvas.getContext('2d');
  //reroute audio playback into the graph
  source = context.createMediaElementSource(audio);
  //conect source to analyser
  source.connect(analyser);
  //send sound to context destination (speakers)
  analyser.connect(context.destination);
  frameLooper();
}
//frameLooper animates any audio to the frequency 60hz
function frameLooper() {
  //sets the animation to loop
  window.requestAnimationFrame(frameLooper);
  //aqcuires array of Uint8 datatype that represents data of sound frequency
  fbc_array = new Uint8Array(analyser.frequencyBinCount);
  // console.log(fbc_array)
  //get byte frequency data of fbc array
  analyser.getByteFrequencyData(fbc_array);
  //clear canvas every loop
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //set color of bars
  // var gradient = ctx.createLinearGradient(10, 20, 100, 170)
  // gradient.addColorStop = (0,"blue");
  // gradient.addColorStop = (1, "white")
  // ctx.fillStyle = gradient;
  // ctx.fillRect(20,20,150,100)


//Red and orange Theme
      //   var gradient = ctx.createLinearGradient(300,0,canvas.width,canvas.height);
      // gradient.addColorStop(1,'#000000');
      // gradient.addColorStop(0.75,'#ff0000');
      // gradient.addColorStop(0.25,'#ffff00');
      // gradient.addColorStop(0,'#ffffff');

      $(document).querySelector('.warm').onclick = function(){


      var gradient = ctx.createLinearGradient(300,0,canvas.width,canvas.height);
    gradient.addColorStop(1,'#48Ed07');
    gradient.addColorStop(0.90,'#73EB07');
    gradient.addColorStop(0.80,'#9DE908');
    gradient.addColorStop(0.70,'#C6E609');
    gradient.addColorStop(0.60,'#E5DB0A');
    gradient.addColorStop(0.50,'#E3B10B');
    gradient.addColorStop(0.40,'#E1870c');
    gradient.addColorStop(0.30,'#DE5F0D');
    gradient.addColorStop(0.20,'#DC380E');
    gradient.addColorStop(0,'#DB110F');
    ctx.fillStyle = gradient;
    ctx.fill


      // add linear gradient
      // var grd = ctx.createLinearGradient(100, 300, canvas.width, canvas.height);
      // // light blue
      // grd.addColorStop(0.15, '#D16C4B');
      // grd.addColorStop(0.25, '#6DD14B')
      // grd.addColorStop(0.50, '#4BB0D1')
      // grd.addColorStop(0.75, '#AF4BD1');
      // grd.addColorStop(1, '#F9F7FA')
      // ctx.translate(canvas.width / 2, canvas.height / 2);
      // ctx.scale(-1, 1);
      ctx.fillStyle = gradient;
      ctx.fill();
// ctx.fillStyle = '#aa0000';
  //100 bars render
  bars = 300;
  //renders bars at different heights every loop
  for (var i = 0; i < bars; i++) {
    //give each bar different x position at start
    // var random = Math.random,
    //   red = random() * 255 >> 0,
    //    green = random() * 255 >> 0,
    //    blue = random() * 255 >> 0
    //
    //    ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue  + ')';
    bar_x = i * 2;
    //give bar width in px
    bar_width = 1;
    //make bars change height
    bar_height = -(fbc_array[i] / 2);
    //draws each bar
    // ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
    ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);

    // for (var i = 1; i < fbc_array.length; i += 10) {
    //   var random = Math.random,
    //   red = random() * 255 >> 0,
    //   green = random() * 255 >> 0,
    //   blue = random() * 255 >> 0
    //
    //   ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue  + ')';
    //   ctx.fillRect(i, canvas.height - fbc_array[i], 10, canvas.height);
    //   ctx.strokeRect(i, canvas.height - fbc_array[i], 10, canvas.height);
     }

   }



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
     console.log(trackArray)
   }

   app.init =  function() {
     app.events( )
   }

   $(app.init);
