const fs = require("fs");
const path = require("path");

const raw = fs.readFileSync(path.join(__dirname, "emoji-test.txt"), "utf8");

const data = [];

for (const line of raw.split(/[\r\n]+/)) {
  if (!line || line.startsWith("#")) {
    continue;
  }
  const pos1 = line.indexOf(";");
  const pos2 = line.indexOf("#", pos1);
  const pos3 = line.indexOf("E", pos2);
  const pos4 = line.indexOf(" ", pos3);
  if ([pos1, pos2, pos3, pos4].includes(-1)) {
    continue;
  }
  const codePoints = line.slice(0, pos1).trim().split(/\s+/).map(cp => Number.parseInt(cp, 16));
  const qualification = line.slice(pos1 + 1, pos2).trim();
  const description = line.slice(pos4).trim();
  if (qualification !== "fully-qualified") {
    continue;
  }
  data.push({
    codePoints,
    description,
  });
}

fs.writeFileSync(path.join(__dirname, "data.json"), JSON.stringify(data, null, 2));
