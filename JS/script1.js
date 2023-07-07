console.log("WELCOME TO SPOTIFY");

//Initialising the variable
let songIndex = 0;
let audioElement = new Audio('../Music1/JB Let me love you.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItem= Array.from(document.getElementsByClassName('songItem'));

//Array of songs name and cover 
let songs=[
    {songName:"Let Me Love You", filePath:"../Music1/1.mp3", coverPath:"../Pictures1/Let me love you.png"},
    {songName:"Boyfriend", filePath:"Music1/2.mp3", coverPath:"../Pictures1/Boyfriend.jpg"},
    {songName:"Cold Water", filePath:"../Music1/3.mp3", coverPath:"../Pictures1/Cold Water.png"},
    {songName:"Sorry", filePath:"../Music1/4.mp3", coverPath:"../Pictures1/Sorry.png"},
    {songName:"Baby", filePath:"../Music1/5.mp3", coverPath:"../Pictures1/Baby.jpg"},
];

songItem.forEach((element,i)=>{
    //console.log(element, i);
    element.getElementsByTagName('img')[0].src=songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});
//audioElement=new Audio("Music1/JB Let me love you.mp3");
//audioElement.play();

//Handle Play/Pause on click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime <=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
});

//Listen to events
audioElement.addEventListener('timeupdate',()=>{
    //console.log('timeupdate');
    //Updating seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    //console.log(progress);
    myProgressBar.value=progress;
});

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime= (myProgressBar.value*audioElement.duration)/100;
});

const makeAllPlays= () =>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle'); 
    });
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        //console.log(e.target);
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src=`../Music1/${songIndex+1}.mp3`;
        masterSongName.innerText=songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});
 
//For next song
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex >= 5)
        songIndex = 0;
    else
        songIndex += 1;
    audioElement.src=`../Music1/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

//For previous song
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex <= 0)
        songIndex = 0;
    else
        songIndex -= 1;
    audioElement.src=`../Music1/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
