class Usuario {
  constructor(nome, nascimento, email, senha, isAdmin = true) {
    this.nome = nome;
    this.nascimento = this.validarData(nascimento);
    this.email = this.validarEmail(email);
    this.userID = this.criaUserID(email);
    this.senha = this.validarSenha(senha);
    this.datacadastro = this.getData();
    this.isAdmin = isAdmin;
  }

  validarData(data) {
    if (!this.isDataValida(data)) {
      throw new Error("Data de nascimento inválida. Use o formato DD/MM/AAAA.");
    }
    return data;
  }

  isDataValida(data) {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(data)) {
      return false;
    }
    const [dia, mes, ano] = data.split("/");
    const dataObj = new Date(ano, mes - 1, dia);
    const dataValida =
      dataObj.getFullYear() == ano &&
      dataObj.getMonth() == mes - 1 &&
      dataObj.getDate() == dia;
    return dataValida;
  }

  criaUserID(email) {
    const encodedEmail = Buffer.from(email).toString("base64");
    return encodedEmail;
  }

  validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      throw new Error("Endereço de email inválido.");
    }
    return email;
  }

  validarSenha(senha) {
    if (!senha) {
      throw new Error("Campo senha é obrigatório!");
    }
    return senha;
  }

  getData() {
    const date = new Date();
    return date.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "numeric",
    });
  }
}

const user = new Usuario(
  "Lucas",
  "29/10/1992",
  "lucasrocha170@hotmail.com",
  "123456"
);

console.log(user);
