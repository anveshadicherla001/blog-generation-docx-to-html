const express = require('express');
const app = express();
const port = 3050;
const mammoth = require("@mtamayo/mammoth");
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question1 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Provide Blog Url Slug-> Eg) test-blog :', (blogUrl) => {
      resolve(blogUrl);
    });
  });
};

const question2 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Provide Blog Category-> Eg) Test Category :', (blogUrl) => {
      resolve(blogUrl);
    });
  });
};

const question3 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Provide Blog Title-> Eg) Blog Title :', (blogTitle) => {
      resolve(blogTitle);
    });
  });
};

const question4 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Provide Blog Keywords: Eg) blog,fun,movies :', (blogKeywords) => {
      resolve(blogKeywords);
    });
  });
};

const question5 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Provide Blog Description: Eg) Excerpt (1-2 lines) :', (blogDescription) => {
      resolve(blogDescription);
    });
  });
};

const question6 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Provide Document File Name: Eg) test-document.docx :', (fileName) => {
      resolve(fileName);
    });
  });
};

const main = async () => {
  const blogUrl = await question1();
  const blogCategory = await question2();
  const blogTitle = await question3();
  const blogKeywords = await question4();
  const blogDescription = await question5();
  const fileName = await question6();
  const filePath = `blog-documents/${fileName}`;

  try {
    const result = await mammoth.convertToHtml({ path: filePath });
    const html = result.value; // The generated HTML
    const messages = result.messages; // Any messages, such as warnings during conversion
    const responseObject = {
      html: html,
      category: blogCategory,
      title: blogTitle,
      keywords: blogKeywords,
      description: blogDescription,
      urlSlug: blogUrl
    };
    console.log("Messages:", messages);
    console.log("Done, You've successfully generated Blog 🎉 !");
    rl.close();
    return responseObject;
  } catch (error) {
    console.error("Error converting file:", error);
    rl.close();
    return { error: "Error converting file" };
  }
};

app.get('/', async (req, res) => {
  try {
    const response = await main();
    return res.type('json').send(JSON.stringify(response, null, 2) + '\n');
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Blog Generation Docx-to-Html App listening on port ${port}`);
});