const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
   const { authorization } = req.headers;

   try {
      const token = authorization.split(" ")[1];
      const payload = jwt.verify(
        token, 
        process.env.JWT_SEGREDO
      );
      req.payload = payload;
      return next();
   } catch (err) {
      res.status(401).json({msg: "Token invalido "});
   }
}

function gerarToken(payload) {
  try {
    const expressIn = 30;
    const token = jwt.sign(
        payload, 
        process.env.JWT_SEGREDO,
        { expressIn}
    );
    return token;
  } catch (err) {
    throw Error("Erro ao gerar token");
  }
}

module.exports = { verificarToken, gerarToken };
