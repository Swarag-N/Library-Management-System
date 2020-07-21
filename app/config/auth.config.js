const AUTH = {
  SALT_ROUNDS: process.env.SALT_ROUNDS || 13,
  JWT_PK: process.env.JWT_PK ||'This is a secret thqt you dont know',
};

module.exports =AUTH;
