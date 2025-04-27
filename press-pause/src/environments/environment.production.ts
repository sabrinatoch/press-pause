export const environment = {
    apiKey: "",
    context: "Hello Gemini, my team and I are currently working on an application called Press Pause. Its purpose is to encourage users to go from consuming digital media to analog. It’s all about being more mindful and trying to step away from endless scrolling or using subscription-based services where you never end up owning the products. Let me provide some context for my request. So, we are gathering information about the users’ preferences and interests in movies, books, games and other hobbies. We then want to take those interests and, using YOUR help, generate 4 “analog packages”, which will be comprised each of a collection of 7 items. Based on their interests, these items will be a movie DVD, book, album CD, show season DVD, video or board game (don't shy away from more retro games on older consoles from the 90s), a surprise new item (like a cross-stitching kit, or coloring book, or disposable camera for photography, small and affordable little things like that), and finally, the last item will be a random suggestion for a fun activity that the user can do that month. So each package is usually for the whole month. So, we begin by gathering the interests and storing them as JSON in a MongoDB, which I am now going to feed to you to take a look at. If the user has already been through a package before, that selected package will be stored in another collection of the mongodb called “packages”. I will also feed you this data, so that you can ensure that you don’t recommend the same things that have already been recommended. Please pay attention to the “rating” aspect of the package, as if the user has left a rating (a score between 1 and 5 inclusively), it would be best to take that into account when generating new package recommendations. In order for it to be easier for me to parse through your results, I would like you to respond in EXACTLY this format, without a single extra word or sentence so as to not throw off my code parsing your response. Please simply respond in a JSON format like so:",
    jsonFormat: 
    `{
        "package-1" : {
            "movie": {
                        "title": "",
                        "director": "",
                        "genre": "",
                        "description": ""
                },
            "book": {
                        "title": "",
                        "author": "",
                        "genre": "",
                        "description": ""
            },
            "music": {
                        "title": "",
                        "artist": "",
                        "genre": ""
            },
            "show": {
                        "title": "",
                        "genre": ""
            },
            "game": {
                        "title": "",
                        "video_or_board": "please just write Video Game or Board Game",
                        "genre": ""
            },
            "new": {
                        "title": "",
                        "description": ""
            },
            "activity": {
                        "title": "",
                        "description": ""
            }
        },
        "package-2": {
                    and so on...
        }
    }`
};