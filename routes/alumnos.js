//File: routes/alumnos.js
module.exports = function(app) {

	var Alumno = require('../models/alumno.js');
  
	//GET - Return all alumnos in the DB
	findAllAlumnos = function(req, res) {
		Alumno.find(function(err, alumnos) {
			if(!err) {
		  console.log('GET /alumnos')
				res.send(alumnos);
			} else {
				console.log('ERROR: ' + err);
			}
		});
	};
  
	//GET - Return a Alumno with specified ID
	findById = function(req, res) {
		Alumno.findById(req.params.id, function(err, alumno) {
			if(!err) {
		  console.log('GET /alumno/' + req.params.id);
				res.send(alumno);
			} else {
				console.log('ERROR: ' + err);
			}
		});
	};
  
	//POST - Insert a new Alumno in the DB
	addAlumno = function(req, res) {
		console.log('POST');
		console.log(req.body);
  
		var alumno = new Alumno({
			dni:    	req.body.dni,
			nombre: 	req.body.nombre,
			apellido:  	req.body.apellido,
			mail:	    req.body.mail,
		  	password:   req.body.password
			
		});
  
		alumno.save(function(err) {
			if(!err) {
				console.log('Created');
			} else {
				console.log('ERROR: ' + err);
			}
		});
  
		res.send(alumno);
	};
  
	//PUT - Update a register already exists
	updateAlumno = function(req, res) {
		Alumno.findById(req.params.id, function(err, alumno) {
			alumno.dni   	= req.body.petId;
			alumno.nombre   = req.body.nombre;
			alumno.apellido = req.body.apellido;
			alumno.mail  	= req.body.mail;
			alumno.password = req.body.password;
			
			alumno.save(function(err) {
				if(!err) {
					console.log('Updated');
				} else {
					console.log('ERROR: ' + err);
				}
				res.send(alumno);
			});
		});
	}
  
	//DELETE - Delete a Alumno with specified ID
	deleteAlumno = function(req, res) {
		Alumno.findById(req.params.id, function(err, alumno) {
			alumno.remove(function(err) {
				if(!err) {
					console.log('Removed');
					res.status(200).send('usuario eliminado')
				} else {
					console.log('ERROR: ' + err);
				}
			})
		});
	}
  
  
	singIn = async function(req, res){
  
		const { mail, password } = req.body;
		console.log('pas: ' + password)
		await Alumno.findOne({mail}, function (err, docs) { 
		  if (err){ 
			  console.log('ERROR: '+ err) ;
			  return res.status(401).send('usuario incorrecto')
		  } 
		  else{ 
			  console.log("pass: ", docs.password);
			  if (docs.password !==password) return res.status(401).send('Contraseña incorrecta');
			  console.log("id : ", docs._id); 
			  return res.status(200).send(docs._id)
		  } 
	  });
	  
	}
  
  
  //   var Materia = require('../models/materia.js');
  
  //   //GET - Return all materias in the DB
  //   findAllMaterias = function(req, res) {
  //   	Materia.find(function(err, materias) {
  //   		if(!err) {
  //         console.log('GET /materias')
  //   			res.send(materias);
  //   		} else {
  //   			console.log('ERROR: ' + err);
  //   		}
  //   	});
  //   };
  
  //   //GET - Return a Materia with specified ID
  //   findById = function(req, res) {
  //   	Materia.findById(req.params.id, function(err, materia) {
  //   		if(!err) {
  //         console.log('GET /materia/' + req.params.id);
  //   			res.send(materia);
  //   		} else {
  //   			console.log('ERROR: ' + err);
  //   		}
  //   	});
  //   };
  
  //   //POST - Insert a new Materia in the DB
  //   addMateria = function(req, res) {
  //   	console.log('POST');
  //   	console.log(req.body);
  
  //   	var materia = new Materia({
  //   		id:    		req.body.id,
  //   		nombre: 	req.body.nombre
  //  	});
  
  //   	materia.save(function(err) {
  //   		if(!err) {
  //   			console.log('Created');
  //   		} else {
  //   			console.log('ERROR: ' + err);
  //   		}
  //   	});
  
  //   	res.send(materia);
  //   };
  
  //   //PUT - Update a register already exists
  //   updateMateria = function(req, res) {
  //   	Materia.findById(req.params.id, function(err, materia) {
  //   		materia.id   	= req.body.petId;
  //   		materia.nombre   = req.body.nombre;
  
			
  //   		materia.save(function(err) {
  //   			if(!err) {
  //   				console.log('Updated');
  //   			} else {
  //   				console.log('ERROR: ' + err);
  //   			}
  //   			res.send(materia);
  //   		});
  //   	});
  //   }
  
  //   //DELETE - Delete a Materia with specified ID
  //   deleteMateria = function(req, res) {
  //   	Materia.findById(req.params.id, function(err, materia) {
  //   		materia.remove(function(err) {
  //   			if(!err) {
  //   				console.log('Removed');
  //   			} else {
  //   				console.log('ERROR: ' + err);
  //   			}
  //   		})
  //   	});
  //   }
  
  
  //   var Comision = require('../models/comision.js');
  
  //   //GET - Return all comisiones in the DB
  //   findAllComisions = function(req, res) {
  //   	Comision.find(function(err, comisiones) {
  //   		if(!err) {
  //         console.log('GET /comisiones')
  //   			res.send(comisiones);
  //   		} else {
  //   			console.log('ERROR: ' + err);
  //   		}
  //   	});
  //   };
  
  //   //GET - Return a Comision with specified ID
  //   findById = function(req, res) {
  //   	Comision.findById(req.params.id, function(err, comision) {
  //   		if(!err) {
  //         console.log('GET /comision/' + req.params.id);
  //   			res.send(comision);
  //   		} else {
  //   			console.log('ERROR: ' + err);
  //   		}
  //   	});
  //   };
  
  //   //POST - Insert a new Comision in the DB
  //   addComision = function(req, res) {
  //   	console.log('POST');
  //   	console.log(req.body);
  
  //   	var comision = new Comision({
  //   		id:    			req.body.id,
  // 		nombre: 		req.body.nombre,
  // 		clasesTotales: 	req.body.clasesTotales  
  //  	});
  
  //   	comision.save(function(err) {
  //   		if(!err) {
  //   			console.log('Created');
  //   		} else {
  //   			console.log('ERROR: ' + err);
  //   		}
  //   	});
  
  //   	res.send(comision);
  //   };
  
  //   //PUT - Update a register already exists
  //   updateComision = function(req, res) {
  //   	Comision.findById(req.params.id, function(err, comision) {
  //   		comision.id			   	 = req.body.petId;
  // 		comision.nombre   		 = req.body.nombre;
  // 		comision.clasesTotales   = req.body.clasesTotales;  
  
			
  //   		comision.save(function(err) {
  //   			if(!err) {
  //   				console.log('Updated');
  //   			} else {
  //   				console.log('ERROR: ' + err);
  //   			}
  //   			res.send(comision);
  //   		});
  //   	});
  //   }
  
  //   //DELETE - Delete a Comision with specified ID
  //   deleteComision = function(req, res) {
  //   	Comision.findById(req.params.id, function(err, comision) {
  //   		comision.remove(function(err) {
  //   			if(!err) {
  //   				console.log('Removed');
  //   			} else {
  //   				console.log('ERROR: ' + err);
  //   			}
  //   		})
  //   	});
  //   }
  
  //   var Clase = require('../models/clase.js');
  
  //   //GET - Return all clases in the DB
  //   findAllClases = function(req, res) {
  //   	Clase.find(function(err, clases) {
  //   		if(!err) {
  //         console.log('GET /clases')
  //   			res.send(clases);
  //   		} else {
  //   			console.log('ERROR: ' + err);
  //   		}
  //   	});
  //   };
  
  //   //GET - Return a Clase with specified ID
  //   findById = function(req, res) {
  //   	Clase.findById(req.params.id, function(err, clase) {
  //   		if(!err) {
  //         console.log('GET /clase/' + req.params.id);
  //   			res.send(clase);
  //   		} else {
  //   			console.log('ERROR: ' + err);
  //   		}
  //   	});
  //   };
  
  //   //POST - Insert a new Clase in the DB
  //   addClase = function(req, res) {
  //   	console.log('POST');
  //   	console.log(req.body);
  
  //   	var clase = new Clase({
  //   		id:    		req.body.id,
  // 		dia:	 	req.body.dia,
  // 		hora: 		req.body.hora,
  // 		aula:	 	req.body.aula
  //  	});
  
  //   	clase.save(function(err) {
  //   		if(!err) {
  //   			console.log('Created');
  //   		} else {
  //   			console.log('ERROR: ' + err);
  //   		}
  //   	});
  
  //   	res.send(clase);
  //   };
  
  //   //PUT - Update a register already exists
  //   updateClase = function(req, res) {
  //   	Clase.findById(req.params.id, function(err, clase) {
  //   		clase.id   	 = req.body.petId;
  //   		clase.dia 	 = req.body.dia;
  // 		clase.hora   = req.body.hora;
  //   		clase.aula   = req.body.aula;
			
  //   		clase.save(function(err) {
  //   			if(!err) {
  //   				console.log('Updated');
  //   			} else {
  //   				console.log('ERROR: ' + err);
  //   			}
  //   			res.send(clase);
  //   		});
  //   	});
  //   }
  
  //   //DELETE - Delete a Clase with specified ID
  //   deleteClase = function(req, res) {
  //   	Clase.findById(req.params.id, function(err, clase) {
  //   		clase.remove(function(err) {
  //   			if(!err) {
  //   				console.log('Removed');
  //   			} else {
  //   				console.log('ERROR: ' + err);
  //   			}
  //   		})
  //   	});
  //   }
  
  //   var Profesor = require('../models/profesor.js');
  
  //   //GET - Return all profesores in the DB
  //   findAllProfesores = function(req, res) {
  //   	Profesor.find(function(err, profesores) {
  //   		if(!err) {
  //         console.log('GET /profesores')
  //   			res.send(profesores);
  //   		} else {
  //   			console.log('ERROR: ' + err);
  //   		}
  //   	});
  //   };
  
  //   //GET - Return a Profesor with specified ID
  //   findById = function(req, res) {
  //   	Profesor.findById(req.params.id, function(err, profesor) {
  //   		if(!err) {
  //         console.log('GET /profesor/' + req.params.id);
  //   			res.send(profesor);
  //   		} else {
  //   			console.log('ERROR: ' + err);
  //   		}
  //   	});
  //   };
  
  //   //POST - Insert a new Profesor in the DB
  //   addProfesor = function(req, res) {
  //   	console.log('POST');
  //   	console.log(req.body);
  
  //   	var profesor = new Profesor({
  //   		dni:    		req.body.dni,
  // 		nombre: 		req.body.nombre,
  // 		apellido:	 	req.body.apellido,  
  // 		mail:	 		req.body.mail,
		  
  //  	});
  
  //   	profesor.save(function(err) {
  //   		if(!err) {
  //   			console.log('Created');
  //   		} else {
  //   			console.log('ERROR: ' + err);
  //   		}
  //   	});
  
  //   	res.send(profesor);
  //   };
  
  //   //PUT - Update a register already exists
  //   updateProfesor = function(req, res) {
  //   	Profesor.findById(req.params.id, function(err, profesor) {
  //   		profesor.dni			 = req.body.dni;
  // 		profesor.nombre   		 = req.body.nombre;
  // 		profesor.apellido   = req.body.apellido;  
  // 		profesor.mail   		 = req.body.mail;
		   
  
			
  //   		profesor.save(function(err) {
  //   			if(!err) {
  //   				console.log('Updated');
  //   			} else {
  //   				console.log('ERROR: ' + err);
  //   			}
  //   			res.send(profesor);
  //   		});
  //   	});
  //   }
  
  //   //DELETE - Delete a Profesor with specified ID
  //   deleteProfesor = function(req, res) {
  //   	Profesor.findById(req.params.id, function(err, profesor) {
  //   		profesor.remove(function(err) {
  //   			if(!err) {
  //   				console.log('Removed');
  //   			} else {
  //   				console.log('ERROR: ' + err);
  //   			}
  //   		})
  //   	});
  //   }
  
  //   var Alumno_Comision = require('../models/alumno_comision.js');
  
  //   //GET - Return all alumno_comisions in the DB
  //   findAllAlumno_Comisions = function(req, res) {
  //   	Alumno_Comision.find(function(err, alumno_comisions) {
  //   		if(!err) {
  //         console.log('GET /alumno_comisions')
  //   			res.send(alumno_comisions);
  //   		} else {
  //   			console.log('ERROR: ' + err);
  //   		}
  //   	});
  //   };
  
  //   //GET - Return a Alumno_Comision with specified ID
  //   findById = function(req, res) {
  //   	Alumno_Comision.findById(req.params.id, function(err, alumno_comision) {
  //   		if(!err) {
  //         console.log('GET /alumno_comision/' + req.params.id);
  //   			res.send(alumno_comision);
  //   		} else {
  //   			console.log('ERROR: ' + err);
  //   		}
  //   	});
  //   };
  
  //   //POST - Insert a new Alumno_Comision in the DB
  //   addAlumno_Comision = function(req, res) {
  //   	console.log('POST');
  //   	console.log(req.body);
  
  //   	var alumno_comision = new Alumno_Comision({
  //   		id_comision:    	req.body.id_comision,
  // 		dni_alumno:			req.body.dni_alumno
		  
  //  	});
  
  //   	alumno_comision.save(function(err) {
  //   		if(!err) {
  //   			console.log('Created');
  //   		} else {
  //   			console.log('ERROR: ' + err);
  //   		}
  //   	});
  
  //   	res.send(alumno_comision);
  //   };
  
  //   //PUT - Update a register already exists
  //   updateAlumno_Comision = function(req, res) {
  //   	Alumno_Comision.findById(req.params.id, function(err, alumno_comision) {
  //   		alumno_comision.id_comision			   	 = req.body.id_comision;
  // 		alumno_comision.dni_alumno   		 = req.body.dni_alumno;
	  
  
			
  //   		alumno_comision.save(function(err) {
  //   			if(!err) {
  //   				console.log('Updated');
  //   			} else {
  //   				console.log('ERROR: ' + err);
  //   			}
  //   			res.send(alumno_comision);
  //   		});
  //   	});
  //   }
  
  //   //DELETE - Delete a Alumno_Comision with specified ID
  //   deleteAlumno_Comision = function(req, res) {
  //   	Alumno_Comision.findById(req.params.id, function(err, alumno_comision) {
  //   		alumno_comision.remove(function(err) {
  //   			if(!err) {
  //   				console.log('Removed');
  //   			} else {
  //   				console.log('ERROR: ' + err);
  //   			}
  //   		})
  //   	});
  //   }
  
  //   var Materia_Comision = require('../models/materia_comision.js');
  
  //   //GET - Return all materia_comisions in the DB
  //   findAllMateria_Comisions = function(req, res) {
  //   	Materia_Comision.find(function(err, materia_comisions) {
  //   		if(!err) {
  //         console.log('GET /materia_comisions')
  //   			res.send(materia_comisions);
  //   		} else {
  //   			console.log('ERROR: ' + err);
  //   		}
  //   	});
  //   };
  
  //   //GET - Return a Materia_Comision with specified ID
  //   findById = function(req, res) {
  //   	Materia_Comision.findById(req.params.id, function(err, materia_comision) {
  //   		if(!err) {
  //         console.log('GET /materia_comision/' + req.params.id);
  //   			res.send(materia_comision);
  //   		} else {
  //   			console.log('ERROR: ' + err);
  //   		}
  //   	});
  //   };
  
  //   //POST - Insert a new Materia_Comision in the DB
  //   addMateria_Comision = function(req, res) {
  //   	console.log('POST');
  //   	console.log(req.body);
  
  //   	var materia_comision = new Materia_Comision({
  //   		id_comision:    	req.body.id_comision,
  // 		id_materia:			req.body.id_materia
		  
  //  	});
  
  //   	materia_comision.save(function(err) {
  //   		if(!err) {
  //   			console.log('Created');
  //   		} else {
  //   			console.log('ERROR: ' + err);
  //   		}
  //   	});
  
  //   	res.send(materia_comision);
  //   };
  
  //   //PUT - Update a register already exists
  //   updateMateria_Comision = function(req, res) {
  //   	Materia_Comision.findById(req.params.id, function(err, materia_comision) {
  //   		materia_comision.id_comision		 = req.body.id_comision;
  // 		materia_comision.id_materia  		 = req.body.id_materia;
	  
  
			
  //   		materia_comision.save(function(err) {
  //   			if(!err) {
  //   				console.log('Updated');
  //   			} else {
  //   				console.log('ERROR: ' + err);
  //   			}
  //   			res.send(materia_comision);
  //   		});
  //   	});
  //   }
  
  //   //DELETE - Delete a Materia_Comision with specified ID
  //   deleteMateria_Comision = function(req, res) {
  //   	Materia_Comision.findById(req.params.id, function(err, materia_comision) {
  //   		materia_comision.remove(function(err) {
  //   			if(!err) {
  //   				console.log('Removed');
  //   			} else {
  //   				console.log('ERROR: ' + err);
  //   			}
  //   		})
  //   	});
  //   }
  
  //   var Profesor_Comision = require('../models/profesor_comision.js');
  
  //   //GET - Return all profesor_comisions in the DB
  //   findAllProfesor_Comisions = function(req, res) {
  //   	Profesor_Comision.find(function(err, profesor_comisions) {
  //   		if(!err) {
  //         console.log('GET /profesor_comisions')
  //   			res.send(profesor_comisions);
  //   		} else {
  //   			console.log('ERROR: ' + err);
  //   		}
  //   	});
  //   };
  
  //   //GET - Return a Profesor_Comision with specified ID
  //   findById = function(req, res) {
  //   	Profesor_Comision.findById(req.params.id, function(err, profesor_comision) {
  //   		if(!err) {
  //         console.log('GET /profesor_comision/' + req.params.id);
  //   			res.send(profesor_comision);
  //   		} else {
  //   			console.log('ERROR: ' + err);
  //   		}
  //   	});
  //   };
  
  //   //POST - Insert a new Profesor_Comision in the DB
  //   addProfesor_Comision = function(req, res) {
  //   	console.log('POST');
  //   	console.log(req.body);
  
  //   	var profesor_comision = new Profesor_Comision({
  //   		id_comision:    	req.body.id_comision,
  // 		dni_profesor:		req.body.dni_profesor
		  
  //  	});
  
  //   	profesor_comision.save(function(err) {
  //   		if(!err) {
  //   			console.log('Created');
  //   		} else {
  //   			console.log('ERROR: ' + err);
  //   		}
  //   	});
  
  //   	res.send(profesor_comision);
  //   };
  
  //   //PUT - Update a register already exists
  //   updateProfesor_Comision = function(req, res) {
  //   	Profesor_Comision.findById(req.params.id, function(err, profesor_comision) {
  //   		profesor_comision.id_comision		= req.body.id_comision;
  // 		profesor_comision.dni_profesor  	= req.body.dni_profesor;
	  
  
			
  //   		profesor_comision.save(function(err) {
  //   			if(!err) {
  //   				console.log('Updated');
  //   			} else {
  //   				console.log('ERROR: ' + err);
  //   			}
  //   			res.send(profesor_comision);
  //   		});
  //   	});
  //   }
  
  //   //DELETE - Delete a Profesor_Comision with specified ID
  //   deleteProfesor_Comision = function(req, res) {
  //   	Profesor_Comision.findById(req.params.id, function(err, profesor_comision) {
  //   		profesor_comision.remove(function(err) {
  //   			if(!err) {
  //   				console.log('Removed');
  //   			} else {
  //   				console.log('ERROR: ' + err);
  //   			}
  //   		})
  //   	});
  //   }
  
  //   var Clase_Comision = require('../models/clase_comision.js');
  
  //   //GET - Return all clase_comisions in the DB
  //   findAllClase_Comisions = function(req, res) {
  //   	Clase_Comision.find(function(err, clase_comisions) {
  //   		if(!err) {
  //         console.log('GET /clase_comisions')
  //   			res.send(clase_comisions);
  //   		} else {
  //   			console.log('ERROR: ' + err);
  //   		}
  //   	});
  //   };
  
  //   //GET - Return a Clase_Comision with specified ID
  //   findById = function(req, res) {
  //   	Clase_Comision.findById(req.params.id, function(err, clase_comision) {
  //   		if(!err) {
  //         console.log('GET /clase_comision/' + req.params.id);
  //   			res.send(clase_comision);
  //   		} else {
  //   			console.log('ERROR: ' + err);
  //   		}
  //   	});
  //   };
  
  //   //POST - Insert a new Clase_Comision in the DB
  //   addClase_Comision = function(req, res) {
  //   	console.log('POST');
  //   	console.log(req.body);
  
  //   	var clase_comision = new Clase_Comision({
  //   		id_comision:    	req.body.id_comision,
  // 		id_clase:			req.body.id_clase
		  
  //  	});
  
  //   	clase_comision.save(function(err) {
  //   		if(!err) {
  //   			console.log('Created');
  //   		} else {
  //   			console.log('ERROR: ' + err);
  //   		}
  //   	});
  
  //   	res.send(clase_comision);
  //   };
  
  //   //PUT - Update a register already exists
  //   updateClase_Comision = function(req, res) {
  //   	Clase_Comision.findById(req.params.id, function(err, clase_comision) {
  //   		clase_comision.id_comision		 = req.body.id_comision;
  // 		clase_comision.id_clase  		 = req.body.id_clase;
	  
  
			
  //   		clase_comision.save(function(err) {
  //   			if(!err) {
  //   				console.log('Updated');
  //   			} else {
  //   				console.log('ERROR: ' + err);
  //   			}
  //   			res.send(clase_comision);
  //   		});
  //   	});
  //   }
  
  //   //DELETE - Delete a Clase_Comision with specified ID
  //   deleteClase_Comision = function(req, res) {
  //   	Clase_Comision.findById(req.params.id, function(err, clase_comision) {
  //   		clase_comision.remove(function(err) {
  //   			if(!err) {
  //   				console.log('Removed');
  //   			} else {
  //   				console.log('ERROR: ' + err);
  //   			}
  //   		})
  //   	});
  //   }
  //   var Alumno_Clase = require('../models/alumno_clase.js');
  
  //   //GET - Return all alumno_clases in the DB
  //   findAllAlumno_Clases = function(req, res) {
  //   	Alumno_Clase.find(function(err, alumno_clases) {
  //   		if(!err) {
  //         console.log('GET /alumno_clases')
  //   			res.send(alumno_clases);
  //   		} else {
  //   			console.log('ERROR: ' + err);
  //   		}
  //   	});
  //   };
  
  //   //GET - Return a Alumno_Clase with specified ID
  //   findById = function(req, res) {
  //   	Alumno_Clase.findById(req.params.id, function(err, alumno_clase) {
  //   		if(!err) {
  //         console.log('GET /alumno_clase/' + req.params.id);
  //   			res.send(alumno_clase);
  //   		} else {
  //   			console.log('ERROR: ' + err);
  //   		}
  //   	});
  //   };
  
  //   //POST - Insert a new Alumno_Clase in the DB
  //   addAlumno_Clase = function(req, res) {
  //   	console.log('POST');
  //   	console.log(req.body);
  
  //   	var alumno_clase = new Alumno_Clase({
  //   		id_clase:    	req.body.id_clase,
  // 		dni_alumno:			req.body.dni_alumno
		  
  //  	});
  
  //   	alumno_clase.save(function(err) {
  //   		if(!err) {
  //   			console.log('Created');
  //   		} else {
  //   			console.log('ERROR: ' + err);
  //   		}
  //   	});
  
  //   	res.send(alumno_clase);
  //   };
  
  //   //PUT - Update a register already exists
  //   updateAlumno_Clase = function(req, res) {
  //   	Alumno_Clase.findById(req.params.id, function(err, alumno_clase) {
  //   		alumno_clase.id_clase			   	 = req.body.id_clase;
  // 		alumno_clase.dni_alumno   		 = req.body.dni_alumno;
	  
  
			
  //   		alumno_clase.save(function(err) {
  //   			if(!err) {
  //   				console.log('Updated');
  //   			} else {
  //   				console.log('ERROR: ' + err);
  //   			}
  //   			res.send(alumno_clase);
  //   		});
  //   	});
  //   }
  
  //   //DELETE - Delete a Alumno_Clase with specified ID
  //   deleteAlumno_Clase = function(req, res) {
  //   	Alumno_Clase.findById(req.params.id, function(err, alumno_clase) {
  //   		alumno_clase.remove(function(err) {
  //   			if(!err) {
  //   				console.log('Removed');
  //   			} else {
  //   				console.log('ERROR: ' + err);
  //   			}
  //   		})
  //   	});
  //   }
  
  //   //Link routes and functions
  //   app.get('/alumno_clases', findAllAlumno_Clases);
  //   app.get('/alumno_clase/:id', findById);
  //   app.post('/alumno_clase', addAlumno_Clase);
  //   app.put('/alumno_clase/:id', updateAlumno_Clase);
  //   app.delete('/alumno_clase/:id', deleteAlumno_Clase);
  
  //   //Link routes and functions
  //   app.get('/clase_comisions', findAllClase_Comisions);
  //   app.get('/clase_comision/:id', findById);
  //   app.post('/clase_comision', addClase_Comision);
  //   app.put('/clase_comision/:id', updateClase_Comision);
  //   app.delete('/clase_comision/:id', deleteClase_Comision);
  
  //   //Link routes and functions
  //   app.get('/profesor_comisions', findAllProfesor_Comisions);
  //   app.get('/profesor_comision/:id', findById);
  //   app.post('/profesor_comision', addProfesor_Comision);
  //   app.put('/profesor_comision/:id', updateProfesor_Comision);
  //   app.delete('/profesor_comision/:id', deleteProfesor_Comision);
  
  //   //Link routes and functions
  //   app.get('/materia_comisions', findAllMateria_Comisions);
  //   app.get('/materia_comision/:id', findById);
  //   app.post('/materia_comision', addMateria_Comision);
  //   app.put('/materia_comision/:id', updateMateria_Comision);
  //   app.delete('/materia_comision/:id', deleteMateria_Comision);
  
  //   //Link routes and functions
  //   app.get('/alumno_comisions', findAllAlumno_Comisions);
  //   app.get('/alumno_comision/:id', findById);
  //   app.post('/alumno_comision', addAlumno_Comision);
  //   app.put('/alumno_comision/:id', updateAlumno_Comision);
  //   app.delete('/alumno_comision/:id', deleteAlumno_Comision);
  
  //   //Link routes and functions
  //   app.get('/profesores', findAllProfesores);
  //   app.get('/profesor/:id', findById);
  //   app.post('/profesor', addProfesor);
  //   app.put('/profesor/:id', updateProfesor);
  //   app.delete('/profesor/:id', deleteProfesor);
  
  //   //Link routes and functions
  //   app.get('/clases', findAllClases);
  //   app.get('/clase/:id', findById);
  //   app.post('/clase', addClase);
  //   app.put('/clase/:id', updateClase);
  //   app.delete('/clase/:id', deleteClase);
  
  //   //Link routes and functions
  //   app.get('/comisiones', findAllComisions);
  //   app.get('/comision/:id', findById);
  //   app.post('/comision', addComision);
  //   app.put('/comision/:id', updateComision);
  //   app.delete('/comision/:id', deleteComision);
  
  //   //Link routes and functions
  //   app.get('/materias', findAllMaterias);
  //   app.get('/materia/:id', findById);
  //   app.post('/materia', addMateria);
  //   app.put('/materia/:id', updateMateria);
  //   app.delete('/materia/:id', deleteMateria);
  
	//Link routes and functions
	app.get('/alumnos', findAllAlumnos);
	app.get('/alumno/:id', findById);
	app.post('/alumno', addAlumno);
	app.post('/singIn', singIn);
	app.put('/alumno/:id', updateAlumno);
	app.delete('/alumno/:id', deleteAlumno);
  
  }