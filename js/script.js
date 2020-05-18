const gridContainer = document.querySelector("#grid-container");

let gridElement;
for(let i = 0; i < 256; i++) {
    gridElement = document.createElement("div");
    gridElement.classList.toggle("grid-element");
    gridElement.addEventListener("mouseover", (e) => {
        e.target.classList.add("colored");
    });
    gridContainer.appendChild(gridElement);
}