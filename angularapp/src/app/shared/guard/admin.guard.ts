import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthService } from './../../servicios/auth.service';

@Injectable({
	providedIn: 'root'
})
export class AdminGuard implements CanActivate {

	constructor(public authService: AuthService,
		public router: Router, public cookieService: CookieService) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {



		let userPrev = this.cookieService.get('user');


		if(userPrev){
			let user = JSON.parse( userPrev );

			// console.log("El usuario es: ", user);
			// console.info("ir userPrev");
			return true;

		} else {
			// console.info("ir userPrev NOT");
			this.router.navigate(['/auth/login']);
			return true;
		}

		return false;
		// 	console.log("El el usuario guardado es en adminguard: ", user);

		// 	console.log("EL user id  en adminguard es: ", user.id);

		// 	if (!user || user === null) {
		// 		console.log("Entrada 1");

		// 		return true;
		// 	}
		// 	else if (user) {
		// 		if (!Object.keys(user).length) {
		// 			this.router.navigate(['/auth/login']);
		// 			return true
		// 		}
		// 	}

		// 	return true
		// }

		// return false;



	}
}
