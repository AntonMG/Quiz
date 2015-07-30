// Definición del modelo del quiz

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Quiz',
      { pregunta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Pregunta"}}
      },
      respuesta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Respuesta"}}
      },
      categoria: {
        type: DataTypes.STRING,
	allowNull: false,
        validate: { 
	  notEmpty: {msg: "-> Falta Categoria"},
	  isIn: {
	    args: [['Otro', 'Ciencia', 'Humanidades', 'Ocio', 'Tecnologia']],
	    msg:  "Categoria incorrecta"
	  }
	}
      }      
    }
  );
}
