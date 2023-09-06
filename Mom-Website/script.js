//mobile or desktop
function showProperSite() {
    if (isMobile()) {
        hide("desktopSite");
    } else {
        hide("mobileSite");
    }
}


//helper funcs
//I got this from the internet. Idk how exactly it works.
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

//hide
function hide(id) {
    document.getElementById(id).style.display = "none";
}