import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-interests',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './user-interests.component.html',
  styleUrls: ['./user-interests.component.css']
})
export class UserInterestsComponent implements OnInit {

  movieGenres = [
    { name: 'Action', selected: false },
    { name: 'Drama', selected: false },
    { name: 'Horror', selected: false },
    { name: 'Comedy', selected: false },
    { name: 'Sci-Fi', selected: false },
    { name: 'Documentary', selected: false },
    { name: 'Indie', selected: false }
  ];

  musicGenres = [
    { name: 'Rock', selected: false },
    { name: 'Hip-Hop', selected: false },
    { name: 'Classical', selected: false },
    { name: 'Pop', selected: false },
    { name: 'Jazz', selected: false },
    { name: 'Electronic', selected: false },
    { name: 'Indie', selected: false },
    { name: 'Lo-Fi', selected: false },
    { name: 'Punk', selected: false }
  ];

  bookGenres = [
    { name: 'Fiction', selected: false },
    { name: 'Fantasy', selected: false },
    { name: 'Self-Help', selected: false },
    { name: 'Mystery', selected: false },
    { name: 'Biography', selected: false },
    { name: 'Sci-Fi', selected: false },
    { name: 'Non-Fiction', selected: false },
    { name: 'History', selected: false },
    { name: 'Graphic Novels', selected: false },
    { name: 'Action & Adventure', selected: false },
    { name: 'Thriller', selected: false }
  ];

  gameGenres = [
    { name: 'Board Games', selected: false },
    { name: 'Puzzle', selected: false },
    { name: 'Collaborative', selected: false },
    { name: 'Mystery', selected: false },
    { name: 'Competitive', selected: false },
    { name: 'Sci-Fi', selected: false },
    { name: 'Single Player', selected: false },
    { name: 'Trivia', selected: false },
    { name: 'Strategy', selected: false },
    { name: 'Interactive', selected: false },
    { name: 'Party', selected: false }
  ];

  favoriteMovies: string[] = [];
  favoriteMusic: string[] = [];
  favoriteBooks: string[] = [];
  favoriteGames: string[] = [];
  favoriteHobbies: string[] = [];

  movieText = '';
  musicText = '';
  bookText = '';
  gameText = '';
  hobbyText = '';

  isSaving = false;
  saveSuccess = false;
  saveError = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  addItem(text: string, list: string[]): void {
    if (text.trim()) {
      list.push(text.trim());
    }
  }

  async saveInterests(): Promise<void> {
    this.isSaving = true;
    this.saveSuccess = false;
    this.saveError = false;

    const userData = {
      movieGenres: this.movieGenres.filter(g => g.selected).map(g => g.name),
      favoriteMovies: this.favoriteMovies,
      musicGenres: this.musicGenres.filter(g => g.selected).map(g => g.name),
      favoriteMusic: this.favoriteMusic,
      bookGenres: this.bookGenres.filter(g => g.selected).map(g => g.name),
      favoriteBooks: this.favoriteBooks,
      gameGenres: this.gameGenres.filter(g => g.selected).map(g => g.name),
      favoriteGames: this.favoriteGames,
      favoriteHobbies: this.favoriteHobbies,
      createdAt: new Date()
    };

    try {
      const response = await this.http.post('https://localhost/api/user-interest', userData).toPromise();
      console.log('Saved successfully:', response);
      this.saveSuccess = true;
    } catch (error) {
      console.error('Save failed:', error);
      this.saveError = true;
    } finally {
      this.isSaving = false;
    }
  }
}
