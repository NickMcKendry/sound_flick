
// Create a new audio object
var audio = document.createElement('audio');
$(audio).addClass('player')
var songUpload = document.querySelector('#fileupload')
$('#fileupload').change(function (){
    var songUpload = document.querySelector('#fileupload')
  audio.src = songUpload.files[0].name
  audio.controls = true;
  audio.loop = true
  audio.autoplay = true;
  loadSong(songUpload.files[0]);

})





function loadSong(file) {
  var that = this
  var songUpload = document.querySelector('#fileupload')
  var reader = new FileReader();

  reader.onload = function(event) {

    the_url = event.target.result
    var audioContext = that.audioContext;
    if(audioContext === null) {
      return;
    }


     var sourceHolder = $('#mp3_player').add('audio');
     $('document').append(sourceHolder)
    $(sourceHolder).append("<source src='" + the_url + "'/>")
    console.log(sourceHolder)
   audio.style.width = window.innerWidth + 'px';
   audio.loop = true;
   audio.autoplay = true;
  }
  var fileRead = reader.readAsArrayBuffer(file);
  $('#fileupload').change(function(){
    var songUpload = document.querySelector('#fileupload')
    audio.src = songUpload.files[0].name
    audio.controls = true;
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
  //get byte frequency data of fbc array
  analyser.getByteFrequencyData(fbc_array);
  //clear canvas every loop
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var greenred = ctx.createLinearGradient(300,0,canvas.width,canvas.height);
  var warm = ctx.createLinearGradient(300,0,canvas.width,canvas.height);
  var cool = ctx.createLinearGradient(300,0,canvas.width,canvas.height);
  var rainbow = ctx.createLinearGradient(120,0,canvas.width,canvas.height);


//Red and orange Theme


      warm.addColorStop(0.75,'#ff0000');
      warm.addColorStop(0.25,'#ffff00');
      warm.addColorStop(0,'#ffffff');
      //warm end

//GREENRED

    greenred.addColorStop(0.90,'#73EB07');
    greenred.addColorStop(0.80,'#9DE908');
    greenred.addColorStop(0.70,'#C6E609');
    greenred.addColorStop(0.60,'#E5DB0A');
    greenred.addColorStop(0.50,'#E3B10B');
    greenred.addColorStop(0.40,'#E1870c');
    greenred.addColorStop(0.30,'#DE5F0D');
    greenred.addColorStop(0.20,'#DC380E');
    greenred.addColorStop(0,'#DB110F');
    //GREENRED ENF

    //cool

    cool.addColorStop(0.90,'#1C92A7');
    cool.addColorStop(0.80,'#3584AF');
    cool.addColorStop(0.70,'#4F77B7');
    cool.addColorStop(0.60,'#6869BF');
    cool.addColorStop(0.50,'#825CC6');
    cool.addColorStop(0.40,'#9B4ECE');
    cool.addColorStop(0.30,'#B541D6');
    cool.addColorStop(0.20,'#CE33DE');
    cool.addColorStop(0,'#E826E6')
    //COOL END

    rainbow.addColorStop(0.90,'#E50002')
    rainbow.addColorStop(0.80,'#E56F00')
    rainbow.addColorStop(0.70,'#E5E100')
    rainbow.addColorStop(0.60,'#77E500')
    rainbow.addColorStop(0.50,'#05E600')
    rainbow.addColorStop(0.40,'#00E66E')
    rainbow.addColorStop(0.30,'#01E6E0')
    rainbow.addColorStop(0.20,'#017AE7')
    rainbow.addColorStop(0.10,'#6D01E7')
    rainbow.addColorStop(0,'#E001E8')



      function filler(){
      $('.warm').click(function(){
        ctx.fillStyle = warm
      })

    }
    filler()

    function filler1(){
    $('.cool').click(function(){
      ctx.fillStyle = cool
    })

  }
  filler1()

  function filler2(){
  $('.greenred').click(function(){
    ctx.fillStyle = greenred
  })

}
filler2()

function filler3(){
$('.rainbow').click(function(){
  ctx.fillStyle = rainbow
})

}
filler3()


//100 bars render
  bars = 300;
  //renders bars at different heights every loop
  for (var i = 0; i < bars; i++) {
    bar_x = i * 2;
    //give bar width in px
    bar_width = 1;
    //make bars change height
    bar_height = -(fbc_array[i] / 2);
    //draws each bar
    ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);

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
           for(let i = 0; i < 50; i++) {
             randomTracks.push(getRandomTrack(tracksResults));
           }

           const baseUrl = `https://embed.spotify.com/?theme=white&uri=spotify:trackset:Your Random Playlist:${randomTracks.join()}`;

           $('.playlist').html(`<iframe src="${baseUrl}" height="400"></iframe>`)

           analyser = context.createAnalyser();
           analyser.smoothingTimeConstant = 0.9;
           analyser.fftSize = 1024;
           source.connect(analyser)
           analyser.connect(context.destination);



          //  console.log(baseUrl)

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
    //  console.log(trackArray)
   }

   app.init =  function() {
     app.events( )
   }

   $(app.init);
