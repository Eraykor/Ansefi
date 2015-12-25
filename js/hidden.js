var currentElement = null

function afficher_cacher(num) {
        for (var i = 1; i <= num; i++); {
            
        boule_reset();
        document.getElementById('img1').style.visibility = "hidden";
            
        if (currentElement != null)
            currentElement.style.visibility = "hidden";
            $('img' + i).fadeIn(800);
            if (i == 6) {
                i = 1;
            }
        
        currentElement = document.getElementById("img" + i);
        $('#img' + i).css("visibility", "visible").hide().fadeIn(1200);
        document.getElementById("b" + i).style.backgroundColor = "white";
        return true;
    }
}

function boule_reset() {
    document.getElementById('b1').style.backgroundColor = "#8b8c8d";
    document.getElementById('b2').style.backgroundColor = "#8b8c8d";
    document.getElementById('b3').style.backgroundColor = "#8b8c8d";
    document.getElementById('b4').style.backgroundColor = "#8b8c8d";
    document.getElementById('b5').style.backgroundColor = "#8b8c8d";
}