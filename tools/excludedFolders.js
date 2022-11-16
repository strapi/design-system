module.exports =
  process.env.IS_V2 === "true"
    ? ["helpers", "hooks", ".DS_Store"]
    : ["helpers", ".DS_Store", "v2", "hooks"];
