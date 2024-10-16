const NavLinks = document.querySelectorAll('aside nav ul li a');
const NavIcon = document.querySelector('aside nav ul .icon');
const preloader = document.querySelector('.preloader');
const pages = document.querySelectorAll('.page');
const home = document.querySelector('.home');
const sidebar = document.querySelector('#sidebar');
const sidebarHeader = document.querySelector('#sidebar .heading');
const hamburger = document.querySelector('.hamburger');
const viewInfoButtons = document.querySelectorAll('.viewInfo');
const exploreButtons = document.querySelectorAll('.explore');
const preloaderTexts = document.querySelectorAll('.preloader .text');
const preloaderSplineObject = document.querySelector('.preloader #preloaderSplineObject');
const prePreloader = document.querySelector('.preloader .pre-preloader');
const preloaderLoadingText = document.querySelector('.preloader .loading-text');
const audioPlayer = document.querySelector('#audioPlayer');
const audioSlider = document.querySelector('.audio-slider');
const audioSliderCircle = document.querySelector('.audio-slider .circle');
const audioSliderMuteIcon = document.querySelector('.audio-slider .fa-volume-xmark');
const audioSliderUnmuteIcon = document.querySelector('.audio-slider .fa-volume-high');
const modelViewers = document.querySelectorAll('model-viewer');
const MWLoaders = document.querySelectorAll('.MWLoader');
const pageInfos = document.querySelectorAll('.page .info');
const homeInfo = document.querySelector('.home .info');

//Page Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.classList.add('hide');
    }, 8000);
});

// Zeige den Text nach einer Verzögerung an, die das Laden des Spline-Objekts berücksichtigt
setTimeout(() => {
  preloaderTexts.forEach(preloaderText => {
    preloaderText.style.opacity = "1"; // Text anzeigen
  });

  prePreloader.style.opacity = "0"; // Pre-Preloader ausblenden
  preloaderSplineObject.style.opacity = "1"; // Spline-Objekt anzeigen
  preloaderLoadingText.style.animation = "text-fading 3s infinite"; // Textanimation starten
}, 3000);


// Scrollen per Mausrad deaktivieren
window.addEventListener("wheel", function(e) {
    e.preventDefault(); // Verhindert das Scrollen
  }, { passive: false }); // 'passive: false' erlaubt die Nutzung von e.preventDefault()

 // Verhindert das Scrollen bei gedrücktem Mausrad
 document.addEventListener('mousedown', function(event) {
  // Überprüfen, ob das mittlere Mausrad gedrückt wird (event.button === 1)
  if (event.button === 1) {
      event.preventDefault();  // Standardaktion wie Scrollen verhindern
  }
});

// Sidebar Toggle
hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('show');
  hamburger.classList.toggle('isX');
  
  if (window.innerWidth < 1450) {
    const isSidebarVisible = sidebar.classList.contains('show');

    pageInfos.forEach(pageInfo => {
      if (isSidebarVisible) {
        pageInfo.classList.add('blur');
        homeInfo.classList.add('blur');
      } else {
        pageInfo.classList.remove('blur');
        homeInfo.classList.remove('blur');
      }
    });
  }
});

if (window.innerWidth < 1450) {
  sidebar.classList.remove('show');
  hamburger.classList.remove('isX');
}

// Navigate Between Pages
// NavLinks Icon Movement
NavLinks.forEach((link, index) => {
  link.addEventListener('click', () => {
    home.style.display = 'none';
    pages.forEach(page => page.classList.remove('active'));
    pages[index].classList.add('active');
    NavIcon.style.transform = `translateY(${index * 50}px) rotate(90deg)`;
    NavIcon.classList.add('active');
    if (window.innerWidth < 1450) {
      sidebar.classList.remove('show');
      hamburger.classList.remove('isX');
    }
  });
});

sidebarHeader.addEventListener('click', () => {
  home.style.display = 'block';
  pages.forEach(page => page.classList.remove('active'));
  NavIcon.classList.remove('active');
  setTimeout(() => {
    NavIcon.style.transform = `translateY(0px) rotate(90deg)`;
  }, 200);
  if (window.innerWidth < 1450) {
    sidebar.classList.remove('show');
    hamburger.classList.remove('isX');
  }
});

//View Info and Explore Buttons
viewInfoButtons.forEach(viewInfoButton => {
  viewInfoButton.addEventListener('click', () => {
    window.scrollTo({
      top: window.innerHeight, // window.innerHeight = 100vh
      behavior: 'smooth'
    });
    if (window.innerWidth < 1450) {
      sidebar.classList.remove('show');
      hamburger.classList.remove('isX');
      homeInfo.classList.remove('blur');
      pageInfos.forEach(pageInfo => pageInfo.classList.remove('blur'));
    }
  });
});

exploreButtons.forEach(exploreButton => {
  exploreButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

// Music Mute Slider
let isMuted = true;

audioSlider.addEventListener('click', () => {
  isMuted = !isMuted;
  if (isMuted) {
    audioSliderCircle.style.left = "0";
    audioSliderMuteIcon.classList.add('active');
    audioSliderUnmuteIcon.classList.remove('active');
    audioPlayer.muted = true;  // Audio stummschalten
    
  } else {
    audioSliderCircle.style.left = "30px";
    audioSliderMuteIcon.classList.remove('active');
    audioSliderUnmuteIcon.classList.add('active');
    audioPlayer.muted = false;  // Audio wieder unmuten
  }
});

// Model Viewer Loader
modelViewers.forEach((modelViewer, index) => {
  modelViewer.addEventListener('load', () => {
    setTimeout(() => {
      MWLoaders[index].style.display = 'none';
    }, 800); // 800ms Verzögerung nachdem das modell geladen wurde da es sonst flasht
  });
});