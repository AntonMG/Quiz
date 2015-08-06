var models = require('../models/models.js');

//GET /quizes/statistics
exports.calculate = function(req, res){
  var estadisticas = {
    numPreguntas: 0,
    numComentarios: 0,
    numMedioComentarios: 0,
    numPreguntasNoComentarios: 0,
    numPreguntasComentarios: 0
  };
  
  models.Quiz.count()
  .then( function(total) { 
    estadisticas.numPreguntas = total || 0;
    models.Quiz.count({distinct: 'Quiz.id', include: [{model: models.Comment, required: true}]})
    .then(function(total) { 
      estadisticas.numPreguntasComentarios = total || 0;
      models.Comment.count()
      .then(function(total) {
	estadisticas.numComentarios = total || 0;
	estadisticas.numPreguntasNoComentarios = estadisticas.numPreguntas - estadisticas.numPreguntasComentarios;
	estadisticas.numMedioComentarios = (estadisticas.numComentarios / (estadisticas.numPreguntas || 1)).toFixed(1);	
      })
      .then( function() {
	//console.log(JSON.stringify(estadisticas));
	res.render('quizes/statistics', {estadisticas: estadisticas, errors: []});
      });
    })
  }).catch( function(error){ 
    res.render('quizes/statistics', {estadisticas: estadisticas, errors: [error]});
  });
}; 
