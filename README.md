# BlogFrog16

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.3.

# Basics

Thats how the structure of an angular app should look like:

```
.
├── src
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   ├── app.module.ts -> where we add all of our *smart* components or *dumb* components that are used globally
│   ├── app-routing.module.ts -> for our routes
│   ├── core -> for services and other core components
│   │   ├── auth -> for authentication services
│   │   ├── loading-state.service.ts
│   │   └── other-small-dumb-component
│   ├── environment.service.ts
│   ├── features
│   │   └── add-blog-page -> each smart component has to be a page and has to have a module
│   │       ├── new-blog-page.component.html
│   │       ├── new-blog-page.component.scss
│   │       ├── new-blog-page.component.spec.ts
│   │       ├── new-blog-page.component.ts
│   │       ├── new-blog-page.module.
│   │       └── services -> smart components may have their separate own services
│   │           └── blog.service.ts
│   └── shared -> all dumb components, so without a module
│       └── add-blog-form
│           ├── add-blog-form.component.html
│           ├── add-blog-form.component.scss
│           ├── add-blog-form.component.spec.ts
│           └── add-blog-form.ts
├── environments -> for our env files
│   ├── environment.development.ts
│   ├── environment.ts
│   └── ienvironment.ts -> if possible an interface setting the minimum requirements for a proper env file
├── favicon.ico
├── index.html -> nothing but the app skelleton and the <app-root\>
├── main.ts
└── styles.scss -> for global styles
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Create new components

- To create new environments config file: `ng generate environments`
- To create a core component: `ng generate component core/header -c "OnPush"`
- To create a new smart component:
  - first register a module: `ng generate module features/blogOverviewPage -m app.module`
  - then create the other basic component files related to this module: `ng generate component features/blog-overview-page/blogOverviewPage --flat -m features/blog-overview-page/blog-overview-page.module --export`
- To create a service: `ng generate service core/services/api.state.service`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## RxJS

Create an observable that emits numbers from 0 to 5

```
const observableNumbers = new Observable((observer) => {
  for(let i = 0; i < 5; i++) {
    observer.next(i);
  }

  observer.complete();
});
```

Use of and from: Create Observables using of and from operators and subscribe to them.

```
of([1, 2, 3, 4, 5]).subscribe(x => console.log(x)); // will give out the list as a whole, for each parameter is considered as one object
from([1, 2, 3, 4, 5]).subscribe(x => console.log(x)); // will give out each item from the list
```

Use map: Create an observable that emits numbers and use map to square each number.

```
from([4, 6, 19, 561, 6611]).pipe(
  map(x => x * x)
).subscribe(x => console.log(x));
```

### Change detection

It's responsible for keeping the view (DOM) in sync with the application data (model).
Whenever the model data changes, Angular's change detection system updates the view to reflect those changes.

Angular provides two main change detection strategies:

- Default: Angular checks for changes in all components and their child components whenever a change is detected anywhere in the application.
- OnPush: Angular only checks for changes when new references are passed to the @Input() properties or when an event is emitted by the component. -> Perfect for dumb components !

Note that when Angular detects that a change has potentially occurred (either due to user actions, HTTP requests, or other asynchronous operations), it runs a change detection cycle to update the view.

### Dependancy injection

Components, services or whatever class can be injected directly by appending this decorator before any class

```
@Injectable({
  providedIn: 'root',
})
```

The `providedIn` property is a way to specify where the injectable should be registered:

'root': When you provide the service at the 'root' level, Angular creates a single, shared instance of the service and injects it into any class that asks for it. This makes the service essentially a singleton in the application, and it stays alive for the entire lifespan of the app.

By setting providedIn: 'root', you're telling Angular to provide this service in the application's root injector. That means the service is available throughout the entire application without needing to list it in any module's providers array.
