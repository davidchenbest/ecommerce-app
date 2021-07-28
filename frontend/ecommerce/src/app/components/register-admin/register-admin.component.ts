import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { PasswordMatch } from 'src/app/validators/passwordMatch';

@Component({
  selector: 'app-register-admin',
  templateUrl: '../register/register.component.html',
  styleUrls: ['./register-admin.component.css'],
})
export class RegisterAdminComponent implements OnInit {
  name: string = 'Register Admin';
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
      role: new FormControl('admin', Validators.required),
    },
    { validators: PasswordMatch.MatchPassword }
  );

  constructor(private adminService: AdminService, private _router: Router) {}

  ngOnInit(): void {}

  get fc() {
    return this.newUserForm.controls;
  }

  onSubmit() {
    this.adminService.registerAdmin(this.newUserForm.value).subscribe((res) => {
      if (res.error) alert(JSON.stringify(res.error));
      else if (res._id) this._router.navigate(['/login']);
      else alert(JSON.stringify(res));
    });
  }
}
