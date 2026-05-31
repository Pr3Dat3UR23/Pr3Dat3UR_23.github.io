// Animation de défilement fluide
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Effet de parallaxe sur le header
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const scrolled = window.pageYOffset;
  header.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

// Gestion du formulaire de contact
function handleSubmit(event) {
  event.preventDefault();
  const nom = document.getElementById("nom").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Simuler l'envoi du formulaire
  alert(`Message envoyé par ${nom} (${email}):\n${message}`);
  document.querySelector(".contact-form").reset();
}

// Statistiques GitHub
async function fetchGitHubStats() {
  try {
    const response = await fetch("https://api.github.com/users/Pr3Dat3UR23");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const stats = document.querySelectorAll(".github-stats .stat-item");
    if (stats.length > 0) {
      stats[0].querySelector(".stat-number").textContent =
        data.public_repos || "N/A";
      stats[0].querySelector(".stat-label").textContent = "Projets GitHub";
    }
  } catch (error) {
    console.error("Failed to fetch GitHub stats:", error);
  }
}
fetchGitHubStats();
