import { Component, NgModule } from '@angular/core';
import { GoogleGenAI } from '@google/genai';
import { environment } from '../../../environments/environment';
import { CommonModule, NgFor, NgForOf, NgIf } from '@angular/common';
import { LoadingComponent } from '../../loading/loading.component';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
  apiUrl: string = 'http://localhost:3000/api'; // Update this with your actual API URL

  constructor(private http: HttpClient) {
    this.ai = new GoogleGenAI({ 
      apiKey: environment.apiKey
    });
  }

  selectPackage(selectedPackage: any) {
    console.log('Selected package:', selectedPackage);
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
  
    //   // Step 3: Iterate through each package and each item (movie, book, etc.)
    //   for (let pkg of this.packages) {
    //     for (let key of ['movie', 'book', 'music', 'show', 'game', 'new', 'activity']) {
    //       // Fixed error by properly checking if pkg[key] exists before accessing its properties
    //       if ((pkg as any)[key] && typeof (pkg as any)[key] === 'object' && (pkg as any)[key].hasOwnProperty('title')) {
    //         const title = (pkg as any)[key].title;
    //         // Construct the query: "Hitch movie", "Harry Potter book", etc.
    //         const query = `${title} ${key}`;
    //         var queryWithPlus = query;
  
    //         if (title) {
    //           try {
    //             // Manually replace spaces with '+' in the query before encoding
    //             const queryWithPlus = query.replace(/ /g, '+');
  
    //             // Fetch the image from the image retrieval API
    //             const imageResponse = await firstValueFrom(this.http.get<any[]>(
    //               `http://localhost:3000/api/image-retrieval/retrieve?id=${queryWithPlus}`
    //             ));
    //             console.log(`Image response for ${queryWithPlus}:`, imageResponse);
  
    //             // Process the response
    //             if (imageResponse && imageResponse.length > 0) {
    //               // Set the image_link to the URL
    //               (pkg as any)[key].image_link = imageResponse[0].urls?.regular || imageResponse[0].urls?.raw || '';
                  
    //               // Add a smaller version for thumbnails if needed
    //               (pkg as any)[key].thumbnail = imageResponse[0].urls?.thumb || '';
    //             } else {
    //               console.warn(`No image found for ${queryWithPlus}, skipping...`);
    //             }
    //           } catch (error) {
    //             // If image retrieval fails, just log the error and continue to the next item
    //             console.error(`Error retrieving image for ${queryWithPlus}:`, error);
    //           }
    //         }
    //       }
    //     }
    //   }
  
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