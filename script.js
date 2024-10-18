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
const modelViewers = document.querySelectorAll('model-viewer');
const MWLoaders = document.querySelectorAll('.MWLoader');
const pageInfos = document.querySelectorAll('.page .info');
const homeInfo = document.querySelector('.home .info');

// Hide Page Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.classList.add('hide');
    }, 6000); // 6s preloader while models are loading
});

 // Verhindert das Scrollen bei gedrücktem Mausrad
 document.addEventListener('mousedown', function(event) {
  // Überprüfen, ob das mittlere Mausrad gedrückt wird (event.button === 1)
  if (event.button === 1) {
      event.preventDefault();  // Standardaktion wie Scrollen verhindern
  }
});

// Scrollen per Mausrad auf der gesamten Seite deaktivieren
window.addEventListener("wheel", function(e) {
  let scrollableElements = document.querySelectorAll('.info p');
  // Prüfen, ob das Event auf dem p Element stattfindet
  if (scrollableElements.contains(e.target)) {
      // Wenn das Event auf dem scrollbaren Element stattfindet, lasse es zu
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
        homeInfo.classList.add('blur');
      } else {
        pageInfo.classList.remove('blur');
        homeInfo.classList.remove('blur');
      }
    });
  }
});

// Standard Close Sidebar on Mobile
if (window.innerWidth < 1450) {
  sidebar.classList.remove('show');
  hamburger.classList.remove('isX');
}

// Navigate Between Pages
NavLinks.forEach((link, index) => {
  link.addEventListener('click', () => {
    home.style.display = 'none';
    pages.forEach(page => page.classList.remove('active'));
    pages[index].classList.add('active');
    NavIcon.style.transform = `translateY(${index * 50}px) rotate(90deg)`; // 50px = 1 NavLink height * index of the clicked NavLink moves the Rocket Icon to the clicked NavLink
    NavIcon.classList.add('active'); // Show Rocket Icon if we are not on the home page
    if (window.innerWidth < 1450) {
      sidebar.classList.remove('show'); // Close Sidebar on Mobile if a NavLink is clicked
      hamburger.classList.remove('isX');
    }
  });
});
// Header click brings you back to the home page
sidebarHeader.addEventListener('click', () => {
  home.style.display = 'block';
  pages.forEach(page => page.classList.remove('active'));
  NavIcon.classList.remove('active'); // Hide Rocket Icon if we are on the home page
  setTimeout(() => {
    NavIcon.style.transform = `translateY(0px) rotate(90deg)`;
  }, 200); // 200ms delay to move the Rocket Icon back up to the home NavLink
  if (window.innerWidth < 1450) {
    sidebar.classList.remove('show'); // Close Sidebar on Mobile if a NavLink is clicked
    hamburger.classList.remove('isX');
  }
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
      homeInfo.classList.remove('blur'); // Remove blur effect on home info
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

// Model Viewer Loader
modelViewers.forEach((modelViewer, index) => {
  modelViewer.addEventListener('load', () => {
    setTimeout(() => {
      MWLoaders[index].style.display = 'none'; // Hide the loader when the model is loaded
    }, 1300); // 1200ms Verzögerung nachdem das modell geladen wurde da es sonst flasht
  });
});