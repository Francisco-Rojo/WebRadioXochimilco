// login Google
var provider = new firebase.auth.GoogleAuthProvider();

// con jquery tomamos el id del boton y llamamos la funcion click (observador)
$('#loginGoogle').click(function(){
	firebase.auth()
  		.signInWithPopup(provider)
  		.then((result) => {
  			console.log(result.user);
  			saveData(result.user);
  			console.log("Google: Sesion iniciada");
  		}).catch((error) => {
		    // Handle Errors here.
		    var errorCode = error.code;
		    var errorMessage = error.message;
		    // The email of the user's account used.
		    var email = error.email;
		    // The firebase.auth.AuthCredential type that was used.
		    var credential = error.credential;
		    // ...
		    console.log("Error inicio de sesión");
		  });
});


/*login Facebook
var providerFace = new firebase.auth.FacebookAuthProvider();

$('#loginFacebook').click(function(){
	//console.log("hola mundo");
	firebase.auth()
		.signInWithPopup(providerFace)
		.then((result) => {
			console.log(result.user);
			console.log("Facebook: Sesion iniciada");
		}).catch((error) => {
			console.log(error);
			console.log("Error inicio de sesión");
		})
}); */



// funcion de guardado de datos automatico
function saveData(user){
	var usuario = {
		uid: user.uid,
		name: user.displayName,
		email: user.email,
		foto: user.photoURL
	}
	firebase.database().ref("conexion/" * user.uid).push(usuario)
}


// comprobar si esta iniciada la sesion o no 
firebase.auth().onAuthStateChanged(user => {
	if (user) {
		console.log("auth: sesion iniciada");
		$('#root').append("<img width='50px' src='"+user.photoURL+"' class='rounded img-fluid  d-flex m-auto m-0 pt-3' />");
		$('#bienvenido').append(" <p class='text-center h3'>Bienvenido: </p>  ");
  		$('#name').append(" <p class='display-4 text-center'> "+user.displayName+" </p> ");
  		$('#modalSesion').hide();
  		$('#cerrarSesion').show(); 

	} else {
		console.log("auth: no se ha iniciado sesion");
		$('#cerrarSesion').hide();		
	}
});


// cerrar sesion
const cerrar = document.querySelector('#cerrarSesion');

cerrar.addEventListener('click', e => {
	e.preventDefault();
	firebase.auth().signOut().then(() =>{
		location.reload() //funcion para reiniciar automaticamente la paginas
	})
	
});






// funcion anonima
// .set --> diccionario de datos

/*
$('#guardar').click(function(){
	firebase.database().ref("conexion").set({
		nombre: "prueba"
	})
	console.log("Exito");
});	*/


/* leer datos de la bd
firebase.database().ref("conexion").on("child_added", function(s){
	var dato = s.val();
	$('#root').append("<img src='"+dato.photoURL+"' />")

}) */ 