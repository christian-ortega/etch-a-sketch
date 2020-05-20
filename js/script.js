const gridContainer = document.querySelector("#grid-container");
const gridGenerator = document.querySelector("#generate-grid");

function generateGrid(dimension) {
    if(isNaN(dimension) || dimension <= 0) { //dimension != number
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
                e.target.classList.add("colored");
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
generateGrid(16);

//unfulfilled functionality: gridGenerator must reset grid first by removing elements, and then add new gridElements with refactored function (see above comment)
gridGenerator.addEventListener("click", () => {
    let gridDimension = prompt("Enter the new grid dimension (default is 16)");
    
    eraseGrid();
    generateGrid(gridDimension);
    
});