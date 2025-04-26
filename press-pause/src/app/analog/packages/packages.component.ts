import { Component, NgModule } from '@angular/core';
import { GoogleGenAI } from '@google/genai';
import { environment } from '../../../environments/environment';
import { CommonModule, NgFor, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-packages',
  imports: [CommonModule],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css',
  // standalone: true,
})
export class PackagesComponent {

  ai: GoogleGenAI;
  packages: Package[] = [];

  packageData = {
    "package-1": {
        "movie": {
            "title": "The Grand Budapest Hotel",
            "director": "Wes Anderson",
            "genre": "Comedy",
            "description": "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
            "links": ["https://www.amazon.com/Grand-Budapest-Hotel-Blu-ray-Combo/dp/B00JVF4J3E", ""],
            "image_link": "https://m.media-amazon.com/images/I/81sJp4t8J1L._AC_UF894,1000_QL80_.jpg"
        },
        "book": {
            "title": "Pride and Prejudice",
            "author": "Jane Austen",
            "genre": "Romance",
            "description": "A classic novel exploring the societal pressures and romantic entanglements of 19th-century England.",
            "links": ["https://www.amazon.com/Pride-Prejudice-Penguin-Classics-Austen/dp/0141439518", ""],
            "image_link": "https://m.media-amazon.com/images/I/71Q1K3Y3GQL._AC_UF1000,1000_QL80_.jpg"
        },
        "music": {
            "title": "Rumours",
            "artist": "Fleetwood Mac",
            "genre": "Rock",
            "links": ["https://www.amazon.com/Rumours-Fleetwood-Mac/dp/B000002N5K", ""],
            "image_link": "https://m.media-amazon.com/images/I/81wE6S3U44L._UF1000,1000_QL80_.jpg"
        },
        "show": {
            "title": "The Queen's Gambit",
            "genre": "Drama",
            "links": ["https://www.amazon.com/Queens-Gambit-Limited-Anya-Taylor-Joy/dp/B08KTSJ88F", ""],
            "image_link": "https://m.media-amazon.com/images/I/81dJ30rqwML._AC_UF1000,1000_QL80_.jpg"
        },
        "game": {
            "title": "Catan",
            "video_or_board": "Board Game",
            "genre": "Strategy",
            "links": ["https://www.amazon.com/CATAN-Board-Game-Base-Set/dp/B000W7JWUA", ""],
            "image_link": "https://m.media-amazon.com/images/I/81sJ2bY9iRL._AC_UF1000,1000_QL80_.jpg"
        },
        "new": {
            "title": "Watercolor Paint Set",
            "description": "A set of watercolor paints, brushes, and paper for artistic expression.",
            "links": ["https://www.amazon.com/Watercolor-Professional-Watercolors-Beginners-Artist/dp/B094G97X49", ""],
            "image_link": "https://m.media-amazon.com/images/I/71mD4y4CURL._AC_UF1000,1000_QL80_.jpg"
        },
        "activity": {
            "title": "Go Stargazing",
            "description": "Find a dark spot away from city lights and enjoy the beauty of the night sky.",
            "image_link": "https://www.rmg.co.uk/sites/default/files/styles/full_width_840/public/Star-gazing.jpg?itok=aK_z_W1t"
        }
    },
    "package-2": {
        "movie": {
            "title": "Spirited Away",
            "director": "Hayao Miyazaki",
            "genre": "Animation",
            "description": "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
            "links": ["https://www.amazon.com/Spirited-Away-Blu-ray-Digital-Combo/dp/B002LASZRI", ""],
            "image_link": "https://m.media-amazon.com/images/I/91L0T6E74XL._AC_UF894,1000_QL80_.jpg"
        },
        "book": {
            "title": "The Hobbit",
            "author": "J.R.R. Tolkien",
            "genre": "Fantasy",
            "description": "Bilbo Baggins is swept into a quest to reclaim the dwarves' treasure from the dragon Smaug.",
            "links": ["https://www.amazon.com/Hobbit-J-R-R-Tolkien/dp/054792822X", ""],
            "image_link": "https://m.media-amazon.com/images/I/71F90v2eSCL._AC_UF1000,1000_QL80_.jpg"
        },
        "music": {
            "title": "Thriller",
            "artist": "Michael Jackson",
            "genre": "Pop",
            "links": ["https://www.amazon.com/Thriller-Michael-Jackson/dp/B00000251M", ""],
            "image_link": "https://m.media-amazon.com/images/I/517s1w-FkSL._UF1000,1000_QL80_.jpg"
        },
        "show": {
            "title": "Sherlock",
            "genre": "Mystery",
            "links": ["https://www.amazon.com/Sherlock-Season-1-Benedict-Cumberbatch/dp/B004ULYQ8I", ""],
            "image_link": "https://m.media-amazon.com/images/I/81W7W7y9nQL._AC_UF1000,1000_QL80_.jpg"
        },
        "game": {
            "title": "The Legend of Zelda: Breath of the Wild",
            "video_or_board": "Video Game",
            "genre": "Action-Adventure",
            "links": ["https://www.amazon.com/Legend-Zelda-Breath-Wild-Nintendo-Switch/dp/B01MS6MO77", ""],
            "image_link": "https://m.media-amazon.com/images/I/9146vY-DOwL._AC_UF1000,1000_QL80_.jpg"
        },
        "new": {
            "title": "Cross-Stitch Kit",
            "description": "A beginner-friendly cross-stitch kit with a simple pattern and all necessary materials.",
            "links": ["https://www.amazon.com/Embroidery-Beginner-Cross-Stitch-Christmas/dp/B09WJ6V75S", ""],
            "image_link": "https://m.media-amazon.com/images/I/71mQ4Uf0iVL._AC_UF1000,1000_QL80_.jpg"
        },
        "activity": {
            "title": "Visit a Local Farmers Market",
            "description": "Explore local produce, crafts, and support your community by visiting a nearby farmers market.",
            "image_link": "https://www.farmersmarketcoalition.org/wp-content/uploads/2023/08/shutterstock_1886577890.jpg"
        }
    },
    "package-3": {
        "movie": {
            "title": "Amélie",
            "director": "Jean-Pierre Jeunet",
            "genre": "Romantic Comedy",
            "description": "Amélie, an introverted waitress in Montmartre, decides to spread joy and intervene in the lives of others.",
            "links": ["https://www.amazon.com/Amelie-Audrey-Tautou/dp/B00005JM5G", ""],
            "image_link": "https://m.media-amazon.com/images/I/51sQ15U15YL._AC_UF894,1000_QL80_.jpg"
        },
        "book": {
            "title": "The Secret Garden",
            "author": "Frances Hodgson Burnett",
            "genre": "Children's Literature",
            "description": "A young, orphaned girl discovers a hidden garden in her uncle's estate and brings it back to life.",
            "links": ["https://www.amazon.com/Secret-Garden-Frances-Hodgson-Burnett/dp/1503202662", ""],
            "image_link": "https://m.media-amazon.com/images/I/71G44B841ML._AC_UF1000,1000_QL80_.jpg"
        },
        "music": {
            "title": "Blue",
            "artist": "Joni Mitchell",
            "genre": "Folk",
            "links": ["https://www.amazon.com/Blue-Joni-Mitchell/dp/B000002W5K", ""],
            "image_link": "https://m.media-amazon.com/images/I/71cT86Nq68L._UF1000,1000_QL80_.jpg"
        },
        "show": {
            "title": "Parks and Recreation",
            "genre": "Comedy",
            "links": ["https://www.amazon.com/Parks-Recreation-Season-1/dp/B002G9X94M", ""],
            "image_link": "https://m.media-amazon.com/images/I/81-H62Vd4AL._AC_UF1000,1000_QL80_.jpg"
        },
        "game": {
            "title": "Stardew Valley",
            "video_or_board": "Video Game",
            "genre": "Simulation",
            "links": ["https://www.amazon.com/Stardew-Valley-Nintendo-Switch/dp/B071DWK7GG", ""],
            "image_link": "https://m.media-amazon.com/images/I/71U5J8Q502L._AC_UF1000,1000_QL80_.jpg"
        },
        "new": {
            "title": "Disposable Camera",
            "description": "A simple disposable camera for capturing memories in a nostalgic way.",
            "links": ["https://www.amazon.com/Kodak-FunSaver-Single-Use-Camera/dp/B07216759V", ""],
            "image_link": "https://m.media-amazon.com/images/I/81d-qWk660L._AC_UF1000,1000_QL80_.jpg"
        },
        "activity": {
            "title": "Try a New Recipe",
            "description": "Find a new recipe online or in a cookbook and challenge yourself to create something delicious.",
            "image_link": "https://static.onecms.io/wp-content/uploads/sites/9/2021/09/24/new-recipes-FT-BLOG0921.jpg"
        }
    },
    "package-4": {
        "movie": {
            "title": "Singin' in the Rain",
            "director": "Stanley Donen, Gene Kelly",
            "genre": "Musical",
            "description": "A silent film star falls for a chorus girl just as talkies are on the rise.",
            "links": ["https://www.amazon.com/Singin-Rain-Special-Collectors-Anniversary/dp/B00005Y77F", ""],
            "image_link": "https://m.media-amazon.com/images/I/911H2oFp9QL._AC_UF894,1000_QL80_.jpg"
        },
        "book": {
            "title": "To Kill a Mockingbird",
            "author": "Harper Lee",
            "genre": "Classic Literature",
            "description": "Through the eyes of a young girl, explore themes of justice and prejudice in the American South.",
            "links": ["https://www.amazon.com/Kill-Mockingbird-Harper-Lee/dp/0446310786", ""],
            "image_link": "https://m.media-amazon.com/images/I/81GeK7wImvL._AC_UF1000,1000_QL80_.jpg"
        },
        "music": {
            "title": "Kind of Blue",
            "artist": "Miles Davis",
            "genre": "Jazz",
            "links": ["https://www.amazon.com/Kind-Blue-Miles-Davis/dp/B000002A62", ""],
            "image_link": "https://m.media-amazon.com/images/I/81qWJmuT4qL._UF1000,1000_QL80_.jpg"
        },
        "show": {
            "title": "The Twilight Zone",
            "genre": "Science Fiction",
            "links": ["https://www.amazon.com/Twilight-Zone-Complete-Series-Blu-ray/dp/B08924T27X", ""],
            "image_link": "https://m.media-amazon.com/images/I/81aXUvD2PjL._AC_UF1000,1000_QL80_.jpg"
        },
        "game": {
            "title": "Ticket to Ride",
            "video_or_board": "Board Game",
            "genre": "Strategy",
            "links": ["https://www.amazon.com/Days-of-Wonder-DOW7201-Ticket/dp/B000J0W0CG", ""],
            "image_link": "https://m.media-amazon.com/images/I/91pRsxWqMLL._AC_UF1000,1000_QL80_.jpg"
        },
        "new": {
            "title": "Adult Coloring Book",
            "description": "A coloring book with intricate designs to help relax and de-stress.",
            "links": ["https://www.amazon.com/Adult-Coloring-Book-Stress-Relieving/dp/1537101092", ""],
            "image_link": "https://m.media-amazon.com/images/I/81Sqt8IuYUL._AC_UF1000,1000_QL80_.jpg"
        },
        "activity": {
            "title": "Write a Letter to a Friend",
            "description": "Take the time to handwrite a letter to a friend or family member and brighten their day.",
            "image_link": "https://assets.aboutkidshealth.ca/image/c9ffb838-572b-42ca-8ac6-ad2901250f31"
        }
    }
}

