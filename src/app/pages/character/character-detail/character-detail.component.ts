import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, take } from 'rxjs';
import { CharacterService } from 'src/app/shared/components/service/character.service';
import { ICharacter } from 'src/app/shared/interfaces/character.interface';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styles: [],
})
export class CharacterDetailComponent implements OnInit {
  character$: Observable<ICharacter>;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly characterSrvc: CharacterService,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe({
      next: (params) => {
        const id = params['id'];
        this.character$ = this.characterSrvc.getCharacter<ICharacter>(id);
      },
    });
  }

  onGoBack() {
    this.location.back();
  }
}
