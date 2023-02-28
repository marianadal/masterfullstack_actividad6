import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  formModel: FormGroup;

  constructor() {
    this.formModel = new FormGroup(
      {
        first_name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        last_name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/),
        ]),
        image: new FormControl('', [
          Validators.required,
          Validators.pattern(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/),
        ]),
      },
      []
    );
  }

  ngOnInit(): void {}

  getDataForm() {
    console.log(this.formModel.value);
  }

  checkControl(controlName: string, controlError: string): boolean {
    if (
      this.formModel.get(controlName)?.hasError(controlError) &&
      this.formModel.get(controlName)?.touched
    ) {
      return true;
    }
    return false;
  }
}
