import { AfterViewInit, Component, HostBinding, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerLoader2 } from '@ng-icons/tabler-icons';
import { AuthApiService } from 'app/features/auth/services/auth-api.service';
import { AuthRequest, User } from 'app/features/auth/services/auth.interface';
import { AlertService } from 'app/shared/services/alert.service';
import { AuthService } from 'app/core/services/auth.service';

@Component({
  selector: 'app-auth',
  imports: [NgIcon, FormsModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  viewProviders: [provideIcons({ tablerLoader2 })]
})
export class AuthComponent implements AfterViewInit, OnDestroy{
  @HostBinding('class') claseHost = 'flex w-full';

  isSubmitted = false;
  loadingSubmit: boolean = false;
  frmAuth: FormGroup;

  constructor(
    private authApi: AuthApiService, 
    private fb: FormBuilder, 
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router
  ) {
    this.frmAuth = this.fb.group({
      usuario: new FormControl(null, Validators.required),
      clave: new FormControl(null, Validators.required)
    });
  }

  ngAfterViewInit(): void {
    
  }

  ngOnDestroy(): void {

  }

  // Getters
  get f() {
    return this.frmAuth.controls;
  }

  get formData(): AuthRequest {
    return { 
      username: this.f['usuario'].value,
      password: this.f['clave'].value 
    };
  }

  // Events
  evtOnSubmit(): void {

    this.isSubmitted = true;

    if(this.frmAuth.invalid) {
      this.frmAuth.markAllAsTouched();
      this.handlerOnSubmitFormInvalid();
      return;
    }

    this.loadingSubmit = true;

    this.authApi.login(this.formData).subscribe({
      next: (res: User) => {
        this.loadingSubmit = false;
        this.handlerOnSubmitSuccess(res);
      },
      error: (err) => {
        this.handlerOnSubmitFormError(err.error ?? "Ocurrió un error, intente nuevamente.");
        this.loadingSubmit = false;
      }
    });
  }

  // Handlers
  handlerOnSubmitSuccess(res: User): void {
    this.authService.setToken(res.token);
    this.alertService.showSwalAlert({
      icon: 'success',
      title: `<span class="font-bold">Bienvenid@ <br> ${res.firstName} ${res.lastName}</span>`,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didClose: () => {
        this.router.navigate(['/admin']);
      },
    });
  }

  handlerOnSubmitFormInvalid(): void {
    let mensaje = "";

    if (this.f['usuario'].hasError('required') && this.f['clave'].hasError('required')) {
      mensaje = "Debe ingresar el usuario y contraseña";
    }
    else if (this.f['usuario'].hasError('required')) {
      mensaje = "Debe ingresar un usuario";
    }
    else if (this.f['clave'].hasError('required')) {
      mensaje = "Debe ingresar una contraseña";
    }

    this.alertService.showToast({
      position: 'bottom-end',
      icon: "error",
      title: mensaje,
      showCloseButton: true,
      timerProgressBar: true,
    });
  }

  handlerOnSubmitFormError(mensaje: string): void {
    this.alertService.showToast({
      position: 'bottom-end',
      icon: "error",
      title: mensaje,
      showCloseButton: true,
      timerProgressBar: true,
    });
  }

}
