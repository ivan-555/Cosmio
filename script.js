// Service Worker registrieren
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js', { scope: '/' })
    .then((registration) => {
      console.log('Service Worker registriert mit Scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker-Registrierung fehlgeschlagen:', error);
    });
}


const sidebar = document.querySelector('#sidebar');
const NavLinks = document.querySelectorAll('aside nav ul li a');
const NavIcon = document.querySelector('aside nav .icon');
const hamburger = document.querySelector('.hamburger');
const sidebarShowMoreButton = document.querySelector('#sidebar .show-more');
const sidebarShowMoreButtonText = document.querySelector('#sidebar .show-more span');
const sidebarMoreDiv = document.querySelector('#sidebar .more');
const sidebarMoreDivLinks = document.querySelectorAll('#sidebar .more li a');
const preloader = document.querySelector('.preloader');
const modelViewer = document.querySelector('model-viewer');
const MWLoader = document.querySelector('.MWLoader');
const sketchfabEmbedWrapper = document.querySelector('.sketchfab-embed-wrapper');
const sketchfabEmbedWrapperFrame = document.querySelector('.sketchfab-embed-wrapper iframe');
const viewInfoButtons = document.querySelectorAll('.viewInfo');
const exploreButtons = document.querySelectorAll('.explore');
const pageInfos = document.querySelectorAll('.page .info');
const language = document.body.getAttribute('data-language');



// Hide Page Preloader after Model is loaded
modelViewer.addEventListener('load', () => {
  setTimeout(() => {
    preloader.classList.add('hide');
    MWLoader.style.display = 'none';
  }, 1500);
});




// Verhindert das Scrollen bei gedrücktem Mausrad
document.addEventListener('mousedown', function(event) {
// Überprüfen, ob das mittlere Mausrad gedrückt wird (event.button === 1)
if (event.button === 1) {
    event.preventDefault();  // Standardaktion wie Scrollen verhindern
}
});
// Scrollen per Mausrad auf der gesamten Seite deaktivieren und für p Elemente und Sidebar zulassen
window.addEventListener("wheel", function(e) {
  let scrollablePElements = document.querySelectorAll('.info p');
  // Prüfen, ob das Event auf dem p Element stattfindet
  if ([...scrollablePElements].includes(e.target) || sidebar.contains(e.target)) {
      // Wenn das Event auf einem p Element oder auf der Sidebar stattfindet, lasse es zu
      return; // Standard-Scrolling ist hier erlaubt
  } else {
      // Sonst verhindere das Scrollen
      e.preventDefault(); // Verhindert das Scrollen auf anderen Bereichen
  }
}, { passive: false }); // 'passive: false' erlaubt die Nutzung von e.preventDefault()






// Sidebar Toggle
hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('show');
  hamburger.classList.toggle('isX');
  
  if (window.innerWidth < 1450) {
    const isSidebarVisible = sidebar.classList.contains('show');

    pageInfos.forEach(pageInfo => {
      if (isSidebarVisible) {
        pageInfo.classList.add('blur');
      } else {
        pageInfo.classList.remove('blur');
      }
    });
  }
});

// Standard Close Sidebar on Mobile
if (window.innerWidth < 1450) {
  sidebar.classList.remove('show');
  hamburger.classList.remove('isX');
}




// Show More Button in Sidebar
let status = 'closed'; // Status der Sidebar (ob das more div geöffnet oder geschlossen ist)

// Text für die Schaltflächen entsprechend der Sprache festlegen
const showMoreText = language === 'en' ? 'View more' : 'Mehr anzeigen';
const showLessText = language === 'en' ? 'View less' : 'Weniger anzeigen';

