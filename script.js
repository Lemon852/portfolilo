const header = document.querySelector("header");
document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");

  window.addEventListener("scroll", function() {
    const currentScroll = window.scrollY;

    sections.forEach(function(section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
        section.classList.add("active");
        const id = section.getAttribute("id");
        navLinks.forEach(function(link) {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      } else {
        section.classList.remove("active");
      }
    });
  });
});

window.addEventListener("scroll", function() {

  const watchContainer = document.getElementById("watch-container");
  const scrolled = window.scrollY;
  header.classList.toggle("sticky", scrolled > 100);


  if (scrolled > 100) {
    
      watchContainer.classList.add("show-clock");
  } 
  else{watchContainer.classList.remove("show-clock");}
});


let menu = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navlist.classList.toggle("open");
};
window.onscroll = () => {
  menu.classList.remove("bx-x");
  navlist.classList.remove("open");
};

document.getElementById("contact").addEventListener("submit", function (event) {
  event.preventDefault();

  //getting user input
  const email = document.getElementById("email").value;
  const formData = new FormData(this);
  formData.append("email", email);

  // Send the data to the Server side script , python
  fetch("/python/python", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        console.log("Email sent sucessfully!");
      } else {
        console.error("Error submiting form data.");
      }
    })
    .catch((error) => {
      //handling error on any network
      console.error("Error sending email:", error);
    });
});
// clock
setInterval(setClock, 1000);

const hourHand = document.querySelector("[data-hour-hand]");
const minuteHand = document.querySelector("[data-minute-hand]");
const secondHand = document.querySelector("[data-second-hand]");

function setClock() {


  const currentDate = new Date();
  const secondRatio = currentDate.getSeconds() / 60;
  const minuteRatio = (secondRatio + currentDate.getMinutes()) / 60;
  const hourRatio = (minuteRatio + currentDate.getHours()) / 12;
  setRotation(secondHand, secondRatio);
  setRotation(minuteHand, minuteRatio);
  setRotation(hourHand, hourRatio);
  const hr = document.getElementById("hour");
  hr.innerHTML = currentDate.getHours();
  const min = document.getElementById("minute");
  min.innerHTML = currentDate.getMinutes();
  const sec = document.getElementById("second");
  sec.innerHTML = currentDate.getSeconds();
  document.getElementById("currentYear").textContent = currentDate.getFullYear();
}

function setRotation(element, rotationRatio) {
  element.style.setProperty("--rotation", rotationRatio * 360);
}

setClock();


