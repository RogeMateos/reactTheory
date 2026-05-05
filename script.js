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
    const lang = currentLanguage === "es" ? "es" : "en";
    const hooks = ["useState", "useEffect", "useEffect2midu", "useEffect3midu", "useContext", "useRef", "useReducer", "globalSwitch", "useId", "customHooks", "customHooks2"];
    const fundamentals = ["componentes", "componentesVsFunciones", "jobCard", "props", "modulos", "paginacion", "callbacks", "listas", "paginacion-final", "css-modules", "eventos", "renderizado", "spa", "vite-bundlers", "vite-install", "fast-refresh", "bareBonesMethod", "lifeCicle", "formularios", "filtros-routing", "formulario-navegacion", "componente-route", "llamada-api", "filtros-api", "paginacion-api"];
    const interview = ["interviewQuestions", "react-hooks-rules-and-order", "react-hooks-masterclass"];

    let folder = "";
    if (hooks.includes(section)) {
      folder = "hooks/";
    } else if (fundamentals.includes(section)) {
      folder = "fundamentals/";
    } else if (interview.includes(section)) {
      folder = "interview/";
    }

    const fileName = `sections/${folder}${lang}/${section}.html`;

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
      componentes: { en: "Components", es: "Componentes" },
      componentesVsFunciones: { en: "Components vs Functions", es: "Componentes vs Funciones" },
      jobCard: { en: "Creating JobCard", es: "Creando JobCard" },
      eventos: { en: "Events", es: "Eventos" },
      renderizado: { en: "Rendering & Virtual DOM", es: "Renderizado y Virtual DOM" },
      spa: { en: "Single Page Application (SPA)", es: "Single Page Application (SPA)" },
      props: { en: "Props", es: "Props" },
      modulos: { en: "JS Modules", es: "Módulos JS" },
      paginacion: { en: "Pagination", es: "Paginación" },
      callbacks: { en: "Callbacks", es: "Callbacks" },
      listas: { en: "Keys & Lists", es: "Keys y Listas" },
      "paginacion-final": { en: "Finishing Pagination", es: "Terminando la Paginación" },
      "css-modules": { en: "CSS Modules", es: "CSS Modules" },
      formularios: { en: "Form Management & Filters", es: "Gestión de Formularios y Filtros" },
      "filtros-routing": { en: 'Automatic Filters & Routing', es: 'Filtros Automáticos y Routing' },
      "formulario-navegacion": { en: "Form + Navigation", es: "Formulario + Navegación" },
      "componente-route": { en: "Declarative <Route> Component", es: "Componente <Route>" },
      "llamada-api": { en: "API Call with fetch", es: "Llamada a la API" },
      "filtros-api": { en: "Integrating Filters with the API", es: "Filtros con la API" },
      "paginacion-api": { en: "API Pagination: limit & offset", es: "Paginación con la API" },
      "vite-bundlers": { en: "Vite & Bundlers", es: "Vite y Bundlers" },
      "vite-install": { en: "Installing Vite", es: "Instalación de Vite" },
      "fast-refresh": { en: "Fast Refresh & State Updates", es: "Fast Refresh y Actualizaciones de Estado" },
      useState: { en: "State with useState", es: "Estado con useState" },
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
      useId: { en: "useId", es: "useId" },
      customHooks: { en: "Custom Hooks", es: "Custom Hooks" },
      customHooks2: { en: "Custom Hooks II", es: "Custom Hooks II" },
      useEffect2midu: { en: 'useEffect II', es: 'useEffect II' },
      useEffect3midu: { en: 'useEffect III', es: 'useEffect III' },
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
