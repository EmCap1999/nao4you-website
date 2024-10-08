# Frontend

### Diasable lightgrey border from phone input:
- got to --> ./node_modules/intl-tel-input/build.css/intlTelInput.css
- add -->  .iti input, .iti input[type=text], .iti input[type=tel] {
    ...
    border: none !important;
    box-shadow: none !important; }

![alt text](public/assets/app_state/sign_up_state.png)
![alt text](public/assets/app_state/navbar_state.png)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.5.

## Prettier (Formater) - Husky (git hooks) and lint-staged

https://prettier.io/docs/en/install --- '$npx prettier . --write (format all files) $npx prettier . --check (check format in all files)'

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
