import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpxPotionsFormComponent } from './npx-potions-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { NpxPotionsFormModule } from 'npx-potions-form';

describe('NpxPotionsFormComponent', () => {
  let component: NpxPotionsFormComponent;
  let fixture: ComponentFixture<NpxPotionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NpxPotionsFormModule,
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatIconModule,
        MatChipsModule,
      ],
      declarations:[NpxPotionsFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NpxPotionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.potionForm).toBeDefined();
  });

  it('should have an invalid form when initialized', () => {
    expect(component.potionForm.valid).toBeFalse();
  });

  it('should validate the name field as required', () => {
    let nameInput = component.potionForm.controls['name'];
    expect(nameInput.valid).toBeFalse();

    nameInput.setValue('');
    expect(nameInput.hasError('required')).toBeTrue();

    nameInput.setValue('Martini');
    expect(nameInput.valid).toBeTrue();
  });

  it('should validate the description field as required', () => {
    let descriptionInput = component.potionForm.controls['description'];
    expect(descriptionInput.valid).toBeFalse();

    descriptionInput.setValue('');
    expect(descriptionInput.hasError('required')).toBeTrue();

    descriptionInput.setValue('A potion that people love.');
    expect(descriptionInput.valid).toBeTrue();
  });

  it('should require at least one ingredient', () => {
    expect(component.ingredientsControl.valid).toBeFalse();

    component.ingredientsControl.setValue(['Olives']);
    expect(component.ingredientsControl.valid).toBeTrue();

    component.ingredientsControl.setValue([]);
    expect(component.ingredientsControl.valid).toBeFalse();
  });

  it('should add an ingredient when calling addIngredient()', () => {
    component.addIngredient({ value: 'Vodka', input: null } as any);
    expect(component.ingredientsControl.value.length).toBe(1);
    expect(component.ingredientsControl.value).toContain('Vodka');
  });

  it('should remove an ingredient when calling removeIngredient()', () => {
    component.ingredientsControl.setValue(['Gin', 'Syrup']);
    component.removeIngredient(0);
    expect(component.ingredientsControl.value.length).toBe(1);
    expect(component.ingredientsControl.value).not.toContain('Gin');
  });

  it('should disable submit button when form is invalid', () => {
    const submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    ).nativeElement;
    expect(submitButton.disabled).toBeTrue();

    component.potionForm.patchValue({
      name: 'Espresso Martini',
      description: 'Restores magical energy.',
      difficulty: 'Easy',
      effect: 'Restores life',
      sideEffects: 'Temporary dizziness',
    });
    component.ingredientsControl.setValue(['Coffee', 'Vodka']);

    fixture.detectChanges();
    expect(submitButton.disabled).toBeFalse();
  });

  it('should reset the form when calling onReset()', () => {
    component.potionForm.patchValue({
      name: 'ABC',
      description: 'Good for health',
      difficulty: 'Medium',
      effect: 'Boosts strength',
      sideEffects: 'None',
    });
    component.ingredientsControl.setValue(['Apple', 'Beetroot', 'Carrot']);

    component.onReset();
    expect(component.potionForm.value.name).toBeNull();
    expect(component.potionForm.value.description).toBeNull();
    expect(component.ingredientsControl.value.length).toBe(0);
  });

  it('should show a success message when the form is submitted', () => {
    spyOn(window, 'alert'); 
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('Your potion has been brewed successfully!');
  });
});
