module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ["airbnb-base", "prettier"],
  plugins: ["prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    //desabilitando a validação do this ao invocar metodos
    "class-methods-use-this": "off",
    //receba um parametro e posso manipular ele
    "no-param-reassign": "off",
    //desobriga que o nome da variavel siga o padrao js
    //que é variavelGrande (com G maiusculo)
    camelcase: "off",
    //regra desabilita a critica a variavel não utilizada
    //no caso a next(que fica dentro dos middewares). o modulo não criticará erro.
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    //toda a anomalia que o prettier acusar tera retorno de erro.
    "prettier/prettier": "error"
  }
};
