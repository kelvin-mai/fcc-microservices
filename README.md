# freeCodeCamp API Microservices

A Collection of all the freeCodeCamp Microservice exercises

## User Stories

### Timestamp

* I can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016).
* If it does, it returns both the Unix timestamp and the natural language form of that date.
* If it does not contain a date or Unix timestamp, it returns null for those properties.

### Request Header Parser

* I can get the IP address, language and operating system for my browser.

### URL Shortener

* I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
* If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
* When I visit that shortened URL, it will redirect me to my original link.

### File Metadata

* I can submit a FormData object that includes a file upload.
* When I submit something, I will receive the file size in bytes within the JSON response
