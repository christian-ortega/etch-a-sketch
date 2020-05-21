const gridContainer = document.querySelector("#grid-container");
const gridGeneratorButton = document.querySelector("#generate-grid");
const gridClearButton = document.querySelector('#clear-grid');
const hideBorderCheckbox = document.querySelector('#hide-border');
const fillOptions = document.querySelectorAll("input[type='radio'][name='fill']");
const colorSelection = document.querySelector('#color-selection');

let currentFillOption = "default";

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
                 height: ${512 / dimension}px;
                 background-color: white;
                 opacity: 1;
                 border-style: ${(hideBorderCheckbox.checked ? "hidden": "solid")}`);
            gridElement.addEventListener("mouseover", fillColor);
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
        gridElement.style.backgroundColor = "white";
        gridElement.style.opacity = "1";
    });
}

function fillColor(e) {
    if(currentFillOption != "no-color") {
        if(currentFillOption == "default") {
            e.target.style.backgroundColor = "black";
            e.target.opacity = "1";
        }
        else if(currentFillOption == "single-color") {
            e.target.style.backgroundColor = `${colorSelection.value}`;
            e.target.style.opacity = "1";
        }
        else if(currentFillOption == "rainbow") {
            let color1 = Math.floor(Math.random() * 256);
            let color2 = Math.floor(Math.random() * 256);
            let color3 = Math.floor(Math.random() * 256);

            e.target.style.backgroundColor = `rgb(${color1}, ${color2}, ${color3})`;
            e.target.style.opacity = "1";
        }
        else if(currentFillOption == "grayscale") {
            if(!(e.target.style.backgroundColor == "black" && e.target.style.opacity == 1)) {
                if(e.target.style.backgroundColor != "black" &&
                        e.target.style.backgroundColor != "#000000" && 
                        e.target.style.backgroundColor != "rgb(0, 0, 0)") {

                    e.target.style.backgroundColor = "black";
                    e.target.style.opacity = "0.1";
                }
                else {
                    e.target.style.backgroundColor = "black";
                    e.target.style.opacity = `${Number(e.target.style.opacity) + 0.1}`;
                }
            }
        }
    }
}

generateGrid(16);

gridGeneratorButton.addEventListener("click", () => {
    let gridDimension = prompt("Enter the new grid dimension (default is 16)");
    
    eraseGrid();
    generateGrid(gridDimension);
    
});

gridClearButton.addEventListener("click", clearGrid);

fillOptions.forEach((option) => {
    option.addEventListener("click", () => {
        currentFillOption = option.id;
    });
});

hideBorderCheckbox.addEventListener("click", (e) => {
    const gridElements = document.querySelectorAll('.grid-element');
    if(e.target.checked) {
        gridElements.forEach((element) => {
            element.style.borderStyle = "hidden";
        });
    }
    else {
        gridElements.forEach((element) => {
            element.style.borderStyle = "solid";
        });
    }
});