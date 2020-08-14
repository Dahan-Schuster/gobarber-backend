# Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando seu email;
- O usuário deve receber um email com instruções de recuperação de senha;
- O usuário deve poder alterar sua senha;

**RNF**

- Utilizar Mailtrap para testar envio de emails em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de emails deve acontecer em segundo plano (background job);

**RN**

- O link enviado por email para recuperar senha, deve expirar em 2h;
- O usuário precisar confirmar a nova senha;

# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha;

**RN**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário deve confirmá-la;

# Painel do provedor

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não visualizadas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo real com o SocketIO;

**RN**

- A notificação deve ter um estado de lida ou não lida para que o prestador possa controlar;

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias e horários disponíveis do prestador em um mês;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h;
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviço consigo mesmo;
