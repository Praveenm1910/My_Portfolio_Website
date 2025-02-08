document.addEventListener("DOMContentLoaded", function () {
    const cursor = document.querySelector(".cursor");
    const ring = document.querySelector(".cursor-ring");
    const particlesContainer = document.createElement('div');
    document.body.appendChild(particlesContainer);

    document.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        ring.style.left = `${e.clientX}px`;
        ring.style.top = `${e.clientY}px`;

        // Generate particles following the cursor
        for (let i = 0; i < 3; i++) {
            let particle = document.createElement("div");
            particle.classList.add("particle");
            particle.style.left = `${e.clientX + (Math.random() * 10 - 5)}px`;
            particle.style.top = `${e.clientY + (Math.random() * 10 - 5)}px`;
            particlesContainer.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 1500);
        }
    });

    document.addEventListener("mousedown", (e) => {
        // Click effect animation
        let clickEffect = document.createElement("div");
        clickEffect.classList.add("click-effect");
        clickEffect.style.left = `${e.clientX - 30}px`;  // Adjusted for new size
        clickEffect.style.top = `${e.clientY - 30}px`;  // Adjusted for new size
        document.body.appendChild(clickEffect);

        setTimeout(() => {
            clickEffect.remove();
        }, 500);
    });

    document.addEventListener("mouseup", () => {
        // Reset cursor to original size and shape
        cursor.style.transform = `scale(1)`;
        ring.style.transform = `scale(1)`;
    });
});

// Stat Counter Script
document.addEventListener("DOMContentLoaded", function () {
    let counters = document.querySelectorAll(".number");
    counters.forEach(counter => {
        let target = +counter.getAttribute("data-number");
        let count = 0;
        let speed = Math.ceil(target / 100); 

        let updateCount = () => {
            if (count < target) {
                count += speed;
                counter.innerText = count;
                setTimeout(updateCount, 50);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
});