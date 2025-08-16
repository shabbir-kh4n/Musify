console.log("Connected");
let songs; //for store adress of songs
let SongArr;  //for addevent to songs list 
let index; 
let preIndex
let prepIndex;
let currentSong = new Audio();


async function getSongs(folder) {
    let a = await fetch(`songs/${folder}/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    songs = [];
    index = 0;
    let port = as[0].href
    for (let index = 1; index < as.length; index++) {
        const element = as[index];
        if (element.href.includes(".mp3")) {
            songs.push(port + element.href.replaceAll("http://", "").replaceAll(".preview", ""))
        }
    }
    pusher();

    //attach event listerner to each song
    SongArr = Array.from(
        document.querySelector(".songlist").getElementsByTagName("li")
    );
    SongArr.forEach((e) => {
        e.addEventListener("click", (element) => {
            preIndex = index;
            prepIndex = index;
            index = SongArr.indexOf(e);
            if (currentSong.paused) {
                playmus(index);
            } else {
                pausemus(index);
                if (currentSong.src != songs[index]) {
                    currentSong.src = songs[index];
                    Array.from(pl)[preIndex].src = "img/play.svg";
                    playmus(index);
                }
            }
        });
    });
}

//pasue music
function pausemus(index) {
    currentSong.pause();
    play.src = "img/play.svg";
    Array.from(pl)[index].src = "img/play.svg";
}

//play music
function playmus(index, pause = false) {
    prepIndex = index;
    document.querySelector(".songinfo").innerHTML = songs[index].replaceAll("%20", " ").split('/')[5].replace(".mp3", "");
    if (currentSong.src != songs[index]) {
        currentSong.src = songs[index];
    }
    if (!pause) {
        currentSong.play();
        Array.from(pl)[index].src = "img/pause.svg";
        play.src = "img/pause.svg";
    }
}

//displaying name of music
function pusher() {

    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    songUL.innerHTML = "";

    for (const song of songs) {

        songUL.innerHTML += `<li>
                        <img class="invert" src="img/music.svg" alt="">
                        <div class="info">
                            <div class="Song">${song.replaceAll("%20", " ").split('/')[5].replaceAll(".mp3", "")}</div>
                            <div class="Artist">${song.replaceAll("%20", " ").split('/')[4]}</div>
                        </div>
                        <div class="playnow">
                            <span>Play Now</span>
                            <img id="pl" class="invert" src="img/play.svg" alt="">
                        </div>
                    </li>`;
    }
}

//formatting time
function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const totalSeconds = Math.floor(seconds);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
}

//display all the albums
async function displayAlbum() {
    let a = await fetch(`songs/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let cardContainer = document.querySelector(".cardContainer");
    let anchors = div.getElementsByTagName("a");
    let array = Array.from(anchors);
    let folder = "";
    for (let index = 3; index < array.length; index++) {
        const e = array[index];

        if (e.href.includes("/songs/")) {
            folder = e.href.split("songs/").slice(-1)[0].replaceAll("/", "");
            //Get metadata of the folder
            let a = await fetch(`songs/${folder}/info.json`);
            let response = await a.json();

            cardContainer.innerHTML += `<div data-folder=${folder} class="card cursor">
                        <div class="play cursor">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                                fill="fill" style="color: black;">
                                <path
                                    d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z"
                                    stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <img src="songs/${folder}/cover.jpg" alt="img">
                        <h2>${response.title}</h2>
                        <p>${response.description}</p>
                    </div>`;
        }
    }

    //load playList whenever card is clicked
    Array.from(document.getElementsByClassName("card")).forEach((e) => {
        e.addEventListener("click", async function(item) {
            await getSongs(`${this.dataset.folder}`);
            if (prepIndex == songs.indexOf(currentSong.src)) {
                index = prepIndex
                if (!currentSong.paused) {
                    Array.from(pl)[index].src = "img/pause.svg";
                }
            }
        });
    });
}


//loading all songs
async function allSongs() {
    let folder = ""
    songs = [];
    index = 0
    let a = await fetch(`songs/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a");
    let array = Array.from(anchors);
    for (let index = 3; index < array.length; index++) {
        const element = array[index];
        if(element.href.includes("songs/")){
            folder = element.href.split("songs/").slice(-1)[0].replaceAll("%20", " ").replaceAll("/", "");
        }
        
        let ab = await fetch(`songs/${folder}/`);
        let response = await ab.text();
        let div = document.createElement("div");
        div.innerHTML = response;
        let as = div.getElementsByTagName("a");
        let port = as[0].href
        for (let index = 0; index < as.length; index++) {
            const e = as[index];
            
            if (e.href.includes(".mp3")) {
                songs.push(port + e.href.replaceAll("http://", "").replaceAll(".preview", ""));
            }
        }
        pusher()
    }
    

    //attach event listerner to each song
    SongArr = Array.from(
        document.querySelector(".songlist").getElementsByTagName("li")
    );
    SongArr.forEach((e) => {
        e.addEventListener("click", (element) => {
            preIndex = index;
            index = SongArr.indexOf(e);
            document.querySelector(".songinfo").innerHTML = songs[index].replaceAll("%20", " ").split('/')[5].replace(".mp3", "");
            if (currentSong.paused) {
                if(currentSong.src != songs[index]) {
                    currentSong.src = songs[index];
                }
                currentSong.play();
                Array.from(pl)[index].src = "img/pause.svg";
                play.src = "img/pause.svg";
            }else {
                pausemus(index);
                if (currentSong.src!= songs[index]) {
                    currentSong.src = songs[index];
                    Array.from(pl)[preIndex].src = "img/play.svg";
                    currentSong.play();
                    Array.from(pl)[index].src = "img/pause.svg";
                    play.src = "img/pause.svg";
                }
            }
        });
    });

    currentSong.volume = 0.5;
}


//main functiom
async function main() {

    await displayAlbum();


    await allSongs();
    playmus(index, true);

    //event listner to play of card
    document.querySelectorAll(".play").forEach((e) => {
        e.addEventListener("click", () => {
            setTimeout(() => {
                playmus(index);
            }, 100);
        });
    });

    //Attach an event to prev, play and next
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            if (currentSong.src !== songs[index]) {
                currentSong.play()
                play.src = "img/pause.svg"
            }
            else {
                playmus(index);
            }
        } else {
            pausemus(index);
        }
    });

    next.addEventListener("click", () => {
        pausemus(index)
        if (currentSong.src != songs[index]) {
            index = 0
            playmus(index);
        }
        else if (index == songs.length - 1) {
            preIndex = index;
            index = 0;
            playmus(index);
            Array.from(pl)[preIndex].src = "img/play.svg";
        } else {
            preIndex = index;
            index++;
            playmus(index);
            Array.from(pl)[preIndex].src = "img/play.svg";
        }
    });

    previous.addEventListener("click", () => {
        pausemus(index)
        if (index == 0) {
            preIndex = index;
            index = songs.length - 1;
            playmus(index);
            Array.from(pl)[preIndex].src = "img/play.svg";
        } else {
            preIndex = index;
            index--;
            playmus(index);
            Array.from(pl)[preIndex].src = "img/play.svg";
        }
    });

    //listen for time update event
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${formatTime(
            currentSong.currentTime
        )} / ${formatTime(currentSong.duration)}`;
        document.querySelector(".circle").style.left =
            (currentSong.currentTime / currentSong.duration) * 100 + "%";
        if (currentSong.currentTime == currentSong.duration) {
            Array.from(pl)[index].src = "img/play.svg";
            play.src = "img/play.svg";
            currentSong.pause();
            if (index == songs.length - 1) {
                index = 0;
            } else {
                index++;
            }
            playmus(index);
        }
    });

    //lister to seekbar
    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    });

    //listner to hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = 0;
    });

    //listner to cross
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    //add event to volume
    let val = 50;
    document.querySelector(".range").addEventListener("change", (e) => {
        val = e.target.value;
        currentSong.volume = parseInt(val) / 100;
        if (e.target.value == 0) {
            vol.src = "img/mute.svg";
        } else {
            vol.src = "img/volume.svg";
        }
    });

    //volume icon Listner
    vol.addEventListener("click", () => {
        if (currentSong.volume != 0) {
            vol.src = "img/mute.svg";
            currentSong.volume = 0;
        } else {
            vol.src = "img/volume.svg";
            currentSong.volume = parseInt(val) / 100;
        }
    });


    //event to search
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", () => {
        const filter = searchInput.value.toLowerCase();
        SongArr.forEach((e) => {
            const text = e.textContent
                .replace("Play Now")
                .toLowerCase();
            if (text.includes(filter)) {
                e.style.display = "flex";
            } else {
                e.style.display = "none";
            }
        });
    });

    //event to logo
    document.querySelector(".logo").addEventListener("click", async () => {
        await allSongs()
        index = songs.indexOf(currentSong.src);
        if (!currentSong.paused){
            Array.from(pl)[index].src = "img/pause.svg";
        }

        
    })

    currentSong.addEventListener("pause",()=>{
        play.src = "img/play.svg"
        Array.from(pl)[index].src = "img/play.svg";
        console.log("paused");
    })
    currentSong.addEventListener("play",()=>{
        play.src = "img/pause.svg"
        Array.from(pl)[index].src = "img/pause.svg";
        console.log("played");
    })
}

main();
