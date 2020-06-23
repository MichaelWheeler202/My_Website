
var max_mobile_width = 800

function nav_bar_collapses() {
      var x = document.getElementById("myLinks");
      if (x.style.display === "block") {
            x.style.display = "none";
      } else {
            x.style.display = "block";
      }
}


function init_nav_bar(){

    var nav_bar = document.getElementById("nav_bar");

    if (screen.width > max_mobile_width){  //load desktop navbar

        nav_bar.innerHTML= `

            <nav class="navbar navbar-expand-md navbar-dark bg-steel fixed-top"style="display: flex;" id="nav_bar" >
                <div class="container" style="display: flex;">
                    <a class="navbar-brand mr-4" href="/">Home</a>
                    <div class="navbar-nav mr-auto" id="myLinks">
                        <a class="nav-item nav-link" href="/MNISTDigitReader">Digit Reader</a>
                        <a class="nav-item nav-link" href="/Contact-Info">Contact Info & Resume</a>
                    </div>
                </div>
            </nav>

        `;

    } else { //load mobile navbar


        nav_bar.innerHTML= `

            <div class="col-9">
                <div class="container" >
                    <a class="navbar-brand mr-4" href="/">Home</a>
                    <!-- Navigation links (hidden by default) -->
                    <div class="navbar-nav mr-auto" id="myLinks">
                        <a class="nav-item nav-link" href="/MNISTDigitReader">Digit Reader</a>
                        <a class="nav-item nav-link" href="/Contact-Info">Contact Info & Resume</a>
                    </div>
                </div>
            </div>
            <div class="col-2">
                <!-- "Hamburger menu" / "Bar icon" to toggle the navigation links -->
                 <a href="javascript:void(0);" class="icon" onclick="nav_bar_collapses()">
                <i class="navbar-toggler-icon"></i>
                </a>
            </div>

         `;

        var x = document.getElementById("myLinks");
        x.style.display = "none";

     }

}


init_nav_bar()
