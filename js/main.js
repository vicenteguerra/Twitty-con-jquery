(function () {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDMmmthJut_zP64tfOvDRQ2I4FPvWO-KWk",
    authDomain: "twitty-38fd9.firebaseapp.com",
    databaseURL: "https://twitty-38fd9.firebaseio.com",
    projectId: "twitty-38fd9",
    storageBucket: "twitty-38fd9.appspot.com",
    messagingSenderId: "189990017823"
  };
  firebase.initializeApp(config);
  var twit = firebase.database().ref('twit/');

  var contador = 0;
  var letras = 140;

  var cargarPagina = function () {
    // Envío de Tweet
    $("#mensajes").submit(saveTweet);
    $("#tweet").keyup(validarContenido);
    $("#tweet").keyup(contarLetras);
  };

  twit.on('value', function(snapshot) {
    $("#timeline").empty();
    snapshot.forEach(function (snapshot) {
       var obj = snapshot.val();
       agregarTweet(obj)
   });
  });


  var saveTweet = function(e){
    e.preventDefault();
    var $mensajeContenedor = $("#tweet");
    var mensaje = $mensajeContenedor.val();
    var $botonAgregar = $("#mandar");
    var hour = formatAMPM();

    $mensajeContenedor.val("");
    letras = 140 - $("#tweet").val().length;
    $("#contador").text(letras);
    $botonAgregar.attr("disabled", true);

    twit.push().set({
      msg: mensaje,
      hour: hour
    });
  }

  var agregarTweet = function (e) {
    // Obtenemos datos
    var $contenedor = $("#timeline");
    var $mensajeContenedor = $("#tweet");
    var $botonAgregar = $("#mandar");

    // Creamos elementos
    var $postContenedor = $("<article />", { "class": "jumbotron" });
    var $postTexto = $("<label />");
    var $hora = $("<p>");

    $hora.text(e.hour);

    var identificador = "marcador-" + contador;

    // Personalizamos elementos
    // $postContenedor.addClass("jumbotron");
    // $postCheck.type = "checkbox";
    $postTexto.attr("for", identificador);
    $postTexto.text(e.msg);

    // Agregarlos al DOM
    $postContenedor.append($postTexto);
    $postContenedor.append($hora);


    // Agregarlo a un elemento existente para visualizarlo
    // contenedor.appendChild(postContenedor);
    $contenedor.prepend($postContenedor);


    // Borrar contenido de textarea

    // bind, apply, call

  };

  var eliminarToDo = function () {
    $(this).parent().remove();
  };

  var validarContenido = function () {
    var $addButton = $("#mandar");
    // .trim() solo borra los espacios de sobra a los costados (izquierda y derecha)
    if($(this).val().trim().length > 0) {
      $addButton.removeAttr("disabled");
    } else {
      $addButton.attr("disabled", true);
    }
  };

  var contarLetras = function (event){
    letras = 140 - $("#tweet").val().length;
    if(letras >=30){
      $("#contador").css("color", "#000");
    }
    if(letras < 30){
      $("#contador").css("color", "#BCB800");
    }
    if(letras < 20){
      $("#contador").css("color", "red");
    }
    if(letras < 0){
      $("#mandar").prop( "disabled", true );
    }
    $("#contador").text(letras);

  };

  var formatAMPM = function() {
    var date = new Date;
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }



  // Cuando carga la página
  $(document).ready(cargarPagina);
})();
