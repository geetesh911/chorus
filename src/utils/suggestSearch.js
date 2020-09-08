import axios from "axios";
//  

export default axios.create({
  baseURL: "https://suggestqueries.google.com/complete/search",
  //   adapter: jsonpAdapter,
});
