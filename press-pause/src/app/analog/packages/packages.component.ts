import { Component, NgModule } from '@angular/core';
import { GoogleGenAI } from '@google/genai';
import { environment } from '../../../environments/environment';
import { CommonModule, NgFor, NgForOf, NgIf } from '@angular/common';
import { LoadingComponent } from '../../loading/loading.component';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-packages',
  imports: [CommonModule, LoadingComponent],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css',
  standalone: true,
})
export class PackagesComponent {
 
  ai: GoogleGenAI;
  packages: Package[] = [];
  isLoading: boolean = false;
  apiUrl: string = 'http://localhost:3000/api';
    messageVisible: boolean;
    messageText: string;

  constructor(private http: HttpClient,
    private auth: AuthService) {
    
    this.ai = new GoogleGenAI({ 
      apiKey: environment.apiKey
    });
    this.messageVisible = false;
    this.messageText = '';

    
  }

  rating: number = 0;
selectedPackageName: string = 'example-package'; // Change dynamically as needed
packageRating: number = -1; // Initialize packageRating
ratePackage(star: number) {
    this.rating = star;
}

submitRating() {
    this.ratePackageBackend(this.selectedPackageName, this.rating);
}

savePackage(pkg: Package) {
  this.http.post(`${this.apiUrl}/selected-packages/full-package`, pkg)
    .subscribe({
      next: (response) => {
        console.log('Package saved successfully:', response);
        alert(`The full package "${pkg.name}" has been saved!`);
      },
      error: (error) => {
        console.error('Error saving package:', error);
        alert('Failed to save the package. Please try again.');
      }
    });
}

ratePackageBackend(packageName: string, rating: number) {
    console.log(`Rating package: ${packageName} with ${rating} stars`);

    this.packageRating = rating;
    return this.packageRating;
    this.http.post(`${this.apiUrl}/rate-package`, {
        packageName: packageName,
        rating: rating
    }).subscribe({
        next: (response) => {
            console.log(`Package ${packageName} rated successfully:`, response);
            alert(`You rated the package "${packageName}" with ${rating} stars!`);
        },
        error: (error) => {
            console.error(`Error rating package ${packageName}:`, error);
            alert(`Failed to rate the package "${packageName}". Please try again.`);
        }
    });
}

  selectPackage(selectedPackage: any) {
    console.log('Selected package:', selectedPackage);

    this.packages = [selectedPackage];
    this.messageVisible = true;
    this.messageText = `You have selected the package: ${selectedPackage.name}`;
    this.selectedPackageName = selectedPackage.name;


    // Show details or navigate
  }
  
  savePackageItem(item: any, category: string) {
    this.http.post(`${this.apiUrl}/selected-packages`, {
      item: item,
      category: category
    }).subscribe({
      next: (response) => {
        console.log(`${category} saved successfully:`, response);
        // Show a success message to the user
        alert(`${category} has been saved to your collection!`);
      },
      error: (error) => {
        console.error(`Error saving ${category}:`, error);
        // Show an error message to the user
        alert(`Failed to save ${category}. Please try again.`);
      }
    });
  }

  async generatePackages() {
    this.isLoading = true;
    this.messageVisible = false;
    const request: string = environment.context + " " + environment.jsonFormat;
    try {
      // Step 1: Call to Gemini AI to generate content
      const response = await this.ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: "*For now I have no test data, so given this prompt, please just generate RANDOM results for me to test. Thank you!" + request,
      });
  
      console.log('Gemini AI response:', response.text);
      let cleanedResponse = response.text || '';
      const jsonMatch = cleanedResponse.match(/```(?:json)?\s*([\s\S]*?)```/);
      
      if (jsonMatch && jsonMatch[1]) {
        cleanedResponse = jsonMatch[1].trim();
      }
  
      // Step 2: Parse the generated content
      const parsedData = JSON.parse(cleanedResponse);
      this.packages = Object.keys(parsedData).map(key => {
        return {
          name: key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          ...parsedData[key]
        };
      });
  
    } catch (error) {
      console.error('Error generating packages or retrieving images:', error);
    }
    
    this.isLoading = false;
  }
}

interface Package {
  name: string;
  movie: any;
  book: any;
  music: any;
  show: any;
  game: any;
  new: any;
  activity: any;
}