// Event Listener für den "Show More" Button
sidebarShowMoreButton.addEventListener('click', () => {
  if (status === 'closed') {
    sidebarShowMoreButtonText.innerText = showLessText;
    sidebarMoreDiv.classList.add('show');
    sidebarShowMoreButton.classList.add('show');
    status = 'open'; // Status aktualisieren
    NavIcon.style.display = "block"; // Wenn das more div geöffnet wird, soll die Rakete wieder angezeigt werden
  } else {
    sidebarShowMoreButtonText.innerText = showMoreText;
    sidebarMoreDiv.classList.remove('show');
    sidebarShowMoreButton.classList.remove('show');
    status = 'closed'; // Status aktualisieren

    // Wenn die Rakete sich im more-Bereich befindet und das Div geschlossen wird, blenden wir sie aus
    let transformValue = NavIcon.style.transform;
    let translateYValue = parseInt(transformValue.match(/translateY\(([^)]+)px\)/)?.[1]);

    if (translateYValue > 550) {
      NavIcon.style.display = "none";
    }
  }
});



// Navigate Between Pages
NavLinks.forEach((link, index) => {
  link.addEventListener('click', () => {
    pageInfos.forEach(info => info.classList.remove('active'));
    pageInfos[index].classList.add('active');

    if (link.getAttribute("data-sf") === "true") {
      sketchfabEmbedWrapper.style.display = "block";
      sketchfabEmbedWrapperFrame.src = link.getAttribute("data-src")
      if (link.hasAttribute("data-cut")) {
        sketchfabEmbedWrapper.classList.add("cut");
      } else {
        sketchfabEmbedWrapper.classList.remove("cut");	
      }
      modelViewer.style.display = "none";
      MWLoader.style.display = 'none';
    } else {
      sketchfabEmbedWrapper.style.display = "none";
      modelViewer.style.display = "block";
      MWLoader.style.display = 'flex';
      modelViewer.src = link.getAttribute("data-src");
      if (link.hasAttribute("data-fw")) {
        modelViewer.setAttribute("field-of-view", link.getAttribute("data-fw"));
      } else {
        modelViewer.removeAttribute("field-of-view");
      }
    }

    if (index <= 11) {
      NavIcon.style.display = "block"; // Wenn der Link nicht im more div ist, soll die Rakete angezeigt werden
    }
    
    let offset = index * 50; // Standard offset für die normalen Links
    let isInMoreDiv = false; // Flag um zu prüfen, ob ein Link im "more" Div angeklickt wurde

    // Prüfen, ob der geklickte Link im "more" Div ist
    if (link.closest('.more')) {
      offset += 60; // Erhöhe den offset um 60px, wenn der Link im "more" Div ist
      isInMoreDiv = true;
    }

    NavIcon.style.transform = `translateY(${offset}px) rotate(45deg)`; // Setze die Position des navIcons
    
    if (isInMoreDiv && status === 'closed') {
      NavIcon.style.display = "none"; // Verstecke die Rakete, wenn das more div geschlossen ist
    } else {
      NavIcon.style.display = "block"; // Zeige die Rakete an, wenn sie nicht im more div ist oder es offen ist
    }

    if (window.innerWidth < 1450) {
      sidebar.classList.remove('show'); // Schließe die Sidebar auf mobilen Geräten
      hamburger.classList.remove('isX');
    }
  });
});





//View Info and Explore Buttons
viewInfoButtons.forEach(viewInfoButton => {
  // Moves the page down to the info when a view info button is clicked
  viewInfoButton.addEventListener('click', () => {
    window.scrollTo({
      top: window.innerHeight, // window.innerHeight = 100vh
      behavior: 'smooth'
    });
    if (window.innerWidth < 1450) {
      sidebar.classList.remove('show'); // Close Sidebar on Mobile if a view info button is clicked
      hamburger.classList.remove('isX');
      pageInfos.forEach(pageInfo => pageInfo.classList.remove('blur')); // Remove blur effect on page infos
    }
  });
});
// Moves the page up to the model viewer when the explore button is clicked
exploreButtons.forEach(exploreButton => {
  exploreButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});