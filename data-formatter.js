let rawText = $input.first().json.content.parts[0].text;
let cleanText = rawText.replace(/```json/gi, "").replace(/```/gi, "").trim();
let parsedData = JSON.parse(cleanText);

let requests = [];

// 1. Add Summary
requests.push({
  "updateFormInfo": {
    "info": {
      "description": parsedData.summary
    },
    "updateMask": "description"
  }
});

// 2. Add MCQs
let index = 0;
parsedData.mcqs.forEach((mcq) => {
  let options = mcq.options.map(opt => ({ "value": opt }));
  
  requests.push({
    "createItem": {
      "item": {
        "title": mcq.question,
        "questionItem": {
          "question": {
            "required": true,
            "choiceQuestion": {
              "type": "RADIO",
              "options": options
            }
          }
        }
      },
      "location": {
        "index": index
      }
    }
  });
  index++;
});

return [{ json: { formRequests: requests } }];