import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class SnackBarService {
  private readonly DEFAULT_ERROR_MESSAGE = 'Error';
  private readonly DEFAULT_SUCCESS_MESSAGE = 'Succeeded';
  private readonly DEFAULT_DURATION = 6000;

  constructor(private snackBar: MatSnackBar) {
  }

  showError(message?: string) {
    message = message || this.DEFAULT_ERROR_MESSAGE;
    this.snackBar.open(message, null, {
      panelClass: 'snack-bar-error',
      duration: this.DEFAULT_DURATION
    });
  }

  showSuccess(message?: string) {
    message = message || this.DEFAULT_SUCCESS_MESSAGE;
    this.snackBar.open(message, null, {
      panelClass: 'snack-bar-success',
      duration: this.DEFAULT_DURATION
    });
  }
}
