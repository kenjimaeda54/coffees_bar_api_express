import app from "./app";
import { Constants } from "./src/utils/Constants";

app.listen(3000, () => {
  console.log("Server started on port 3000");
  console.log(`Clicked,${Constants.baseUrl}`);
});
