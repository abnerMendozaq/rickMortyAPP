import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search',
  template: `
    <form [formGroup]="searchForm">
      <input
        type="text"
        autofocus
        class="form-control-lg"
        formControlName="text"
        placeholder="Search"
      />
    </form>
  `,
  styles: [
    `
      input {
        width: 100%;
      }
    `,
  ],
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  $unSubscribe = new Subject<void>();
  constructor(private fb: FormBuilder, private router: Router) {
    this.searchForm = fb.group({ text: [null] });
  }
  ngOnInit(): void {
    this.searchForm
      .get('text')
      .valueChanges.pipe(takeUntil(this.$unSubscribe))
      .subscribe({
        next: (value: string) => {
          this.router.navigate(['/character-list'], {
            queryParams: { q: value },
          });
        },
      });
  }
}