  constructor() {
    this.packages = [
      { name: 'Package 1', ...this.packageData['package-1'] },
      { name: 'Package 2', ...this.packageData['package-2'] },
      { name: 'Package 3', ...this.packageData['package-3'] },
      { name: 'Package 4', ...this.packageData['package-4'] }
    ];

    this.ai = new GoogleGenAI({ 
      apiKey: environment.apiKey
    });
  }

  viewPackageDetails(selectedPackage: any) {
    console.log('Selected package:', selectedPackage);
    // Navigate or display more info
  }

  async generatePackages() {

    // context for the prompt
    const request: string = environment.context + " " + environment.jsonFormat;

    // grab user data from mongo
    const userData: string = "";

    // grab packages associated with user (match user id) in mongo
    const packageData: string = "";

    // api call
    const response = await this.ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "*For now I have no test data, so given this prompt, please just generate RANDOM results for me to test. Thank you!" + request,
    });

    console.log(response.text);
    let cleanedResponse = response.text || '';
  
    // More robust regex to extract JSON content from markdown code blocks
    const jsonMatch = cleanedResponse.match(/```(?:json)?\s*([\s\S]*?)```/);
    
    if (jsonMatch && jsonMatch[1]) {
      // Extract the content between the backticks
      cleanedResponse = jsonMatch[1].trim();
    }

    // Now safely parse the cleaned response
    try {
      const parsedData = JSON.parse(cleanedResponse);
      
      // Transform the parsed data into your Package interface format
      this.packages = Object.keys(parsedData).map(key => {
        return {
          name: key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          ...parsedData[key]
        };
      });
    } catch (error) {
      console.error('Failed to parse the response:', error);
      console.log('Raw response:', cleanedResponse);
      this.packages = [];  // Fallback to an empty array on parse error
    }
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