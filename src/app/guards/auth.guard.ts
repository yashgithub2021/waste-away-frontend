import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  let router = new Router
  let user = localStorage.getItem("auth-token")
  if (user) {
    return true;
  }
  router.navigate(['/login'])
  console.log("Please Login First")
  return false
};
