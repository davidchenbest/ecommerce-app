import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  invalid = false;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  get fc() {
    return this.loginForm.controls;
  }

  onSubmit(): any {
    const { username, password } = this.loginForm.value;
    this.authService.login(this.loginForm.value).subscribe((res) => {
      if (res.error) this.invalid = true;
      else this.authService.setCookie(res);
    });
  }
}
