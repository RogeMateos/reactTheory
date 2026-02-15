document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  const nav = document.querySelector("nav");
  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const languageToggle = document.getElementById("languageToggle");
  const title = document.getElementById("title");

  let currentLanguage = "en";

  // Menu toggle functionality
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navbar.classList.toggle("active");
  });

  // Close menu when a link is clicked
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      menuToggle.classList.remove("active");
      navbar.classList.remove("active");
    }
  });

  // Accordion functionality
  nav.addEventListener("click", (e) => {
    if (e.target.classList.contains("accordion-header")) {
      e.target.classList.toggle("active");
      const content = e.target.nextElementSibling;
      if (e.target.classList.contains("active")) {
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = null;
      }
    } else if (e.target.tagName === "A") {
      e.preventDefault();
      const section = e.target.getAttribute("data-section");
      loadContent(section);

      // Update active state for links
      nav
        .querySelectorAll("a")
        .forEach((link) => link.classList.remove("active"));
      e.target.classList.add("active");
    }
  });

  languageToggle.addEventListener("click", () => {
    currentLanguage = currentLanguage === "en" ? "es" : "en";
    languageToggle.textContent =
      currentLanguage === "en" ? "Español" : "English";
    updateLanguage();
  });

  function loadContent(section) {
    const lang = currentLanguage === "es" ? "_es" : "_eng";
    const fileName = `sections/${section}${lang}.html`;

    fetch(fileName)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((html) => {
        content.innerHTML = html;
        Prism.highlightAll();
        setupCodeExecution();
        setupTabs();
      })
      .catch((error) => {
        console.error("Error loading content:", error);
        content.innerHTML = `<p>Error loading content for ${section}. Please try again later.</p>`;
      });
  }

  function updateLanguage() {
    title.textContent =
      currentLanguage === "en" ? "React Theory" : "Teoría de React";

    nav.querySelectorAll("a, .accordion-header").forEach((element) => {
      const key =
        element.getAttribute("data-section") ||
        element.getAttribute("data-translate");
      if (key) {
        element.textContent = getTranslation(key);
      }
    });

    const activeLink = nav.querySelector("a.active");
    if (activeLink) {
      loadContent(activeLink.getAttribute("data-section"));
    }
  }

  function getTranslation(key) {
    const translations = {
      lifeCycle: { en: "LifeCycle", es: "Ciclo de Vida" },
      bareBonesMethod: { en: "The Bare Bones Method", es: "The Bare Bones Method" },
      routerBrowser: {
        en: "Router Browser Navigation",
        es: "Navegación del Enrutador",
      },
      useContext: { en: "use Context", es: "usar Contexto" },
      useState: { en: "Use State", es: "Usar Estado" },
      useEffect: { en: "Use Effect", es: "Usar Efecto" },
      fundamentals: { en: "Fundamentals", es: "Fundamentos" },
      hooks: { en: "Hooks", es: "Hooks" },
      routing: { en: "Routing", es: "Enrutamiento" },
      globalSwitch: { en: "Global Switch (useContext)", es: "Global Switch (useContext)" },
      virtualDOM: { en: "Virtual DOM", es: "DOM Virtual" },
      interviewQuestions: {
        en: "Accessing Previous State/Props",
        es: "Acceder al Estado/Props Anterior",
      },
      interviewQuestionsHeader: {
        en: "Interview Questions",
        es: "Preguntas de Entrevista",
      },
    };
    return translations[key] ? translations[key][currentLanguage] : key;
  }

  function setupCodeExecution() {
    const codeRunners = document.querySelectorAll(".code-runner");

    codeRunners.forEach((runner) => {
      const textarea = runner.querySelector("textarea");
      const runButton = runner.querySelector(".runButton");
      const output = runner.querySelector(".output");

      if (textarea && runButton && output) {
        runButton.addEventListener("click", () => {
          output.innerHTML = ""; // Clear previous output

          const code = textarea.value;

          // Create a new function to run the code in its own scope
          const runCode = new Function(
            "console",
            `
            const log = console.log;
            console.log = function(...args) {
              log.apply(console, args);
              const msg = args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg
              ).join(' ');
              document.querySelector('#${output.id}').innerHTML += msg + '<br>';
            };
            try {
              ${code}
            } catch (error) {
              console.log('Error:', error.message);
            }
          `
          );

          // Run the code
          runCode(console);
        });
      }
    });
  }

  function setupTabs() {
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const tabId = button.getAttribute("data-tab");

        // Deactivate all tabs
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        tabContents.forEach((content) => content.classList.remove("active"));

        // Activate the clicked tab
        button.classList.add("active");
        const activeContent = document.getElementById(tabId);
        if (activeContent) {
          activeContent.classList.add("active");
        }
      });
    });
  }

  // Initial setup
  updateLanguage();
  setupCodeExecution();
  setupTabs();
});
