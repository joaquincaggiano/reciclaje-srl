import axios from "axios";
import { APIRoute, sanitizeKey } from "next-s3-upload";

export default APIRoute.configure({
  async key(req, filename) {
    let path = await axios.get('/api/uploadsRoutes');
    return `${path}/${sanitizeKey(filename)}`;
  }
});