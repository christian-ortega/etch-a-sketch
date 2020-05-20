const gridContainer = document.querySelector("#grid-container");
const gridGeneratorButton = document.querySelector("#generate-grid");
const gridClearButton = document.querySelector('#clear-grid');

function generateGrid(dimension) {
    if(isNaN(dimension) || dimension <= 0) {
        generateGrid(16);
        return;
    } else {
        let gridElement;
        let numberOfGridElements = dimension * dimension;
        
        gridContainer.setAttribute('style',
            `grid-template-rows: repeat(${dimension}, ${512 / dimension}px);
             grid-template-columns: repeat(${dimension}, ${512 / dimension}px);`);

        for(let i = 0; i < numberOfGridElements; i++) {
            gridElement = document.createElement("div");
            gridElement.classList.toggle("grid-element");
            gridElement.setAttribute('style',
                `width: ${512 / dimension}px;
                 height: ${512 / dimension}px;`);
            gridElement.addEventListener("mouseover", (e) => {
                e.target.setAttribute('style',
                    `background-color: black;`);
            });
            gridContainer.appendChild(gridElement);
        }
    }
}

function eraseGrid() {
    let grid = document.querySelectorAll(".grid-element");
    grid.forEach((gridElement) => {
        gridElement.remove();
    });
}

function clearGrid() {
    let grid = document.querySelectorAll(".grid-element");
    grid.forEach((gridElement) => {
        gridElement.setAttribute('style',
            `background-color: white;`);
    });
}

generateGrid(16);

gridGeneratorButton.addEventListener("click", () => {
    let gridDimension = prompt("Enter the new grid dimension (default is 16)");
    
    eraseGrid();
    generateGrid(gridDimension);
    
});

gridClearButton.addEventListener("click", clearGrid);