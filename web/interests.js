const showcaseGrid = document.querySelector("#showcase-grid");
const showcaseStatus = document.querySelector("#showcase-status");
const showcaseCount = document.querySelector("#showcase-count");
const showcaseRefresh = document.querySelector("#showcase-refresh");

async function loadShowcase() {
    if (!showcaseGrid || !showcaseStatus) return;
    showcaseStatus.textContent = "Loading...";
    showcaseGrid.replaceChildren();
    if (showcaseCount) showcaseCount.textContent = "";
    try {
        const url = SHOWCASE_CONFIG.url + "/rest/v1/titles" + "?order=id.desc";
        const response = await fetch(url, {
            headers: {"apikey": SHOWCASE_CONFIG.key }
        });
        if (!response.ok) throw new Error("HTTP " + response.status);
        const items = await response.json();

        for (const item of items) {
            const card = document.createElement("article");
            card.className = "showcase-card";

            const button = document.createElement("button");
            button.type = "button";
            button.className = "showcase-card-button";
            button.dataset.id = item.id;
            
            if (item.image_url && item.image_url.startsWith("https://")) {
                const photo = document.createElement("img");
                photo.className = "showcase-photo";
                photo.src = item.image_url;
                photo.alt = "Photo for " + item.title;
                photo.loading = "lazy";
                photo.addEventListener("error", () => photo.remove());
                button.appendChild(photo);
            }

            const body = document.createElement("div");
            body.className = "showcase-body";

            const title = document.createElement("h3");
            title.textContent = item.title;

            const category = document.createElement("p")
            category.textContent = item.category;

            body.append(title, category);
            button.appendChild(body);

            button.addEventListener("click", () => {
                window.location.href = `details.html?id=${encodeURIComponent(item.id)}`;
            });

            card.appendChild(button);
            showcaseGrid.appendChild(card);

        }

        showcaseStatus.textContent = items.length ? "Loaded successfully." : "No items yet.";
        if (showcaseCount) showcaseCount.textContent = items.length + " item(s)";
    } catch (error) {
        showcaseStatus.textContent = "Could not load the items.";
        console.error("Showcase API error:", error);
    }
}

if (showcaseGrid && showcaseStatus) loadShowcase();
if (showcaseRefresh) showcaseRefresh.addEventListener("click", loadShowcase);
