import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ToastApi } from '../../services/toast-api';
import { ToastMessage } from '../../models';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.html',
  styleUrl: './toast.scss'
})
export class Toast {
  private toastService = inject(ToastApi);

  public toasts: WritableSignal<ToastMessage[]> = signal([]);

  constructor() {
    this.toastService.toastState$.subscribe((toasts: ToastMessage[]) => {
      this.toasts.set(toasts);
    });
  }
}
