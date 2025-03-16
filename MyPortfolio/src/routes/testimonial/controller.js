import parentcontroller from "../controller.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default new (class extends parentcontroller {
    async createTestimonial(req,res){

    }
})();
