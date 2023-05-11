import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'character-card',
  template: `
    <div class="card">
      <div class="image">
        <a [routerLink]="['/character-detail', character.id]">
          <img
            [src]="character.image"
            [alt]="character.name"
            class="card-img-top"
          />
        </a>
      </div>
      <div class="card-inner">
        <div class="header">
          <a [routerLink]="['/character-detail', character.id]">
            <h2>{{ character.name }}</h2>
          </a>
          <h4 class="text-muted">{{ character.gender }}</h4>
          <small class="text-muted">{{character.created | date: 'yyyy-MM-dd'}}</small>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterComponent {
  @Input() character: any;
}
