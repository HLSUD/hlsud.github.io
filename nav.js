document.documentElement.classList.add("js");

let savedTheme;
try {
    savedTheme = localStorage.getItem("theme");
} catch {
    savedTheme = null;
}

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
document.documentElement.dataset.theme = savedTheme === "light" || savedTheme === "dark"
    ? savedTheme
    : systemTheme.matches ? "dark" : "light";

document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector(".nav-toggle");
    const siteNav = document.querySelector(".site-nav");
    const themeToggle = document.querySelector(".theme-toggle");

    const closeNavigation = () => {
        document.body.classList.remove("nav-open");
        navToggle?.setAttribute("aria-expanded", "false");
        navToggle?.setAttribute("aria-label", "Open navigation");
    };

    if (navToggle && siteNav) {
        navToggle.addEventListener("click", () => {
            const isOpen = document.body.classList.toggle("nav-open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
            navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
        });
        siteNav.addEventListener("click", (event) => {
            if (event.target instanceof Element && event.target.closest("a")) closeNavigation();
        });
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && document.body.classList.contains("nav-open")) {
                closeNavigation();
                navToggle.focus();
            }
        });
        document.addEventListener("click", (event) => {
            if (event.target instanceof Element && !event.target.closest(".site-header")) closeNavigation();
        });
        window.matchMedia("(min-width: 581px)").addEventListener("change", closeNavigation);
    }

    const updateThemeButton = () => {
        const isDark = document.documentElement.dataset.theme === "dark";
        themeToggle?.setAttribute("aria-pressed", String(isDark));
        themeToggle?.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    };

    themeToggle?.addEventListener("click", () => {
        const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = nextTheme;
        savedTheme = nextTheme;
        try {
            localStorage.setItem("theme", nextTheme);
        } catch {}
        updateThemeButton();
    });

    systemTheme.addEventListener("change", () => {
        if (savedTheme !== "light" && savedTheme !== "dark") {
            document.documentElement.dataset.theme = systemTheme.matches ? "dark" : "light";
            updateThemeButton();
        }
    });
    updateThemeButton();
});
