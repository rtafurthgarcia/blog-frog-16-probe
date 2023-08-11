import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { BlogStateService } from './state/blog-state.service';

type CreatedBlog = {
  title: string;
  content: string;
};

type BlogFormGroup = FormGroup<{
  title: FormControl<string | null>;
  content: FormControl<string | null>;
}>;

@Component({
  selector: 'app-add-blog-page',
  templateUrl: './add-blog-page.component.html',
  styleUrls: ['./add-blog-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBlogPageComponent {
  form!: BlogFormGroup;

  constructor(public blogStateService: BlogStateService) {
    this.form = new FormGroup({
      title: new FormControl<string | null>(
        'an existing title',
        [
          Validators.required,
          Validators.pattern('^[A-Z]+(.)*'),
          this.customValidator,
        ],
        this.customAsyncValidator
      ),
      content: new FormControl<string | null>(null, [Validators.required]),
    });
  }

  async onSubmit() {
    console.log(this.form);
    this.validateAllFormFields(this.form);

    if (this.form.valid) {
      this.blogStateService.addBlog(this.form.value as CreatedBlog);
    }
  }

  customValidator(
    control: FormControl<string | null>
  ): ValidationErrors | null {
    if (control.value === 'Test') {
      return { custom: true };
    }
    return null;
  }

  customAsyncValidator(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (control.value === 'Test Async') {
          resolve({ customAsync: true });
        }
        resolve(null);
      });
    });
  }

  validateAllFormFields(formGroup: BlogFormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
