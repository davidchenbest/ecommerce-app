import { AbstractControl } from '@angular/forms';

export class PasswordMatch {
  static MatchPassword(control: AbstractControl): any {
    let password = control.get('password')?.value;
    let confirmPassword = control.get('confirmPassword')?.value;
    if (password !== confirmPassword)
      control.get('confirmPassword')?.setErrors({ PasswordMatch: true });
    else return null;
  }
}
