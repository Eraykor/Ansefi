var currentElement = null

function boule_color(id) {
    boule_reset();
    document.getElementById('img1').style.visibility = "hidden";
    
    if (currentElement != null)
    currentElement.style.visibility = "hidden";
    
    currentElement = document.getElementById("img" + id);
    document.getElementById("b" + id).style.backgroundColor = "white";
    $('#img' + id).css("visibility", "visible").hide().fadeIn(1200);
    return true;
}

function boule_reset() {
    document.getElementById('b1').style.backgroundColor = "#8b8c8d";
    document.getElementById('b2').style.backgroundColor = "#8b8c8d";
    document.getElementById('b3').style.backgroundColor = "#8b8c8d";
    document.getElementById('b4').style.backgroundColor = "#8b8c8d";
    document.getElementById('b5').style.backgroundColor = "#8b8c8d";
}