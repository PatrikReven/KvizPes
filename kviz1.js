const questions = [
    {
      question: "1. Pes je udomačeni potomec katere divje živali?",
      options: ["A: Lisice", "B: Šakala", "C: Kojota", "D: Volka"],
      answer: "D: Volka",
      points: 10
    },
    {
      question: "2. CNN je televizijska mreža, ki 24 ur na dan oddaja:",
      options: ["A: Filme", "B: Šport", "C: Novice", "D: Humoristične serije"],
      answer: "C: Novice",
      points: 20
    },
    // Dodaj še do 12 vprašanj, npr.:
    {
      question: "3. Katero leto je ustanovljen Facebook?",
      options: ["A: 2002", "B: 2004", "C: 2006", "D: 2008"],
      answer: "B: 2004",
      points: 15
    },
    {
        question: "3. Katero leto je ustanovljen Facebook?",
        options: ["A: 2002", "B: 2004", "C: 2006", "D: 2008"],
        answer: "B: 2004",
        points: 15
      },
      {
        question: "3. Katero leto je ustanovljen Facebook?",
        options: ["A: 2002", "B: 2004", "C: 2006", "D: 2008"],
        answer: "B: 2004",
        points: 15
      },
      {
        question: "3. Katero leto je ustanovljen Facebook?",
        options: ["A: 2002", "B: 2004", "C: 2006", "D: 2008"],
        answer: "B: 2004",
        points: 15
      },
      {
        question: "3. Katero leto je ustanovljen Facebook?",
        options: ["A: 2002", "B: 2004", "C: 2006", "D: 2008"],
        answer: "B: 2004",
        points: 15
      },
      {
        question: "3. Katero leto je ustanovljen Facebook?",
        options: ["A: 2002", "B: 2004", "C: 2006", "D: 2008"],
        answer: "B: 2004",
        points: 15
      },
    // ... ostala vprašanja
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let selectedOption = null;
  let fiftyUsed = false;
  // Shrani rezultate (true/false) za vsako vprašanje
  let results = new Array(questions.length).fill(null);
  
  const correctSound = new Audio('zvok/correct.mp3');
const incorrectSound = new Audio('zvok/incorrect.mp3');
  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const nextButton = document.getElementById('next-btn');
  const pointsDisplay = document.getElementById('pointsDisplay');
  const miljonarContainer = document.getElementById('miljonar');
  const miljonarPoints = document.getElementById('miljonar-points');
  const trackerContainer = document.getElementById('tracker-container');
  
  const fiftyButton = document.getElementById('fifty-fifty-btn');
  const callButton = document.getElementById('timer-btn2');
  const audienceButton = document.getElementById('timer-btn');
  
  // Generiraj začetni tracker (12 krogcev)
  function initTracker() {
    trackerContainer.innerHTML = "";
    for (let i = 0; i < questions.length; i++) {
      const trackerItem = document.createElement('div');
      trackerItem.classList.add('tracker-item');
      trackerContainer.appendChild(trackerItem);
    }
  }
  
  function updateTracker() {
    const trackerItems = document.querySelectorAll('.tracker-item');
    results.forEach((res, index) => {
      if (res === true) {
        trackerItems[index].classList.add('correct');
        trackerItems[index].classList.remove('wrong');
      } else if (res === false) {
        trackerItems[index].classList.add('wrong');
        trackerItems[index].classList.remove('correct');
      } else {
        // Ni odgovora, privzeto stanje
        trackerItems[index].classList.remove('correct', 'wrong');
      }
    });
  }
  
  // Prikaz vprašanja
  function displayQuestion() {
    const currentQuiz = questions[currentQuestion];
    questionElement.textContent = currentQuiz.question;
    optionsElement.innerHTML = "";
    selectedOption = null;
    
    // Prikaži vse možnosti (če so bile skrite zaradi 50/50)
    document.querySelectorAll('.option').forEach(btn => btn.style.display = "block");
    
    currentQuiz.options.forEach(optionText => {
      const button = document.createElement('button');
      button.textContent = optionText;
      button.classList.add('option');
      button.addEventListener('click', () => selectAnswer(button, optionText));
      optionsElement.appendChild(button);
    });
    
    // Skrij gumb "Naprej" za novo vprašanje
    nextButton.style.display = "none";
    // Resetiraj Milijonar kontejner
    miljonarContainer.classList.remove('correct');
    animateElements();
  }
  
  // Obdelava izbire odgovora
  function selectAnswer(button, optionText) {
    if (!selectedOption) {
      selectedOption = button;
      button.classList.add('selected');
    } else if (selectedOption === button) {
      const correctAnswer = questions[currentQuestion].answer;
      document.querySelectorAll(".option").forEach(btn => btn.disabled = true);
      
      let isCorrect = (optionText === correctAnswer);
      results[currentQuestion] = isCorrect;
      
      if (isCorrect) {
        button.classList.remove('selected');
        button.classList.add('correct');
        score += questions[currentQuestion].points;
        miljonarContainer.classList.add('correct');
        correctSound.play();
      } else {
        button.classList.remove('selected');
        button.classList.add('wrong');
        miljonarContainer.classList.remove('correct');
        incorrectSound.play();

         // Prikaz pravilnega odgovora pod vsemi možnostmi
      const correctAnswerText = document.createElement('p');
      correctAnswerText.classList.add('correct-answer');
      correctAnswerText.textContent = `Pravi odgovor je: ${correctAnswer}`;
      optionsElement.appendChild(correctAnswerText);
    }

      
      pointsDisplay.textContent = `Trenutne točke: ${score}`;
      miljonarPoints.textContent = score;
      
      // Posodobi tracker
      updateTracker();
      
      setTimeout(() => {
        nextButton.style.display = "flex";
      }, 500);
      
      animateElements();
    }
  }
  
  // Funkcija za uporabo 50/50 pomoči
  fiftyButton.addEventListener('click', () => {
    if (fiftyUsed) return;
    fiftyUsed = true;
    fiftyButton.classList.add("used");
    fiftyButton.disabled = true;
    
    const correctAnswer = questions[currentQuestion].answer;
    const options = Array.from(document.querySelectorAll('.option'));
    const wrongOptions = options.filter(btn => btn.textContent !== correctAnswer);
    
    const toRemove = wrongOptions.sort(() => 0.5 - Math.random()).slice(0, 2);
    toRemove.forEach(btn => btn.style.display = "none");
    
    animateElements();
  });
  
  // Onemogoči gumb pomoči
  function disableHelpButton(button) {
    button.classList.add("disabled");
    button.disabled = true;
    animateElements();
  }
  
  audienceButton.addEventListener('click', () => {
    disableHelpButton(audienceButton);
    animateElements();
  });
  
  callButton.addEventListener('click', () => {
    disableHelpButton(callButton);
    animateElements();
  });
  
  // Prehod na naslednje vprašanje
  nextButton.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      questionElement.textContent = "Konec kviza!";
      optionsElement.innerHTML = "";
      nextButton.style.display = "none";
    }
  });
  
  // Animacija elementov
  function animateElements() {
    questionElement.classList.add('fadeIn');
    optionsElement.classList.add('fadeIn');
    nextButton.classList.add('fadeIn');
    pointsDisplay.classList.add('fadeIn');
    if (fiftyUsed) fiftyButton.classList.add('fadeIn');
    if (audienceButton.disabled) audienceButton.classList.add('fadeIn');
    if (callButton.disabled) callButton.classList.add('fadeIn');
    
    setTimeout(() => {
      questionElement.classList.remove('fadeIn');
      optionsElement.classList.remove('fadeIn');
      nextButton.classList.remove('fadeIn');
      pointsDisplay.classList.remove('fadeIn');
      if (fiftyUsed) fiftyButton.classList.remove('fadeIn');
      if (audienceButton.disabled) audienceButton.classList.remove('fadeIn');
      if (callButton.disabled) callButton.classList.remove('fadeIn');
    }, 1000);
  }
  
  initTracker();
  displayQuestion();
  
  // Timer funkcionalnost
  let timer;
  let running = false;
  let seconds = 60;  // 60 sekund
  let minutes = 0;
  
  function startTimer() {
    if (running) return;
    
    running = true;
    timer = setInterval(updateTime, 1000);
    document.getElementById('start').disabled = true;
    document.getElementById('stop').disabled = false;
    document.getElementById('reset').disabled = false;
  }
  
  function stopTimer() {
    if (!running) return;
    
    running = false;
    clearInterval(timer);
    document.getElementById('start').disabled = false;
    document.getElementById('stop').disabled = true;
  }
  
  function resetTimer() {
    running = false;
    clearInterval(timer);
    seconds = 60;
    minutes = 0;
    document.getElementById('timer').textContent = "01:00";
    document.getElementById('start').disabled = false;
    document.getElementById('stop').disabled = true;
    document.getElementById('reset').disabled = true;
  }
  
  function updateTime() {
    if (seconds === 0 && minutes === 0) {
      stopTimer();
      return;
    }
    
    if (seconds === 0) {
      seconds = 59;
      minutes--;
    } else {
      seconds--;
    }
    
    document.getElementById('timer').textContent = formatTime(minutes, seconds);
  }
  
  function formatTime(minutes, seconds) {
    return `${padTime(minutes)}:${padTime(seconds)}`;
  }
  
  function padTime(time) {
    return time < 10 ? '0' + time : time;
  }
  