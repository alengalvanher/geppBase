import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './../../../servicios/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [FormsModule, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
    public show: boolean = false;
    public loginForm: FormGroup | any;
    public errorMessage: any;

    constructor(public authService: AuthService, private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['contraseña', Validators.required],
        });

        document.querySelector('body')?.classList.add('login-img');
    }

    ngOnInit() { }

    showPassword() {
        this.show = !this.show;
    }


    // Simple Login
    login() {
        this.authService.SignInGP(
            this.loginForm.value['email'],
            this.loginForm.value['password']
        );
    }


    ngOnDestroy() {
        document.querySelector('body')?.classList.remove('login-img');
    }
}
