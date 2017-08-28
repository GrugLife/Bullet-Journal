var dragged;

// events fired on the draggable target
document.addEventListener("drag", function(event){
    
}, false);

document.addEventListener("dragstart", function(event){
    // store a ref. on the dragged elem
    dragged = event.target;
    // make it half transparent
    event.target.style.opacity = 0.5;
}, false);

document.addEventListener("dragend", function(event){
    // prevent default to allow drop
    event.preventDefault();
}, false);

// events fired on the drop targets
document.addEventListener("dragover", function(event){
    // prevent defualt to allow drop
    event.preventDefault();
}, false);

document.addEventListener("dragenter", function(event){
    // highlight potential drop target when the draggable element enters it
    if(event.target.className === "dropzone"){
        event.target.style.background = "purple";
    }
}, false);

document.addEventListener("dragleave", function(event){
    // reset background of potential drop target when the draggable element leaves it
    if(event.target.className === "dropzone") {
        event.target.style.background = "";
    }
}, false);

document.addEventListener("drop", function(event){
    // prevent defualt action (open as link for some elements)
    event.preventDefault();
    // move dragged elem to the seleceted drop target
    if(event.target.className === "dropzone"){
        var data = event.dataTransfer.getData("text/plain");
        event.target.textContent = data;
        event.preventDefault()
        // event.target.style.background = "";
        // dragged.parentNode.removeChild(dragged);
        // event.target.appendChild(dragged);
    }
}, false);

