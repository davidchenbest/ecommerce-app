import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { PasswordMatch } from 'src/app/validators/passwordMatch';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  newUserForm: FormGroup = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
    { validators: PasswordMatch.MatchPassword }
  );

  constructor(private userService: UserService, private _router: Router) {}

  ngOnInit(): void {}

  get fc() {
    return this.newUserForm.controls;
  }

  onSubmit() {
    this.userService.register(this.newUserForm.value).subscribe((res) => {
      if (res.error) alert(JSON.stringify(res.error));
      else if (res._id) this._router.navigate(['/login']);
      else alert(JSON.stringify(res));
    });
  }
}
