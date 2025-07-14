

const os = require('os');

const config = {
  gcloud: {
    bucket: "fldemo-files",
    hash: "0e04196c45801fadef8897a844473fa7"
  },
  bcrypt: {
    saltRounds: 12
  },
  admin_pass: "a7823a02",
  user_pass: "e9e1dfda1e35",
  admin_email: "admin@flatlogic.com",
  providers: {
    LOCAL: 'local',
    GOOGLE: 'google',
    MICROSOFT: 'microsoft'
  },
  secret_key: process.env.SECRET_KEY || '',
  remote: '',
  port: process.env.NODE_ENV === "production" ? "" : "8080",
  hostUI: process.env.NODE_ENV === "production" ? "" : "http://localhost",
  portUI: process.env.NODE_ENV === "production" ? "" : "3000",
  portUIProd: process.env.NODE_ENV === "production" ? "" : ":3000",
  swaggerUI: process.env.NODE_ENV === "production" ? "" : "http://localhost",
  swaggerPort: process.env.NODE_ENV === "production" ? "" : ":8080",

  uploadDir: os.tmpdir(),
  email: {
    from: 'CV360 <app@flatlogic.app>',
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 587,
    auth: {
      user: process.env.EMAIL_USER || '',
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  },
  roles: {
    admin: 'Administrator',
    user: 'User',
  },

  project_uuid: 'a7823a02-0c3c-4f9b-ab5f-e9e1dfda1e35',
  flHost: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'dev_stage' ? 'https://flatlogic.com/projects' : 'http://localhost:3000/projects',

};

config.host = process.env.NODE_ENV === "production" ? config.remote : "http://localhost";
config.apiUrl = `${config.host}${config.port ? `:${config.port}` : ``}/api`;
config.swaggerUrl = `${config.swaggerUI}${config.swaggerPort}`;
config.uiUrl = `${config.hostUI}${config.portUI ? `:${config.portUI}` : ``}/#`;
config.backUrl = `${config.hostUI}${config.portUI ? `:${config.portUI}` : ``}`;

module.exports = config;
