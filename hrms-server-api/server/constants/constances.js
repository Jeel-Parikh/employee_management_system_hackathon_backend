export var service = {}
// Local
console.log("env",process.env)
if (process.env.NODE_ENV == "development") {
    service.API_URL = "http://localhost:3001";

} 
else {
    service.API_URL = "https://api-hashtag.pyther.com/api/"
}