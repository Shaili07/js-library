# @shaili-g/npx-potions-form

A simple and customizable Angular form component for creating potions with ingredients, effects, difficulty levels, and more.
Ideal for potion-making applications or any fun form you need for dynamic fields!

## Features

- Easily customizable form with dynamic ingredients input.
- Supports validations like required fields and dynamic form resets.
- Built with Angular Material for a modern UI.
- Unit testing done with Jasmine and Karma.


To install the package, run:
**npm install @shaili_g/npx-potions-form**

I intended to add a background image to the library for aesthetics, but you can add this to your Angular application from here:
projects/npx-potions-form/src/assets/ghibli-bar.png

I have added custom CSS in this reactive form with validations on required fields. 
Below are the fields present in the form:
=> name – name of the potion (required) : TEXT

=> description – the main characteristics of the potion (required) : TEXT

=> ingredients – a list of ingredients to make the potion (required) : implemented as chips, can add/delete

=> difficulty – the difficulty of making the potion (optional) : dropdown implementation

=> effect – the primary effects of the potion (optional): TEXT

=> side effects – the side effects of the potion (optional): TEXT

## Inputs
defaultValues: any: Sets the initial values for the form fields. Can be customized with properties like name, description, difficulty, ingredients, effect, and sideEffects.

## Outputs
formSubmit: EventEmitter<any>: Emits the form data when submitted.

formReset: EventEmitter<void>: Emits when the form is reset.

formCancel: EventEmitter<void>: Emits when the form is cancelled.




Angular Version: 19.2.4
Angular Material: 19.2.7
