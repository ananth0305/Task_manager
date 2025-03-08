document.addEventListener("DOMContentLoaded", function () {
    const darkModeBtn = document.createElement("button");
    darkModeBtn.innerText = "🌙 Dark Mode";
    darkModeBtn.classList.add("btn");
    darkModeBtn.style.position = "fixed";
    darkModeBtn.style.bottom = "20px";
    darkModeBtn.style.right = "20px";
    darkModeBtn.style.zIndex = "1000";
    document.body.appendChild(darkModeBtn);

    darkModeBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            darkModeBtn.innerText = "☀️ Light Mode";
        } else {
            darkModeBtn.innerText = "🌙 Dark Mode";
        }
    });

    // Scroll Animation for Features Section
    const featureBoxes = document.querySelectorAll(".feature-box");

    function fadeInOnScroll() {
        featureBoxes.forEach(box => {
            const boxTop = box.getBoundingClientRect().top;
            if (boxTop < window.innerHeight - 50) {
                box.style.transform = "scale(1)";
                box.style.opacity = "1";
            } else {
                box.style.transform = "scale(0.9)";
                box.style.opacity = "0.5";
            }
        });
    }

    window.addEventListener("scroll", fadeInOnScroll);
    fadeInOnScroll();
});
