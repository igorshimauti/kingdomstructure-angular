import {Component, inject} from '@angular/core';
import {InputTextComponent} from '@shared/components/input-text/input-text.component';
import {InputPasswordComponent} from '@shared/components/input-password/input-password.component';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '@core/services/auth.service';
import {Login} from '@shared/models/login.model';
import {Router} from '@angular/router';
import {ToastService} from '@core/services/toast.service';
import {ToastType} from '@shared/enums/toast-type.enum';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextComponent, InputPasswordComponent, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required])
  });

  onSubmit() {
    if (this.form.valid) {
      const payload: Login = this.form.value as Login;

      this.authService.login(payload).subscribe({
        next: () => {
          this.toast.show('Usuário autenticado com sucesso!', ToastType.SUCCESS);
          this.router.navigate(['/home']).then(ok => {
            console.log('Navegou?', ok);
          });
        },
        error: (err) => {
          console.error('Erro no login', err);
          this.toast.show('Erro ao autenticar usuário', ToastType.ERROR);
        }
      });
    }
  }
}
