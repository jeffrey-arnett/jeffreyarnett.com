// script.js
const dropdownBtn = document.querySelectorAll(".dropdown-btn");
const dropdown = document.querySelectorAll(".dropdown");
const hamburgerBtn = document.getElementById("hamburger");
const navMenu = document.querySelector(".menu");
const links = document.querySelectorAll(".dropdown a");
const mobileNavChevron = document.querySelectorAll(".nav-chevron");

function setAriaExpandedFalse() {
  dropdownBtn.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
}

function closeDropdownMenu() {
  dropdown.forEach((drop) => {
    drop.classList.remove("active");
    drop.addEventListener("click", (e) => e.stopPropagation());
  });
}

function toggleHamburger() {
  navMenu.classList.toggle("show");
  if (navMenu.classList.contains("show")) {
    // reset any expanded menu items
    dropdownBtn.forEach((btn) => {
      hideDropdown(btn)();
    });
  }
}

function isChildElementOf(child, parent) {
  while (child && parent && child.parentElement !== null) {
    if (child.parentElement === parent) {
      return true;
    }
    child = child.parentElement;
  }
  return false;
}

function isMobileView() {
  return window.getComputedStyle(document.getElementById("hamburger")).display === 'block';
}

function showDropdown(btn) {
  return function (e) {
    const dropdownIndex = btn.dataset.dropdown;
    const dropdownElement = document.getElementById(dropdownIndex);

    btn.classList.add("active");
    dropdownElement.classList.add("active");
    dropdown.forEach((drop) => {
      if (drop.id === btn.dataset["dropdown"]) {

      } else {
        drop.classList.remove("active");
      }
    });
    dropdownBtn.forEach((otherBtn) => {
      if (otherBtn != btn) {
        otherBtn.classList.remove("active");
      }
    });
    if (e) {
      e.stopImmediatePropagation();
    }
    btn.setAttribute("aria-expanded", "true");
  }
}

function hideDropdown(btn) {
  return function (e) {
    const dropdownIndex = btn.dataset.dropdown;
    const dropdownElement = document.getElementById(dropdownIndex);
    if (e && e.currentTarget === btn && isChildElementOf(e.relatedTarget, dropdownElement)) {
      return; // don't hide dropdown when entering the dropdown list from the button
    }

    btn.classList.remove("active");
    dropdownElement.classList.remove("active");
    if (e) {
      e.stopPropagation();
    }
    btn.setAttribute("aria-expanded", "false");
  }
}

mobileNavChevron.forEach((chevron) => {
  chevron.addEventListener("click", function (e) {
    const btn = chevron.previousElementSibling;
    if (btn.classList.contains("active")) {
      hideDropdown(btn)(e);
    } else {
      showDropdown(btn)(e);
    }

  });
});

dropdownBtn.forEach((btn) => {
  if (isMobileView()) {
    // btn.addEventListener("click", function (e) {
    //   if (btn.classList.contains("active")) {
    //     hideDropdown(btn)(e);
    //   } else {
    //     showDropdown(btn)(e);
    //   }
    // });

  } else {

    btn.addEventListener("mouseenter", showDropdown(btn));
    btn.addEventListener("mouseleave", hideDropdown(btn));

    const dropdownIndex = btn.dataset.dropdown;
    const dropdownElement = document.getElementById(dropdownIndex);

    dropdownElement.addEventListener("mouseleave", hideDropdown(btn));
  }
  // btn.addEventListener("mouseover", function (e) {
  //   const dropdownIndex = e.currentTarget.dataset.dropdown;
  //   const dropdownElement = document.getElementById(dropdownIndex);

  //   btn.classList.toggle("active");
  //   dropdownElement.classList.toggle("active");
  //   dropdown.forEach((drop) => {
  //     if (drop.id !== btn.dataset["dropdown"]) {
  //       drop.classList.remove("active");
  //     }
  //   });
  //   e.stopPropagation();
  //   btn.setAttribute(
  //     "aria-expanded",
  //     btn.getAttribute("aria-expanded") === "false" ? "true" : "false"
  //   );
  // });
});

// close dropdown menu when the dropdown links are clicked
links.forEach((link) =>
  link.addEventListener("click", () => {
    closeDropdownMenu();
    setAriaExpandedFalse();
    toggleHamburger();
  })
);

// close dropdown menu when you click on the document body
document.documentElement.addEventListener("click", () => {
  closeDropdownMenu();
  setAriaExpandedFalse();
});

// close dropdown when the escape key is pressed
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeDropdownMenu();
    setAriaExpandedFalse();
  }
});

