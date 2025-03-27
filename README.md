# Tutorial para Login con Firebase
## Configuraciones iniciales 
---
Instalacion de Ionic en la consola
```
ionic start
```
Escoger lo siguiente:
- la opcion N en la primera pregunta.
- Colocar el nombre del proyecto
- Angular
- Standalone

Ingresar a la carpeta del proyecto.
Instalar la extension de angular firebase.
```
npm install @angular/fire firebase
```
Ingresar a la carpeta environments y dentro en los dos archivos colocar lo siguiente:
environment.prod.ts
```
export const environment = {
  production: true,
  firebase: {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
  }
};
```
environment.ts
```
export const environment = {
  production: false,
  firebase: {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
  }
};
```
Posterior ingresar el archivo main.ts y colocar lo siguiente:
```
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from './environments/environment';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(IonicModule.forRoot()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  provideRouter(routes)
  ]
});
```
## Creacion de Proyecto en Firebase
---
Ingresar a la Pagina de [Firebase](https://firebase.google.com/).
es importante ingresar con tu cuenta de google 
- Ingresar a la consola
- Creas un nuevo proyecto
- Completar con todas las respuestas.
- Vas a la Opcion Build Autentificacion en el menu izquierdo.
- Veras una opcoin que es get started o iniciar apretar ahi.
- Escoger la opcion email/password
- Habilitar las dos opciones que te presenta en el menu.
- Ingresar a la pagina de inicio o project overview.
![This is an alt text.](/src/assets/screen1.png "This is a sample image.")
- Escoger como esta en la imagen el tercer icono donde dice web.
- te aparecera un formulario colocas un nombre y pones registrar app
![This is an alt text.](/src/assets/screen2.png "This is a sample image.")
- Como esta en la imagen tendras un codigo y vas a pegar el siguiente codigo en el archivo environment.ts:
 ```
   apiKey: "Tu ApiKey",

  authDomain: "",

  projectId: "",

  storageBucket: "",

  messagingSenderId: "",

  appId: "",

  measurementId: ""
```
## Programar el Servicio y Conexion con Firebase
crear dentro de app la carpeta services y dentro de services el archivo auth.service.ts
Existen estas opciones que tiene firebase auth
**Auth** : El que realizar el inicio de la autentificacion.

**signInWithEmailAndPassword**: componente que realiza la verificacion de autentificacion.

**createUserWithEmailAndPassword** : Componente que registra los datos de la autentificacion.

**signOut** : componente para hacer cierre de sesion.

Se debe crear funciones dentro del services llamando a estos componentes segun este codigo:
```
private auth: Auth = inject(Auth);

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  register(email: string, password: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  logout(): Observable<any> {
    return from(signOut(this.auth));
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }
```
## Programar el Componente del Login
Crear una carpeta llamada auth y dentro de ello otra carpeta llamada login, donde estaran tres archivos, el component, html y scss.
En el archivo component. se debe realizar lo siguiente:
### Iniciar las variables
Se debe inicializar el servicio, el formulario y la validacion del formulario con formularios reactivos. 
Tambien se contara con variables bandera donde se utilizara un loading, si existiera error en los mensajes.
```
 private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';
```
### Formularios Reactivos
Los formularios reactivos en angular nos ayudan a que se realice validaciones cuando tipeamos en los inputs y nos muestre diferentes validaciones para garantizar la informacion que requiere el back end.
para iniciar los formularios reactivos es necesario inicializarlo con:
```
private fb = inject(FormBuilder);
```
posterior debemos inicializar en el constructor lo siguiente
```
  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
```
**Validators.required** : el validador para que el input si o si tenga un elemento.

**Validators.minLength(n)**: para determinar el minimo de caracteres en un input.

**Validators.email** : determinar los validadores para un correcto escrito de un mail ( no le falta la @ . , .com u otros).

Si desean profundizar sobre los validadores pueden ingresar en el siguiente link: [Hacer click aqui](https://angular.dev/api/forms/Validators).