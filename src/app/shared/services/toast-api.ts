import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastMessage, ToastTypeEnum } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ToastApi {
  private toastSubject: BehaviorSubject<ToastMessage[]> = new BehaviorSubject<ToastMessage[]>([]);
  public toastState$: Observable<ToastMessage[]> = this.toastSubject.asObservable();
  private counter: number = 0;

  show(message: string, type: ToastTypeEnum) {
    const id = ++this.counter;
    const toast: ToastMessage = { id, message, type };

    this.toastSubject.next([...this.toastSubject.value, toast]);

    setTimeout(() => this.close(id), 3000);
  }

  close(id: number) {
    const updated = this.toastSubject.value.filter((toast: ToastMessage) => toast.id !== id);
    this.toastSubject.next(updated);
  }
}
