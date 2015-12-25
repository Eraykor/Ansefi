var currentElement = null
var i = 1;

function previous(num) {
    {
    
    boule_res();
    document.getElementById('img1').style.visibility = "hidden";
    
    if (currentElement != null)
        currentElement.style.visibility = "hidden";
        if (num == 1) {
            i = 5;
        } else if (num == 2) {
            i = 1;
        } else if (num == 3) {
            i = 2;
        } else if (num == 4) {
            i = 3;
        } else if (num == 5) {
            i = 4;
        } else {
            i = 1;
        }
       
        currentElement = document.getElementById("img" + i);
        $('#img' + i).css("visibility", "visible").hide().fadeIn(1200);
        document.getElementById("b" + i).style.backgroundColor = "white";
        return true;
    }  
}

function boule_res() {
    document.getElementById('b1').style.backgroundColor = "#8b8c8d";
    document.getElementById('b2').style.backgroundColor = "#8b8c8d";
    document.getElementById('b3').style.backgroundColor = "#8b8c8d";
    document.getElementById('b4').style.backgroundColor = "#8b8c8d";
    document.getElementById('b5').style.backgroundColor = "#8b8c8d";
}