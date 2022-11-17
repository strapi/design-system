module.exports =
  process.env.IS_V2 === "true"
    ? [".DS_Store", "helpers", "hooks"]
    : [".DS_Store", "helpers", "hooks", "v2"];
