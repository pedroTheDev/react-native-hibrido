
<p align="center">
  <img alt="react-native-hi" src="./image/hi.png" width="208">
</p>
Bem vindo ao repositório do Aplicativo Hi!

#1: npm install



Esse aplicativo foi criado em React-Native utilizando React-Navigation.

As telas:

Pelo tamanho da aplicação as telas foram criadas dentro do App.js e elas são as 
seguintes:

SplashScreen : Essa tela serve como abertura para o aplicativo, mostrando sua marca 
estabelecendo um primeiro contato com o usuario. Essa SplashScreen pode ser avançada
quando se clica na logo ou esperando 2 segundos.

LoginScreen: Nessa tela o usuario deve inserir seu email. Caso tente entrar sem
fornecer essa informação um alerta irá disparar pedindo para inserir o email

ProfileScreen: Aqui será exibida uma imagem para o email e também o proprio email
que o usuario inseriu previamente. É exibido um botão que direciona o usuario ao 
Menu

MenuScreen: Aqui são apresentadas as opções que o usuario pode fazer. São exibidos 
4 botões, que são: Posts, Albums, Profile e Login

PostScreen: São mostrados os posts numerados de acordo com o id de cada post. Ao 
clicar no post são exibidas as informações como titulo, id e corpo (title, id, body)

AlbumScreen: São exibidos os Albums e ao clicar é exibido os detalhes titulo e id 
(title, id)

As requisições foram feitas utilizando Javascript Fetch.