if (hamburgerBtn) {
  hamburgerBtn.addEventListener("click", toggleHamburger);
}

window.addEventListener('load', () => {

  /*
  // fix the scroll location for anchor links to account for nav height
  if (document.location.hash && window.scrollY) {
    // place the anchor at under the <header> not at the top of the window
    const headerHeight = document.getElementsByTagName('header')[0].scrollHeight;
    window.scrollTo(0, window.scrollY - headerHeight);
  }
  */

  // support search params to link to a specific tab on the page
  if (document.location.search.startsWith('?tab=')) { // === "?tab=fellows-apply") {
    document.querySelectorAll('.tabset input[type="radio"]').forEach(e => e.checked = false);
    const selectedTab = document.getElementById('tab-' + document.location.search.replace('?tab=', ''));
    if (selectedTab) {
      selectedTab.checked = true;
    } else {
      // check the first tab
      document.querySelectorAll('.tabset input[type="radio"]')[0].checked = true;
    }
  }
});

// replace webp image conversion in old browsers
// see https://stackoverflow.com/questions/5573096/detecting-webp-support
function support_format_webp() {
  var elem = document.createElement('canvas');

  if (!!(elem.getContext && elem.getContext('2d'))) {
    // was able or not to get WebP representation
    return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
  }
  else {
    // very old browser like IE 8, canvas not supported
    return false;
  }
}

window.addEventListener('load', () => {
  if (support_format_webp()) {
    return;
  }
  const images = document.getElementsByTagName('img');
  for(let i = 0; i < images.length; i++) {
    const elt = images[i];
    const src = elt.getAttribute('src');
    const updatedSrc = src.replace('fm=webp', 'fm=jpg');
    elt.setAttribute('src', updatedSrc);
  };
});


// add classes for mobile navigation toggling
var CSbody = document.querySelector('body');
const CSnavbarMenu = document.querySelector('#cs-navigation');
const CShamburgerMenu = document.querySelector('#cs-navigation .cs-toggle');

CShamburgerMenu.addEventListener('click', function () {
	CShamburgerMenu.classList.toggle('cs-active');
	CSnavbarMenu.classList.toggle('cs-active');
	CSbody.classList.toggle('cs-open');
	// run the function to check the aria-expanded value
	ariaExpanded();
});

// checks the value of aria expanded on the cs-ul and changes it accordingly whether it is expanded or not
function ariaExpanded() {
	const csUL = document.querySelector('#cs-expanded');
	const csExpanded = csUL.getAttribute('aria-expanded');

	if (csExpanded === 'false') {
		csUL.setAttribute('aria-expanded', 'true');
	} else {
		csUL.setAttribute('aria-expanded', 'false');
	}
}

// mobile nav toggle code
const dropDowns = Array.from(document.querySelectorAll('#cs-navigation .cs-dropdown'));
for (const item of dropDowns) {
	const onClick = () => {
		item.classList.toggle('cs-active');
	};
	item.addEventListener('click', onClick);
}

// animate lines when scrolling into viewBox
window.addEventListener('load', () => {
  document.querySelectorAll('h2.animated-horizontal-line, h2.animated-vertical-line').forEach(headline => {
    // replace when first scrolled into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        } else {
          entry.target.classList.remove('animated');
        }
      });
    }, {
      root: null,
      threshold: 0
    });
    observer.observe(headline);
  });
});

window.addEventListener('load', () => {
  document.querySelectorAll('.video-embed-with-preview').forEach(videoBlock => {
    // replace when first scrolled into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          showEmbed(entry.target)
        }
      });
    }, {
      root: null,
      threshold: 0
    });
    observer.observe(videoBlock);
    // fallbacks
    videoBlock.addEventListener('click', () => showEmbed(videoBlock, observer));
    videoBlock.addEventListener('mouseenter', () => showEmbed(videoBlock, observer));
    videoBlock.addEventListener('focus', () => showEmbed(videoBlock, observer));
  });
});

function showEmbed(videoBlock, observer) {
  const videoEmbed = window.videoEmbeds[videoBlock.id];
  if (videoEmbed) {
    window.videoEmbeds[videoBlock.id] = undefined;
    videoBlock.insertAdjacentHTML('beforeend', videoEmbed.html);
    if (videoEmbed.title) {
      videoBlock.lastElementChild.setAttribute('title', videoEmbed.title);
    }
  }
  videoBlock.classList.remove('preview');
  videoBlock.classList.add('show-video');
  if (observer) {
    observer.unobserve(videoBlock);
  }
}
