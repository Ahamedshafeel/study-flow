import express from "express";
import { exec } from "child_process";
import fs from "fs";
import path from "path";

const router = express.Router();

router.post("/run", (req, res) => {
  const { code, language } = req.body;

  // 🟢 JAVASCRIPT
  if (language === "javascript") {
    exec(`node -e "${code}"`, (err, stdout, stderr) => {
      if (err) return res.json({ output: stderr });
      res.json({ output: stdout });
    });
  }

  // 🔴 JAVA
  else if (language === "java") {
    const filePath = path.join(process.cwd(), "Main.java");

    try {
      // Save file
      fs.writeFileSync(filePath, code);

      // Compile + Run
      exec("javac Main.java && java Main", (err, stdout, stderr) => {
        if (err) {
          return res.json({ output: stderr });
        }

        res.json({ output: stdout });

        // Cleanup
        try {
          fs.unlinkSync("Main.java");
          if (fs.existsSync("Main.class")) {
            fs.unlinkSync("Main.class");
          }
        } catch (cleanupErr) {
          console.log("Cleanup error:", cleanupErr);
        }
      });

    } catch (error) {
      res.json({ output: "Error processing Java code" });
    }
  }

  else {
    res.json({ output: "Unsupported language" });
  }
});

export default router;