import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'potion-app';
  onSubmit(formData: any) {
    console.log('Form Submitted:', formData);
  }
}
