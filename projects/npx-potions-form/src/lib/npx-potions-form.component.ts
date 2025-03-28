import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'lib-npx-potions-form',
  templateUrl: 'npx-potions-form.component.html',
  styleUrls: ['./npx-potions-form.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NpxPotionsFormComponent {
  @Input() defaultValues: any = {};
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formReset = new EventEmitter<void>();
  potionForm!: FormGroup;

  difficulties = [
    { value: 'easy', viewValue: 'Easy' },
    { value: 'medium', viewValue: 'Medium' },
    { value: 'hard', viewValue: 'Hard' },
  ];
  ingredientInput = new FormControl('');
  ingredientsControl!: FormControl;
  constructor(private fb: FormBuilder) {}


  ngOnInit() {

    this.ingredientsControl = new FormControl(
      this.defaultValues.ingredients || [], Validators.required
    );

    this.potionForm = this.fb.group({
      name: [this.defaultValues?.name || '', Validators.required],
      description: [this.defaultValues?.description || '', Validators.required],
      ingredients: this.ingredientsControl,
      difficulty: [this.defaultValues?.difficulty || ''],
      effect: [this.defaultValues?.effect || ''],
      sideEffects: [this.defaultValues?.sideEffects || ''],
    });

    
  }

  addIngredient(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.ingredientsControl.setValue([
        ...this.ingredientsControl.value,
        value,
      ]);
    }
    if(event.chipInput){
      event.chipInput!.clear();
    }
  }

  removeIngredient(index: number): void {
    const ingredients = this.ingredientsControl.value;
    ingredients.splice(index, 1);
    this.ingredientsControl.setValue([...ingredients]);
  }
  onSubmit() {
    alert('Your potion has been brewed successfully!');
    this.onReset();
  }

  onReset() {
    this.formReset.emit();
    this.potionForm.reset();
    this.ingredientsControl.setValue([]);
  }
}
