const bcrypt = require("bcryptjs");

(async () => {
  const plain = "12345678";
  const hash = "$2b$10$LIW4flmu0m2GXS4Uf29WrOzSc7RbRDQstdw5czhRl7AJ5cHlc4YcK";

  const result = await bcrypt.compare(plain, hash);
  console.log("Match?", result);
})();
