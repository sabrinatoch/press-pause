import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-interests',
  templateUrl: './user-interests.component.html',
  styleUrls: ['./user-interests.component.css']
})
export class UserInterestsComponent {

  constructor(private http: HttpClient) {}

  async saveInterests() {
    const userData = {
      movieGenres: this.getCheckedValues('movie-genres'),
      favoriteMovies: (document.getElementById('movie-text') as HTMLInputElement)?.value || '',
      musicGenres: this.getCheckedValues('music-genres'),
      favoriteMusic: (document.getElementById('music-text') as HTMLInputElement)?.value || '',
      bookGenres: this.getCheckedValues('book-genres'),
      favoriteBooks: (document.getElementById('book-text') as HTMLInputElement)?.value || '',
      gameGenres: this.getCheckedValues('game-genres'),
      favoriteGames: (document.getElementById('game-text') as HTMLInputElement)?.value || '',
      hobbies: (document.getElementById('hobby-text') as HTMLInputElement)?.value || ''
    };

    console.log('Collected Data:', userData); 

    try {
      const response = await this.http.post('http://localhost:3000/api/user-interest', userData).toPromise();
      console.log('Server response:', response);
    } catch (error) {
      console.error('Error saving interests:', error);
    }
  }

  private getCheckedValues(containerId: string): string[] {
    const container = document.getElementById(containerId);
    if (!container) return [];

    const checkboxes = container.querySelectorAll('input[type="checkbox"]:checked');
    return Array.from(checkboxes).map((checkbox: any) => checkbox.value);
  }
}
