const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
  .then(localMediaStream =>{
    video.src = window.URL.createObjectURL(localMediaStream);
    video.play();
  })
  .catch(err =>{
    console.error('WEBCAM DENIED', err)
  })
}

function paintToCanavas(){
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;


  return setInterval(() =>{
    ctx.drawImage(video, 0, 0, width, height);
    //Take the pixels out
    let pixels = ctx.getImageData(0,0, width, height);
    //Mess with them
    pixels = redEffect(pixels);
    //put them back
    ctx.putImageData(pixels, 0,0);
  }, 16);
}

function takePhoto(){
  snap.currentTime = 0;
  snap.play();

  //Removedata from canvas
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}" alt="Person"/>`
  strip.insertBefore(link, strip.firstChild);
  console.log(data);
}
function redEffect(pixels){
  for(let i = 0; i < pixels.data.length; i+=4){
    pixels[i - 150] = pixels.data[i + 0] + 100;//r
    pixels[i + 100] = pixels.data[i + 1] - 50;//g
    pixels[i - 150] = pixels.data[i + 2] * 0.5;//b
  }
  return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanavas)
