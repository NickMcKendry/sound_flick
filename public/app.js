// var audioContext = new (window.AudioContext || window.webkitAudioContext);
// var analyser = audioContext.createAnalyser();
//
// var song = document.querySelector('audio')
// var source = audioContext.createMediaElementSource(song);
// source.connect(analyser);
// source.connect(audioContext.destination);
//
// analyser.fftSize = 2048;
//
// var bufferLength = analyser.frequencyBinCount;
// console.log(bufferLength)
// var dataArray = new Uint8Array(bufferLength)
// var myDataArray = new Float32Array(bufferLength);
// analyser.getFloatFrequencyData(myDataArray);
// analyser.getByteFrequencyData(dataArray);
// analyser.getByteTimeDomainData(dataArray);
// analyser.getFloatTimeDomainData(myDataArray)
// console.log(dataArray);
// console.log(myDataArray)







// $(document).ready(function(){
//   console.log("ready")
//   $('button').on("click", function(){
//     $('.content ul').remove()
//     $('<i class="fa fa-refresh fa-spin"/>').appendTo('body');
//     // var url = $.getJSON('http://freemusicarchive.org/.json')
//     // .then(function(data){
//     //   console.log(data)
//       getRandomSong()
//     // })
//
//
//     // console.log(url)
//
//     function getRandomSong() {
//       var url1 = 'https://galvanize-cors.herokuapp.com/https://freemusicarchive.org/api/get/tracks.json?api_key=4UHWNQC5GQMWWR1P'
//       url1 = url1 + $.get(url1).then(function(data){
//         console.log(data)
//         updateSong(data)
//         })
//
//
//     }
//     function updateSong(data) {
//       var array = data.dataset
//       var random = Math.floor(Math.random() * array.length)
//       console.log(random);
//
//       for (var i = 0; i < array.length; i++) {
//         if (random === i) {
//           array = data.dataset[i].track_url
//           console.log(i)
//         }
//       }
//       $('.song').text(data.dataset[0].track_url)
//     }
//   })
// })
//Create a new audio object
var audio = document.createElement('audio');
audio.src = '06 Salute e Vita.mp3'
console.log(audio)
audio.controls = true;
document.body.appendChild(audio)
audio.style.width = window.innerWidth + 'px';
audio.loop = true;
audio.autoplay = true;
//establish all variables that analyser will use
var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
//initialize mp3 after page loads html
window.addEventListener('load', initMp3Player, false);

function initMp3Player() {
  //add audio element to audiobox
  document.getElementById('audio_box').appendChild(audio);
  //assign context to new audio context object
  context = new AudioContext();
  //create analyser on context
  analyser = context.createAnalyser();
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
  //set color of bars
  ctx.fillStyle = '#22aa99';
  //100 bars render
  bars = 75;
  //renders bars at different heights every loop
  for (var i = 0; i < bars; i++) {
    //give each bar different x position at start
    var random = Math.random,
      red = random() * 255 >> 0,
       green = random() * 255 >> 0,
       blue = random() * 255 >> 0

       ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue  + ')';
    bar_x = i * 4;
    //give bar width in px
    bar_width = 3;
    //make bars change height
    bar_height = -(fbc_array[i] / 2);
    //draws each bar
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
