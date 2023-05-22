
function toggleAudio(button) {
    var audioPlayers = document.getElementsByClassName("audio-player");
    var playButtons = document.getElementsByClassName("play-btn");

    // Pause all other audio players
    for (var i = 0; i < audioPlayers.length; i++) {
      if (
        audioPlayers[i] !== button.parentNode.querySelector(".audio-player")
      ) {
        audioPlayers[i].pause();
        audioPlayers[i].currentTime = 0; // Reset audio to start
        playButtons[i].querySelector(".fa-pause").style.display = "none";
        playButtons[i].querySelector(".fa-play").style.display =
          "inline-block";
        resetProgressBar(audioPlayers[i]); // Reset progress bar
      }
    }

    var audioPlayer = button.parentNode.querySelector(".audio-player");
    var pauseIcon = button.querySelector(".fa-pause");
    var playIcon = button.querySelector(".fa-play");

    if (audioPlayer.paused) {
      audioPlayer.play();
      pauseIcon.style.display = "inline-block";
      playIcon.style.display = "none";
    } else {
      audioPlayer.pause();
      pauseIcon.style.display = "none";
      playIcon.style.display = "inline-block";
    }
  }

  function updateProgressBar(audio) {
    var progressBar = audio.parentNode.querySelector(".progress-bar");
    var progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + "%";
  }

  function resetProgressBar(audio) {
    var progressBar = audio.parentNode.querySelector(".progress-bar");
    progressBar.style.width = "0%";
  }

  ////////////////////////////
  // Random array of teachings
  var teachings = [
    {
      title: "Teaching 1",
      id: "teaching1",
      audioFile: "/media/teachings/Home Leadership.mp3",
      description: "Description for Teaching 1",
      subTitle: "Sub-Title for Teaching 1",
      imageFile: "/images/hero-bible.jpg",
    },
    {
      title: "Teaching 2",
      id: "teaching2",
      audioFile: "/media/teachings/Home Leadership.mp3",
      description: "Description for Teaching 2",
      subTitle: "Sub-Title for Teaching 2",
      imageFile: "/images/hero-bible.jpg",
    },
    // Add more teachings as needed
  ];
  /////////////////////////////

  // Rendering the teachings
  var teachingContainer = document.querySelector(".container .row");
  teachings.forEach(function (teaching) {
    // Create the card element
    var card = document.createElement("div");
    card.className = `col-md-2 border m-1 p-2 ${teaching.id}`;

    // Create the t-card element
    var tCard = document.createElement("div");
    tCard.className = `t-card ${teaching.id}`;

    // Create the card image element
    var cardImage = document.createElement("img");
    cardImage.className = `card-img-top ${teaching.id}`;
    cardImage.src = teaching.imageFile;
    cardImage.alt = teaching.title;

    // Create the card body element
    var cardBody = document.createElement("div");
    cardBody.className = `card-body ${teaching.id}`;

    // Create the title element
    var title = document.createElement("h2");
    title.textContent = teaching.title;

    // Create the sub-title element
    var subTitle = document.createElement("span");
    subTitle.className = `h6 ${teaching.id}`;
    subTitle.textContent = teaching.subTitle;

    // Create the description element
    var description = document.createElement("p");
    description.className = `card-text ${teaching.id}`;
    description.textContent = teaching.description;

    // Create the progress bar element
    var barBody = document.createElement("div");
    barBody.className = `progress-container ${teaching.id}`;
    var bar = document.createElement("div");
    bar.className = `progress-bar ${teaching.id}`;
    bar.style.width = "0%";
    barBody.appendChild(bar);

    // Create the play button element
    var playButton = document.createElement("button");
    playButton.className = `play-btn ${teaching.id}`;
    playButton.onclick = function () {
      toggleAudio(this);
    };

    // Create the play icon element
    var playIcon = document.createElement("i");
    playIcon.className = `fas fa-play ${teaching.id}`;

    // Create the pause icon element
    var pauseIcon = document.createElement("i");
    pauseIcon.className = `fas fa-pause ${teaching.id}`;
    pauseIcon.style.display = "none";

    // Append the play and pause icons to the play button
    playButton.appendChild(playIcon);
    playButton.appendChild(pauseIcon);

    // Create the audio element
    var audioPlayer = document.createElement("audio");
    audioPlayer.className = `audio-player d-none ${teaching.id}`;
    audioPlayer.controls = true;

    // Create the audio source element
    var audioSource = document.createElement("source");
    audioSource.src = teaching.audioFile;
    audioSource.type = "audio/mpeg";

    // Append the audio source to the audio element
    audioPlayer.appendChild(audioSource);

    // Add event listener for audio loadedmetadata event
    audioPlayer.addEventListener("loadedmetadata", function () {
      // Create the progress bar element
      var barBody = document.createElement("div");
      barBody.className = `progress-container ${teaching.id}`;
      var bar = document.createElement("div");
      bar.className = `progress-bar ${teaching.id}`;
      bar.style.width = "0%";
      barBody.appendChild(bar);

      // Append the progress bar to the card body
      cardBody.appendChild(barBody);

      // Add event listener for progress bar click event
      barBody.addEventListener("click", function (event) {
        var progressContainer = event.currentTarget;
        var progressBar = progressContainer.querySelector(".progress-bar");
        var audioPlayer =
          progressContainer.parentNode.querySelector(".audio-player");
        var rect = progressContainer.getBoundingClientRect();
        var totalWidth = rect.width;
        var clickX = event.clientX - rect.left;
        var progress = (clickX / totalWidth) * 100;
        audioPlayer.currentTime = (audioPlayer.duration * progress) / 100;
        progressBar.style.width = progress + "%";
      });
    });

    // Create the time display elements
    var timeDisplay = document.createElement("div");
    timeDisplay.className = `time-display ${teaching.id}`;
    var currentTimeSpan = document.createElement("span");
    currentTimeSpan.className = `current-time ${teaching.id}`;
    var separatorSpan = document.createElement("span");
    separatorSpan.textContent = " / ";
    var totalTimeSpan = document.createElement("span");
    totalTimeSpan.className = `total-time ${teaching.id}`;

    // Append all elements to the card body
    cardBody.appendChild(title);
    cardBody.appendChild(subTitle);
    cardBody.appendChild(description);
    cardBody.appendChild(document.createElement("hr"));
    cardBody.appendChild(playButton);
    cardBody.appendChild(timeDisplay);
    cardBody.appendChild(audioPlayer);
    
    timeDisplay.appendChild(currentTimeSpan);
    timeDisplay.appendChild(separatorSpan);
    timeDisplay.appendChild(totalTimeSpan);

    // Update the time display
    audioPlayer.addEventListener("loadedmetadata", function () {
      var currentTime = formatTime(audioPlayer.currentTime);
      var totalTime = formatTime(audioPlayer.duration);
      currentTimeSpan.textContent = currentTime;
      totalTimeSpan.textContent = totalTime;
    });
    audioPlayer.addEventListener("timeupdate", function () {
      var currentTime = formatTime(audioPlayer.currentTime);
      var totalTime = formatTime(audioPlayer.duration);
      currentTimeSpan.textContent = currentTime;
      totalTimeSpan.textContent = totalTime;
    });

    // Function to format time in hh:mm format
    function formatTime(time) {
      var hours = Math.floor(time / 3600);
      var minutes = Math.floor((time % 3600) / 60);
      var seconds = Math.floor(time % 60);

      var formattedTime = "";
      if (hours > 0) {
        formattedTime += hours.toString().padStart(2, "0") + ":";
      }
      formattedTime +=
        minutes.toString().padStart(2, "0") +
        ":" +
        seconds.toString().padStart(2, "0");

      return formattedTime;
    }

    // Append the card image and card body to the t-card
    tCard.appendChild(cardImage);
    tCard.appendChild(cardBody);

    // Append the t-card to the card
    card.appendChild(tCard);

    // Append the card to the teaching container
    teachingContainer.appendChild(card);
  });

  // Update progress bars continuously
  setInterval(function () {
    var audioPlayers = document.getElementsByClassName("audio-player");
    for (var i = 0; i < audioPlayers.length; i++) {
      if (!audioPlayers[i].paused) {
        updateProgressBar(audioPlayers[i]);
      }
    }
  }, 500);