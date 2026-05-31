document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  const nav = document.getElementById("navbar");
  const navbar = nav;
  const menuToggle = document.getElementById("menuToggle");
  const languageToggle = document.getElementById("languageToggle");
  const title = document.getElementById("title");
  const pageToc = document.querySelector(".page-toc");
  const pageTocList = document.getElementById("pageTocList");

  let currentLanguage = localStorage.getItem("language") || "en";
  let headingObserver = null;

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
    localStorage.setItem("language", currentLanguage);
    languageToggle.textContent =
      currentLanguage === "en" ? "Español" : "English";
    updateLanguage();
  });

  function loadContent(section) {
    content.innerHTML = '<div class="loading-state">Loading...</div>';
    const lang = currentLanguage === "es" ? "es" : "en";
    const hooks = ["useState", "useEffect", "useEffect2midu", "useEffect3midu", "useContext", "useRef", "useReducer", "globalSwitch", "useId", "customHooks", "customHooks2"];
    const fundamentals = ["componentes", "componentesVsFunciones", "jobCard", "props", "modulos", "paginacion", "callbacks", "listas", "paginacion-final", "css-modules", "eventos", "renderizado", "spa", "vite-bundlers", "vite-install", "fast-refresh", "document-title", "bareBonesMethod", "lifeCicle", "formularios", "filtros-routing", "formulario-navegacion", "componente-route", "llamada-api", "filtros-api", "paginacion-api", "arreglando-paginacion", "sincronizacion-url"];
    const globalStateAndRouter = ["routerBrowser", "react-router", "crear-rutas", "link-hooks-router", "useParams", "trabajando-estilos", "navegacion-detalle", "terminar-estilar", "useSearchParams", "lazy-load", "estilos-navlink", "refuerzo-ejercicios", "autenticacion", "react-context"];
    const interview = ["interviewQuestions", "react-hooks-rules-and-order", "react-hooks-masterclass"];

    let folder = "";
    if (hooks.includes(section)) {
      folder = "hooks/";
    } else if (fundamentals.includes(section)) {
      folder = "fundamentals/";
    } else if (globalStateAndRouter.includes(section)) {
      folder = "global-state-router/";
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
        setupLessonContext(section);
        Prism.highlightAll();
        setupCodeExecution();
        setupTabs();
        setupOnThisPage();
      })
      .catch((error) => {
        console.error("Error loading content:", error);
        content.innerHTML = `<p>Error loading content for ${section}. Please try again later.</p>`;
        setupOnThisPage();
      });
  }

  function updateLanguage() {
    title.innerHTML =
      currentLanguage === "en" ? "&lt; React Theory /&gt;" : "&lt; Teoría de React /&gt;";
    languageToggle.textContent =
      currentLanguage === "en" ? "Español" : "English";
    const pageTocTitle = document.getElementById("page-toc-title");
    if (pageTocTitle) {
      pageTocTitle.textContent =
        currentLanguage === "en" ? "On This Page" : "En esta página";
    }

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
      "arreglando-paginacion": { en: "Fixing Pagination: URL as State", es: "Arreglando la Paginación: URL como Estado" },
      "sincronizacion-url": { en: "URL Sync with the Search Engine", es: "Sincronización de la URL con el Buscador" },
      "vite-bundlers": { en: "Vite & Bundlers", es: "Vite y Bundlers" },
      "vite-install": { en: "Installing Vite", es: "Instalación de Vite" },
      "fast-refresh": { en: "Fast Refresh & State Updates", es: "Fast Refresh y Actualizaciones de Estado" },
      "document-title": { en: "Managing <title> in React", es: "Gestión del <title> en React" },
      useState: { en: "State with useState", es: "Estado con useState" },
      lifeCicle: { en: "LifeCycle", es: "Ciclo de Vida" },
      bareBonesMethod: { en: "The Bare Bones Method", es: "The Bare Bones Method" },
      routerBrowser: {
        en: "Router Browser Navigation",
        es: "Navegación del Enrutador",
      },
      useContext: { en: "useContext", es: "useContext" },
      useEffect: { en: "useEffect", es: "useEffect" },
      useRef: { en: "useRef", es: "useRef" },
      useReducer: { en: "useReducer", es: "useReducer" },
      fundamentals: { en: "Fundamentals", es: "Fundamentos" },
      globalStateAndRouter: { en: "React Router & Global State", es: "React Router y Estado Global" },
      "react-router": { en: "What is React Router?", es: "¿Qué es React Router?" },
      useParams: { en: "useParams", es: "useParams" },
      "trabajando-estilos": { en: "Working with Styles", es: "Trabajando con Estilos" },
      "navegacion-detalle": { en: "Navigating to Detail", es: "Navegación al Detalle" },
      "terminar-estilar": { en: "Finishing the Styles", es: "Terminar de Estilar" },
      useSearchParams: { en: "useSearchParams", es: "useSearchParams" },
      "lazy-load": { en: "Lazy Load", es: "Lazy Load" },
      "estilos-navlink": { en: "Active Styles with NavLink", es: "Estilos con NavLink" },
      "refuerzo-ejercicios": { en: "Reinforcement Exercises", es: "Refuerzo: Ejercicios" },
      autenticacion: { en: "Authentication & Prop Drilling", es: "Autenticación y Prop Drilling" },
      "react-context": { en: "React Context", es: "React Context" },
      "crear-rutas": { en: "How to Create Routes", es: "Cómo Crear Rutas" },
      "link-hooks-router": { en: "Link & Router Hooks", es: "Link y Hooks del Router" },
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
      "react-hooks-rules-and-order": {
        en: "React Hooks Rules & Order",
        es: "Reglas y Orden de React Hooks",
      },
      "react-hooks-masterclass": {
        en: "React Hooks Masterclass",
        es: "Masterclass de React Hooks",
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

          const runCode = new Function(
            "console",
            "outputEl",
            `
            const log = console.log;
            console.log = function(...args) {
              log.apply(console, args);
              const msg = args.map(arg =>
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
              ).join(' ');
              const line = document.createElement('span');
              line.textContent = msg;
              outputEl.appendChild(line);
              outputEl.appendChild(document.createElement('br'));
            };
            try {
              ${code}
            } catch (error) {
              console.log('Error:', error.message);
            }
          `
          );

          runCode(console, output);
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

        setupOnThisPage();
      });
    });
  }

  function setupLessonContext(section) {
    const activeLink = Array.from(nav.querySelectorAll("a[data-section]")).find(
      (link) => link.getAttribute("data-section") === section
    );

    if (!activeLink) return;

    const group = activeLink.closest(".accordion-content");
    const groupLinks = group
      ? Array.from(group.querySelectorAll("a[data-section]"))
      : [];
    const sectionTitle =
      group?.previousElementSibling?.textContent.trim() ||
      (currentLanguage === "en" ? "Course" : "Curso");
    const lessonTitle = activeLink.textContent.trim();
    const lessonIndex = groupLinks.indexOf(activeLink) + 1;
    const lessonTotal = groupLinks.length;

    const context = document.createElement("div");
    context.className = "lesson-context";
    context.setAttribute("aria-label", currentLanguage === "en" ? "Lesson context" : "Contexto de la lección");

    const sectionEl = document.createElement("span");
    sectionEl.className = "lesson-context__section";
    sectionEl.textContent = sectionTitle;

    const separatorEl = document.createElement("span");
    separatorEl.className = "lesson-context__separator";
    separatorEl.textContent = "›";

    const currentEl = document.createElement("span");
    currentEl.className = "lesson-context__current";
    currentEl.textContent = lessonTitle;

    context.append(sectionEl, separatorEl, currentEl);

    if (lessonIndex > 0 && lessonTotal > 0) {
      const metaSeparatorEl = document.createElement("span");
      metaSeparatorEl.className = "lesson-context__separator";
      metaSeparatorEl.textContent = "·";

      const metaEl = document.createElement("span");
      metaEl.className = "lesson-context__meta";
      metaEl.textContent =
        currentLanguage === "en"
          ? `Lesson ${lessonIndex} of ${lessonTotal}`
          : `Lección ${lessonIndex} de ${lessonTotal}`;

      context.append(metaSeparatorEl, metaEl);
    }

    content.prepend(context);
  }

  function setupOnThisPage() {
    if (!pageToc || !pageTocList) return;

    if (headingObserver) {
      headingObserver.disconnect();
      headingObserver = null;
    }

    pageTocList.innerHTML = "";

    const headings = Array.from(content.querySelectorAll("h2, h3")).filter(
      (heading) =>
        heading.textContent.trim().length > 0 && isHeadingInActiveContent(heading)
    );

    pageToc.classList.toggle("is-empty", headings.length === 0);

    if (headings.length === 0) {
      return;
    }

    const headingSet = new Set(headings);
    const usedIds = new Set(
      Array.from(document.querySelectorAll("[id]"))
        .filter((element) => !headingSet.has(element))
        .map((element) => element.id)
        .filter(Boolean)
    );

    headings.forEach((heading) => {
      heading.id = getStableHeadingId(heading, usedIds);

      const item = document.createElement("li");
      item.className = `page-toc__item page-toc__item--${heading.tagName.toLowerCase()}`;

      const link = document.createElement("a");
      link.className = "page-toc__link";
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent.trim();

      link.addEventListener("click", (event) => {
        event.preventDefault();
        heading.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${heading.id}`);
        setActiveTocLink(link);
      });

      item.appendChild(link);
      pageTocList.appendChild(item);
    });

    setupTocActiveState(headings);
  }

  function isHeadingInActiveContent(heading) {
    const tabContent = heading.closest(".tab-content");
    return !tabContent || tabContent.classList.contains("active");
  }

  function getStableHeadingId(heading, usedIds) {
    const existingId = heading.getAttribute("id");

    if (existingId && !usedIds.has(existingId)) {
      usedIds.add(existingId);
      return existingId;
    }

    const baseId =
      slugify(heading.textContent) ||
      `section-${heading.tagName.toLowerCase()}`;
    let id = baseId;
    let counter = 2;

    while (usedIds.has(id)) {
      id = `${baseId}-${counter}`;
      counter += 1;
    }

    usedIds.add(id);
    return id;
  }

  function slugify(text) {
    return text
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function setupTocActiveState(headings) {
    const links = Array.from(pageTocList.querySelectorAll(".page-toc__link"));

    if (!("IntersectionObserver" in window)) {
      setActiveTocLink(links[0]);
      return;
    }

    headingObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (!visibleEntry) return;

        const activeLink = Array.from(
          pageTocList.querySelectorAll(".page-toc__link")
        ).find(
          (link) => link.getAttribute("href") === `#${visibleEntry.target.id}`
        );

        setActiveTocLink(activeLink);
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: 0.01,
      }
    );

    headings.forEach((heading) => headingObserver.observe(heading));
    setActiveTocLink(links[0]);
  }

  function setActiveTocLink(activeLink) {
    if (!activeLink || !pageTocList) return;

    pageTocList
      .querySelectorAll(".page-toc__link")
      .forEach((link) => link.classList.toggle("active", link === activeLink));
  }

  // Initial setup
  updateLanguage();
  setupCodeExecution();
  setupTabs();
  setupOnThisPage();
});
