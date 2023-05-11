import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../../interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private readonly rickMortyApi = 'https://rickandmortyapi.com/api';
  constructor(private readonly http: HttpClient) {}

  searchCharacters<T>(
    query: string = '',
    page: number = 1
  ): Observable<IResponse<T>> {
    return this.http.get<IResponse<T>>(
      `${this.rickMortyApi}/character/?name=${query}&page=${page}`
    );
  }

  getCharacter<T>(id: number):Observable<T> {
    return this.http.get<T>(`${this.rickMortyApi}/character/${id}`);
  }
}
