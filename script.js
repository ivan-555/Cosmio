const NavLinks = document.querySelectorAll('aside nav ul li a');
const NavIcon = document.querySelector('aside nav .icon');
const preloader = document.querySelector('.preloader');
const pages = document.querySelectorAll('.page');
const sidebar = document.querySelector('#sidebar');
const sidebarHeader = document.querySelector('#sidebar .heading');
const hamburger = document.querySelector('.hamburger');
const viewInfoButtons = document.querySelectorAll('.viewInfo');
const exploreButtons = document.querySelectorAll('.explore');
const pageInfos = document.querySelectorAll('.page .info');
const sidebarShowMoreButton = document.querySelector('#sidebar .show-more');
const sidebarShowMoreButtonText = document.querySelector('#sidebar .show-more span');
const sidebarMoreDiv = document.querySelector('#sidebar .more');
const sidebarMoreDivLinks = document.querySelectorAll('#sidebar .more li a');
const language = document.body.getAttribute('data-language');


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



// Seiten-Navigation und dynamisches Laden der `model-viewer`-Elemente
NavLinks.forEach((link, index) => {
  link.addEventListener('click', () => {
    if (index <= 11) {
      NavIcon.style.display = "block";
    }

    // Entferne die Klasse 'active' von allen Seiten und füge sie zur gewählten Seite hinzu
    pages.forEach(page => page.classList.remove('active'));
    pages[index].classList.add('active');

    // `model-viewer`-Element für die geklickte Seite dynamisch laden
    const container = pages[index].querySelector('.model-viewer-container');
    if (container) {
      loadModel(container);
    }

    // Position des Navigations-Icons aktualisieren
    let offset = index * 50;
    let isInMoreDiv = false;

    if (link.closest('.more')) {
      offset += 60;
      isInMoreDiv = true;
    }

    NavIcon.style.transform = `translateY(${offset}px) rotate(45deg)`;

    if (isInMoreDiv && status === 'closed') {
      NavIcon.style.display = "none";
    } else {
      NavIcon.style.display = "block";
    }

    // Sidebar auf mobilen Geräten schließen
    if (window.innerWidth < 1450) {
      sidebar.classList.remove('show');
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



// Funktion zum dynamischen Laden des `model-viewer`-Elements
function loadModel(container) {
  const modelSrc = container.getAttribute('data-src');
  
  // Prüfe, ob das `model-viewer`-Element noch nicht vorhanden ist
  if (!container.querySelector('model-viewer')) {
    
    const modelViewer = document.createElement('model-viewer');
    modelViewer.setAttribute('src', modelSrc);
    modelViewer.setAttribute('alt', '3D-Modell');
    modelViewer.setAttribute('auto-rotate', '');
    modelViewer.setAttribute('camera-controls', '');
    modelViewer.setAttribute('background-color', 'transparent');
    modelViewer.setAttribute('shadow-intensity', '0');
    modelViewer.setAttribute('interaction-prompt', 'none');

    // Füge den `model-viewer` in den Container ein
    container.appendChild(modelViewer);

    // Greife auf den spezifischen `MWLoader` zu und blende ihn nach einer Verzögerung aus, um Flackern zu verhindern
    const loader = container.querySelector('.MWLoader');
    modelViewer.addEventListener('load', () => {
      setTimeout(() => {
        loader.style.display = 'none'; // Verstecke den Ladebildschirm nach dem Laden des Modells mit Verzögerung
        preloader.style.display = 'none'; // Verstecke den gesamten Preloader, wenn das Modell geladen ist
      }, 1000); // Verzögerung von 1000ms
    });
  }
}

loadModel(pages[0].querySelector('.model-viewer-container')); // Lade das erste model-viewer-Element beim Laden der Seite
