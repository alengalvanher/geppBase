import { Injectable, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
// import { ToastrService } from 'ngx-toastr';

export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
}



@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit {
    baseUrl = 'https://origamicode.com.mx/wolfsecurity/oauth/token';
    headersRequest = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    public userData: any;
    public showLoader: boolean = false;

    constructor(
        public router: Router,
        public ngZone: NgZone,
        // public toster: ToastrService,
        private cookieService: CookieService) {
    }

    ngOnInit(): void { }


    // sign in function
    SignIn(email: any, password: any) {
        // return this.afAuth.signInWithEmailAndPassword(email, password)
        //   .then((result:any) => {
        //     if (result.user.emailVerified !== true) {
        //     //   this.SetUserData(result.user);
        //     //   this.SendVerificationMail();

        //       this.showLoader = true;
        //     } else {
        //       this.showLoader = false;
        //       this.ngZone.run(() => {
        //         this.router.navigate(['/auth/login']);
        //       });
        //     }
        //   }).catch((error:any) => {
        //     this.toster.error('You have enter Wrong Email or Password.');
        //   })
    }

    constructUrlParams(email: string, password: string) {
        return new URLSearchParams({
            'username': email,
            'password': password,
            'grant_type': 'password'
        })
    }

    // sign in function
    SignInGP(email: any, password: any) {

        let body = this.constructUrlParams(email, password);

        fetch(this.baseUrl, {
            method: 'POST',
            headers: this.headersRequest,
            body: body
        }).then(response => {
            let res = response.json();

            res.then(data => {
                this.ngZone.run(() => {
                    this.router.navigate(['/auth/login']);
                    this.getUserData(data);
                });
            })
        })
            .catch((error: any) => {
                // this.toster.error('You have enter Wrong Email or Password.');
            })
    }


    getUserData(token: any) {
        let tokenForSend = token.access_token;
        // console.log("Token:", tokenForSend);

        fetch('https://origamicode.com.mx/wolfsecurity/api/accounts/login', {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'bearer ' + tokenForSend,
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
        }).then(response => {
            let res = response.json();

            res.then(data => {
                // console.log("El data del usuario es: ", data);

                this.cookieService.set('user', JSON.stringify(data));

                this.router.navigate(['/inventario']);
            })
        })
            .catch((error: any) => {
                //   this.toster.error('You have enter Wrong Email or Password.');
            })

        // this.cookieService.set('usergp', JSON.stringify( data ));
    }




    // Sign out
    SignOut() {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };

        this.cookieService.delete('user');
        this.cookieService.deleteAll('user', '/auth/login');
        this.router.navigate(['/auth/login']);
    }

    get isLoggedIn(): boolean {
        const user = JSON.parse(this.cookieService.get('user') || '{}');
        return (user != null && user.emailVerified != false) ? true : false;
    }

}
