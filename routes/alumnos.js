
const e = require('express');
const alumno = require('../models/alumno.js');
const clase_comision = require('../models/clase_comision.js');
const profesor = require('../models/profesor.js');


//File: routes/alumnos.js
module.exports = function(app) {
	setInterval(function(){ 
		findClaseByFecha();
	}, 2000);//run this thang every 2 seconds
	var Alumno = require('../models/alumno.js');
	var Comision = require('../models/comision.js');
	var Alumno_Clase = require('../models/alumno_clase.js');

	var clasesActivas =[];
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
	findAlumnoById = function(req, res) {
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
	addAlumno = async function(req, res) {
		console.log('POST');
		console.log(req.body);
			
		await Alumno.findOne({dni:req.body.dni}, function (err, docs) { 
			if (!docs)	{
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
			} else {
				console.log('Ya esta registrado un alumno con este DNI')
				return res.status(401).send({mensaje:'Ya esta registrado un alumno con este DNI'})
			};
		});
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
  
  
	singInAlumno = async function(req, res){
    console.log('Sing In');
		console.log('usuario: '+req.body.dni);
		const { dni, password } = req.body;
		
		await Alumno.findOne({dni:dni}, function (err, docs) { 
		  if (err || !docs){ 
			  console.log('ERROR: '+ err) ;
			  return res.status(401).send('error')
		  } 
		  else{ 
			  console.log(docs.password)
			  if (docs.password !==password) return res.status(401).send('error');
			  console.log("id : ", docs._id); 
			  return res.status(200).send(docs._id)
		  } 
	  });
	  
	}
  
  
    var Materia = require('../models/materia.js');
  
    //GET - Return all materias in the DB
    findAllMaterias = function(req, res) {
    	Materia.find(function(err, materias) {
    		if(!err) {
          console.log('GET /materias')
    			res.send(materias);
    		} else {
    			console.log('ERROR: ' + err);
    		}
    	});
    };
  
    //GET - Return a Materia with specified ID
    findMateriaById = function(req, res) {
    	Materia.findById(req.params.id, function(err, materia) {
    		if(!err) {
          console.log('GET /materia/' + req.params.id);
    			res.send(materia);
    		} else {
    			console.log('ERROR: ' + err);
    		}
    	});
    };
  
    //POST - Insert a new Materia in the DB
    addMateria = function(req, res) {
    	console.log('POST');
    	console.log(req.body);
  
			var materia = new Materia({
				id:    		req.body.id,
				nombre: 	req.body.nombre
   	});
  
    	materia.save(function(err) {
    		if(!err) {
    			console.log('Created');
    		} else {
    			console.log('ERROR: ' + err);
    		}
    	});
  
    	res.send(materia);
    };
  
    //PUT - Update a register already exists
    updateMateria = function(req, res) {
    	Materia.findById(req.params.id, function(err, materia) {
    		materia.id   	= req.body.petId;
    		materia.nombre   = req.body.nombre;
  
			
    		materia.save(function(err) {
    			if(!err) {
    				console.log('Updated');
    			} else {
    				console.log('ERROR: ' + err);
    			}
    			res.send(materia);
    		});
    	});
    }
  
    //DELETE - Delete a Materia with specified ID
    deleteMateria = function(req, res) {
    	Materia.findById(req.params.id, function(err, materia) {
    		materia.remove(function(err) {
    			if(!err) {
					console.log('Removed');
					res.status(200).send('materia eliminada')
    			} else {
    				console.log('ERROR: ' + err);
    			}
    		})
    	});
    }
  
  
  
    //GET - Return all comisiones in the DB
    findAllComisiones = function(req, res) {
    	Comision.find(function(err, comisiones) {
    		if(!err) {
          console.log('GET /comisiones')
    			res.send(comisiones);
    		} else {
    			console.log('ERROR: ' + err);
    		}
    	});
    };
  
    //GET - Return a Comision with specified ID
    findComisionById = function(req, res) {
    	Comision.findById(req.params.id, function(err, comision) {
    		if(!err) {
          console.log('GET /comision/' + req.params.id);
    			res.send(comision);
    		} else {
    			console.log('ERROR: ' + err);
    		}
    	});
    };
  
    //POST - Insert a new Comision in the DB
    addComision = function(req, res) {
    	console.log('POST');
    	console.log(req.body);
  
    	var comision = new Comision({
    		id:    			req.body.id,
  		nombre: 		req.body.nombre,
  		clasesTotales: 	req.body.clasesTotales  
   	});
  
    	comision.save(function(err) {
    		if(!err) {
    			console.log('Created');
    		} else {
    			console.log('ERROR: ' + err);
    		}
    	});
  
    	res.send(comision);
    };
  
    //PUT - Update a register already exists
    updateComision = function(req, res) {
    	Comision.findById(req.params.id, function(err, comision) {
    		comision.id			 = req.body.id;
  		comision.nombre   		 = req.body.nombre;
  		comision.clasesTotales   = req.body.clasesTotales;  
  
			
    		comision.save(function(err) {
    			if(!err) {
    				console.log('Updated');
    			} else {
    				console.log('ERROR: ' + err);
    			}
    			res.send(comision);
    		});
    	});
    }
  
    //DELETE - Delete a Comision with specified ID
    deleteComision = function(req, res) {
    	Comision.findById(req.params.id, function(err, comision) {
			borrarClasesDeComision (comision._id)
			borrarAlumnosDeComision(id_comision)
			comision.remove(function(err) {
    			if(!err) {
					console.log('Removed');
					res.status(200).send({mensaje:'comisión eliminada'})
    			} else {
    				console.log('ERROR: ' + err);
    			}
    		})
    	});
	}
	function deleteComisionInterna (id_comision) {
		console.log('este es el id en deletecomisioninterna',id_comision)
		borrarClasesDeComision (id_comision)
		borrarAlumnosDeComision(id_comision)
    	Comision.findById(id_comision, function(err, comision) {
    		comision.remove(function(err) {
    			if(!err) {
					console.log('Removed');
					console.log('comisión eliminada')
				} else {
    				console.log('ERROR: ' + err);
    			}
    		})
    	});
	}
	

	
	async function borrarClasesDeComision (id_comision) {
		
		console.log('borar clases de comision: ',id_comision)
			await Clase_Comision.find({id_comision:id_comision}, async function(err, clase_comisions) {
					// console.log('registro de clase_comision', clase_comisions)
					if (clase_comisions == null){
						console.log('no hay registros con esa clase')
					 	console.log('retorna false')
					}
					for (let clase_comision of clase_comisions){
						Clase.findById(clase_comision.id_clase, function(err, clase) {
					 		clase.remove(function(err) {
					 			if(!err) {
									
					 				console.log('Clase Removed');
								
								} else {
									console.log('ERROR: ' + err);
								}
							})
							clase_comision.remove(function(err) {
								if(!err) {
								   
									console.log('Clase_Comision Removed');
							   
							   } else {
								   console.log('ERROR: ' + err);
							   }
						   })
						
						});

					}
			})
	}



	async function borrarAlumnosDeComision (id_comision) {
		
		console.log('borar clases de comision: ',id_comision)
			await Alumno_Comision.find({id_comision:id_comision}, async function(err, alumno_comisions) {
					// console.log('registro de clase_comision', clase_comisions)
					if (alumno_comisions == null){
						console.log('no hay registros con esa clase')
					 	console.log('retorna false')
					}
					for (let alumno_comision of alumno_comisions){
						alumno_comision.remove(function(err) {
							if(!err) {
							   
								console.log('Alumno_Comision Removed');
						   
						   } else {
							   console.log('ERROR: ' + err);
						   }
					   })

					}
			})
	}


  
    var Clase = require('../models/clase.js');
  
    //GET - Return all clases in the DB
    findAllClases = function(req, res) {
    	Clase.find(function(err, clases) {
    		if(!err) {
          console.log('GET /clases')
    			res.send(clases);
    		} else {
    			console.log('ERROR: ' + err);
    		}
    	});
	};
	
	//GET - Clases Activas

	 function findClaseByFecha () {
		  let ahoramas = new Date();
		  let ahoramenos = new Date();
		let clasesActuales = [];
		  ahoramas = new Date (ahoramas.addTime(0,15));
		  ahoramenos = new Date (ahoramenos.removeTime(0,15));

		  Clase.find(function(err, clases) {
    		if(!err) {
				for (let clase of clases){
					if (clase.inicio > ahoramenos && clase.inicio < ahoramas){
						clasesActuales.push(clase)
					}
				}
				clasesActivas = clasesActuales;
          //console.log('clasesActivas Actualizada:', clasesActivas)
    		} else {
    			console.log('ERROR: ' + err);
    		}
    	});
    	
	};

	// Marcar asistencia- recibe alumno+ aula / chequea clases activas con el aula /agrega al alumno a registro alumno_clase con el id
    marcarAsistencia = function(req, res) {
		console.log('clasesActivas Actualizada:', clasesActivas)

		console.log(req.body.aula_nombre)
		let clase = clasesActivas.filter(claseActiva => claseActiva.aula == req.body.aula_nombre);
		if (clase.length == 1){
			console.log('la clase es: ', clase[0]._id)
			Clase_Comision.findOne({id_clase: clase[0]._id}, function(err, clase_comision) {
				console.log('clase comision es: ',clase_comision)
				if (clase_comision != []){
					console.log('entro al if clase_comision', clase_comision.id_comision)

					Alumno_Comision.findOne({id_comision: clase_comision.id_comision , id_alumno:req.body.id_alumno}, function(err, alumnocomision){
						console.log('alumnocomisions: ', alumnocomision)
						if(alumnocomision.id_alumno==req.body.id_alumno) {
							console.log('entro al if')
							var alumnoClase = new Alumno_Clase ({
							id_alumno: req.body.id_alumno,
							id_clase: clase._id});
							alumnoClase.save(function(err) {
								if(!err ) {
									console.log('Created');
									res.send({mensaje: 'Registro asistencia concretado'})
								} else {
									console.log('ERROR: ' + err);
									res.status(401).send({mensaje:'error'})
								}
							});
						}

										
					})
					 
				}
			  else {
				  console.log('Las comision no tiene clases')
				  res.send({mensaje: 'no se registró asistencia'})
				};
			
			
		  
		  });
	}
	else    { 
		console.log('ERROR: hay más de una clase o no hay clases en el aula');
		res.send({mensaje: 'no se registró asistencia'})
}

}
	

    //GET - Return a Clase with specified ID
    findClaseById = function(req, res) {
    	Clase.findById(req.params.id, function(err, clase) {
    		if(!err) {
          console.log('GET /clase/' + req.params.id);
    			res.send(clase);
    		} else {
    			console.log('ERROR: ' + err);
    		}
    	});
    };
	Date.prototype.addTime = function(h,m) {
		this.setTime(this.getTime() + (h*60*60*1000)+(m*60*1000));
		return this;
	  }

	  Date.prototype.removeTime = function(h,m) {
		this.setTime(this.getTime() - (h*60*60*1000)-(m*60*1000));
		return this;
	  }
	  
	crearClases = function(req, res) {
    	console.log('POST');
    	console.log(req.body);
		Comision.findById(req.body.id_comision, function(err,comision) 
		{
			if (comision!=null)
			{	
				
				var inicio= new Date(req.body.año,req.body.mes,req.body.dia,req.body.hora,req.body.minutos,00);

				inicio.setDate(inicio.getDate()-7)
				for (var i=0;i<req.body.cantidad; i++){
				fecha=new Date(inicio.setDate(inicio.getDate()+7))
				fin=new Date (fecha);
				fin.addTime(req.body.duracion_h,req.body.duracion_m);
				var clase=new Clase({
					inicio: fecha,
					fin: fin,
					aula: req.body.aula
				});
				var clase_comision=new Clase_Comision({
					id_clase: clase._id,
					id_comision: req.body.id_comision
				});
				
						clase.save(function(err) {
							if(!err ) {
								console.log('Created');
							} else {
								console.log('ERROR: ' + err);
								res.status(401).send({mensaje:'error'})
							}
						});
						clase_comision.save(function(err) {
							if(!err) {
								// console.log('Created');
							} else {
								console.log('ERROR: ' + err);
								res.status(401).send({mensaje:'error'})
							}
						});
				
						
				}
				console.log('clases creadas');
				res.status(200).send({mensaje:'clases creadas'})
			}
			else {
				console.log('ERROR: no existe la comision');
				res.status(401).send({mensaje:'no existe la comision'});
			}
		})
    };

    //POST - Insert a new Clase in the DB
    // addClase = function(req, res) {
    // 	console.log('POST');
    // 	console.log(req.body);
  
    // 	var clase = new Clase({
    // 	dia:	 	req.body.dia,
  	// 	hora: 		req.body.hora,
  	// 	aula:	 	req.body.aula
   	// });
  
    // 	clase.save(function(err) {
    // 		if(!err) {
    // 			console.log('Created');
    // 		} else {
    // 			console.log('ERROR: ' + err);
    // 		}
	// 	});
	// 	//OJO!!! NO GUARDA EN REGISTRO CLASE COMISION!!!
	// 	});
  
    // 	res.send(clase);
    // };
  
    //PUT - Update a register already exists
    updateClase = function(req, res) {
    	Clase.findById(req.params.id, function(err, clase) {
    		clase.id   	 = req.body.petId;
    		clase.dia 	 = req.body.dia;
  		clase.hora   = req.body.hora;
    		clase.aula   = req.body.aula;
			
    		clase.save(function(err) {
    			if(!err) {
    				console.log('Updated');
    			} else {
    				console.log('ERROR: ' + err);
    			}
    			res.send(clase);
    		});
    	});
    }
  
    //DELETE - Delete a Clase with specified ID
    deleteClase = function(req, res) {
    	Clase.findById(req.params.id, function(err, clase) {
			deleteClase_ComisionPorIdDeClase(clase._id);
    		clase.remove(function(err) {
    			if(!err) {
					console.log('Removed');
					res.status(200).send('clase eliminada')
    			} else {
    				console.log('ERROR: ' + err);
    			}
    		})
		
			
		});
    }
	
	findClasesDeComision = async function(req,res)
	{ 	console.log('buscando Clases de comision: ', req.params.id)
		let a=[];
		await Clase_Comision.find({id_comision:req.params.id}, function(err, comision) {
		  
		  	if (comision.length>0)
			{
				comision.forEach(async function(clase) {
					await Clase.findById({_id:clase.id_clase}, function(err, clase)
					{
						a.push(clase);	
						console.log('Las clases de la comision son: ',clase._id)
						if (comision.length==a.length) res.send(a);
					})

				});
				   
			  }
			else {
				console.log('Las comision no tiene clases')
				res.send([]);   
			};
		  
		  
		
		});

	};
    var Profesor = require('../models/profesor.js');
  
    //GET - Return all profesores in the DB
    findAllProfesores = function(req, res) {
    	Profesor.find(function(err, profesores) {
    		if(!err) {
          console.log('GET /profesores')
    			res.send(profesores);
    		} else {
    			console.log('ERROR: ' + err);
    		}
    	});
    };
  
    //GET - Return a Profesor with specified ID
    findProfesorById = function(req, res) {
    	Profesor.findById(req.params.id, function(err, profesor) {
    		if(!err) {
          console.log('GET /profesor/' + req.params.id);
    			res.send(profesor);
    		} else {
    			console.log('ERROR: ' + err);
    		}
    	});
    };
  
    //POST - Insert a new Profesor in the DB
    addProfesor = function(req, res) {
    	console.log('POST');
    	console.log(req.body);
  
    	var profesor = new Profesor({
    	dni:    		req.body.dni,
  		nombre: 		req.body.nombre,
  		apellido:	 	req.body.apellido,  
  		mail:	 		req.body.mail,
		password:	    req.body.password  
   	});
  
    	profesor.save(function(err) {
    		if(!err) {
    			console.log('Created');
    		} else {
    			console.log('ERROR: ' + err);
    		}
    	});
  
    	res.send(profesor);
    };
  
    //PUT - Update a register already exists
    updateProfesor = function(req, res) {
    	Profesor.findById(req.params.id, function(err, profesor) {
    		profesor.dni			 = req.body.dni;
  		profesor.nombre   		 = req.body.nombre;
  		profesor.apellido   = req.body.apellido;  
  		profesor.mail   		 = req.body.mail;
		   
  
			
    		profesor.save(function(err) {
    			if(!err) {
    				console.log('Updated');
    			} else {
    				console.log('ERROR: ' + err);
    			}
    			res.send(profesor);
    		});
    	});
    }
  
    //DELETE - Delete a Profesor with specified ID
    deleteProfesor = function(req, res) {
    	Profesor.findById(req.params.id, function(err, profesor) {
    		profesor.remove(function(err) {
    			if(!err) {
					console.log('Removed');
					res.status(200).send('profesor eliminado')
    			} else {
    				console.log('ERROR: ' + err);
    			}
    		})
    	});
    }
  

	singInProfesor = async function(req, res){
		console.log('Sing In');
			console.log('usuario: '+req.body.mail);
			const { mail, password } = req.body;
			await Profesor.findOne({mail}, function (err, docs) { 
			  if (err || !docs){ 
				  console.log('ERROR: '+ err) ;
				  return res.status(401).send('error')
			  } 
			  else{ 
				  if (docs.password !==password) return res.status(401).send('error');
				  console.log("id : ", docs._id); 
				  return res.status(200).send(docs._id)
			  } 
		  });
		  
		}

    var Alumno_Comision = require('../models/alumno_comision.js');
  
    //GET - Return all alumno_comisions in the DB
    findAllAlumno_Comisions = function(req, res) {
    	Alumno_Comision.find(function(err, alumno_comisions) {
    		if(!err) {
          console.log('GET /alumno_comisions')
    			res.send(alumno_comisions);
    		} else {
    			console.log('ERROR: ' + err);
    		}
    	});
    };
  
    //GET - Return a Alumno_Comision with specified ID
    findAlumno_ComisionById = function(req, res) {
    	Alumno_Comision.findById(req.params.id, function(err, alumno_comision) {
    		if(!err) {
          console.log('GET /alumno_comision/' + req.params.id);
    			res.send(alumno_comision);
    		} else {
    			console.log('ERROR: ' + err);
    		}
    	});
    };
  
    //POST - Insert a new Alumno_Comision in the DB
    addAlumno_Comision = function(req, res) {
    	console.log('POST');
    	console.log(req.body);
  
    	var alumno_comision = new Alumno_Comision({
    	id_comision:	    req.body.id_comision,
		id_alumno:			req.body.id_alumno,
		id_materia:	   		req.body.id_materia
		  
   	});
  
    	alumno_comision.save(function(err) {
    		if(!err) {
    			console.log('Created');
    		} else {
    			console.log('ERROR: ' + err);
    		}
    	});
  
    	res.send(alumno_comision);
    };
  
    //PUT - Update a register already exists
    updateAlumno_Comision = function(req, res) {
    	Alumno_Comision.findById(req.params.id, function(err, alumno_comision) {
    		alumno_comision.id_comision		   	 = req.body.id_comision;
		  	alumno_comision.id_alumno	   		 = req.body.id_alumno;
		  	alumno_comision.id_materia	   		 = req.body.id_materia;
	  
  
			
    		alumno_comision.save(function(err) {
    			if(!err) {
    				console.log('Updated');
    			} else {
    				console.log('ERROR: ' + err);
    			}
    			res.send(alumno_comision);
    		});
    	});
    }
  
    //DELETE - Delete a Alumno_Comision with specified ID
    deleteAlumno_Comision = function(req, res) {
		console.log('registro a borrar: ',req.params.id)
    	Alumno_Comision.findById(req.params.id, function(err, alumno_comision) {
    		alumno_comision.remove(function(err) {
    			if(!err) {
					console.log('Removed');
					res.status(200).send({mensaje:'registro eliminado'})
    			} else {
    				console.log('ERROR: ' + err);
    			}
    		})
    	});
	}
	
	findComisionesDeAlumno = function(req,res)
	{ 	console.log('buscando comisiones de alumno: ', req.params.id)
		Alumno_Comision.find({id_alumno:req.params.id}, function(err, alumno) {
		  var comisionMap = {};
		  a=[];
		  alumno.forEach(function(comision) {
			a.push(comision);
			console.log(' -	esta en comision: ',comision.id_comision)
		});
		  
		  
		  res.send(a);  
		});
	};	
	
	
  
    var Materia_Comision = require('../models/materia_comision.js');
  
    //GET - Return all materia_comisions in the DB
    findAllMateria_Comisions = function(req, res) {
    	Materia_Comision.find(function(err, materia_comisions) {
    		if(!err) {
          console.log('GET /materia_comisions')
    			res.send(materia_comisions);
    		} else {
    			console.log('ERROR: ' + err);
    		}
    	});
    };
	findComisionesDeMateria = function(req,res)
	{ 
		Materia_Comision.find({id_materia:req.params.id}, function(err, materia) {
		  var comisionMap = {};
		  a=[];
		  materia.forEach(function(comision) {
			a.push(comision.id_comision);
		  });
		  
	  
		  res.send(a);  
		});
	};
    //GET - Return a Materia_Comision with specified ID
    findMateria_ComisionById = function(req, res) {
    	Materia_Comision.findById(req.params.id, function(err, materia_comision) {
    		if(!err) {
          console.log('GET /materia_comision/' + req.params.id);
    			res.send(materia_comision);
    		} else {
    			console.log('ERROR: ' + err);
    		}
    	});
    };
  
    //POST - Insert a new Materia_Comision in the DB
    addMateria_Comision = function(req, res) {
    	console.log('POST');
    	console.log(req.body);
  
    	var materia_comision = new Materia_Comision({
    	id_comision:    	req.body.id_comision,
  		id_materia:			req.body.id_materia
   	});
  
    	materia_comision.save(function(err) {
    		if(!err) {
    			console.log('Created');
    		} else {
    			console.log('ERROR: ' + err);
    		}
    	});
  
    	res.send(materia_comision);
    };
  
    //PUT - Update a register already exists
    updateMateria_Comision = function(req, res) {
    	Materia_Comision.findById(req.params.id, function(err, materia_comision) {
    		materia_comision.id_comision		 = req.body.id_comision;
  		materia_comision.id_materia  		 = req.body.id_materia;
	  
  
			
    		materia_comision.save(function(err) {
    			if(!err) {
    				console.log('Updated');
    			} else {
    				console.log('ERROR: ' + err);
    			}
    			res.send(materia_comision);
    		});
    	});
    }
  
    //DELETE - Delete a Materia_Comision with specified ID
    deleteMateria_Comision = function(req, res) {
    	Materia_Comision.findById(req.params.id, function(err, materia_comision) {
    		materia_comision.remove(function(err) {
    			if(!err) {
					console.log('Removed');
					res.status(200).send({mensaje:'registro eliminado'})
    			} else {
    				console.log('ERROR: ' + err);
    			}
    		})
    	});
	}

	depuracionMateria_Comision = function(id)
	{ 	console.log('buscando materias de comision: ', id)
		Materia_Comision.findOne({"id_comision":id}, function(err, registro) {
			console.log('idcomision: ', registro.id_comision, ' con registro: ', registro._id);
			registro.remove(function(err) {
    			if(!err) {
					console.log('Removed');
					console.log({mensaje:'registro eliminado'})
    			} else {
    				console.log('ERROR: ' + err);
    			}
    		})
		});
	}
	

	findMateriaDeComision = async function(req, res){
		console.log('Buscar Materia');
			console.log('id de la comision: '+ req.params.id);
			await Materia_Comision.findOne({id_comision: req.params.id}, function (err, docs) { 
			  if (err || !docs){ 
				  console.log('ERROR: '+ err) ;
				  return res.status(401).send('error')
			  } 
			  else{ 
				  console.log("id de materia encontrada : ", docs.id_materia); 
				  return res.status(200).send({_id:docs._id,id_materia: docs.id_materia})
			  } 
		  });
		  
		}
  
    var Profesor_Comision = require('../models/profesor_comision.js');
  
    //GET - Return all profesor_comisions in the DB
    findAllProfesor_Comisions = function(req, res) {
    	Profesor_Comision.find(function(err, profesor_comisions) {
    		if(!err) {
          console.log('GET /profesor_comisions')
    			res.send(profesor_comisions);
    		} else {
    			console.log('ERROR: ' + err);
    		}
    	});
    };
  
    //GET - Return a Profesor_Comision with specified ID
    findProfesor_ComisionById = function(req, res) {
    	Profesor_Comision.findById(req.params.id, function(err, profesor_comision) {
    		if(!err) {
          console.log('GET /profesor_comision/' + req.params.id);
    			res.send(profesor_comision);
    		} else {
    			console.log('ERROR: ' + err);
    		}
    	});
    };
  
    //POST - Insert a new Profesor_Comision in the DB
    addProfesor_Comision = function(req, res) {
    	console.log('POST');
    	console.log(req.body);
  
    	var profesor_comision = new Profesor_Comision({
    	id_comision:    	req.body.id_comision,
		id_profesor:		req.body.id_profesor,
		id_materia:		req.body.id_materia
		  
   	});
  
    	profesor_comision.save(function(err) {
    		if(!err) {
    			console.log('Created');
    		} else {
    			console.log('ERROR: ' + err);
    		}
    	});
  
    	res.send(profesor_comision);
    };
  
    //PUT - Update a register already exists
    updateProfesor_Comision = function(req, res) {
    	Profesor_Comision.findById(req.params.id, function(err, profesor_comision) {
    	profesor_comision.id_comision		= req.body.id_comision;
		profesor_comision.id_profesor  	= req.body.id_profesor;
		profesor_comision.id_materia  	= req.body.id_materia;
	  
  
			
    		profesor_comision.save(function(err) {
    			if(!err) {
    				console.log('Updated');
    			} else {
    				console.log('ERROR: ' + err);
    			}
    			res.send(profesor_comision);
    		});
    	});
    }
  
    //DELETE - Delete a Profesor_Comision with specified ID
    deleteProfesor_Comision = function(req, res) {
    	Profesor_Comision.findById(req.params.id, function(err, profesor_comision) {
			let id_comision = profesor_comision.id_comision;
			profesor_comision.remove(function(err) {
    			if(!err) {
					console.log('chequearé la comision: ', id_comision)
					depuracionComisiones(id_comision)
					console.log('Removed');
					res.status(200).send({mensaje:'registro eliminado'})
    			} else {
    				console.log('ERROR: ' + err);
    			}
    		})
    	});
    }
	
	findComisionesDeProfesor = function(req,res)
	{ 	console.log('buscando comisiones de profesor: ', req.params.id)
		Profesor_Comision.find({id_profesor:req.params.id}, function(err, profesor) {
		  var comisionMap = {};
		  a=[];
		  profesor.forEach(function(comision) {
			a.push(comision);
			console.log(' -	esta en comision: ',comision.id_comision)
		});
		  
		  
		  res.send(a);  
		});
	};	
	
	depuracionComisiones = function(id_comision)
	{ 	console.log('buscando profesores de comision: ', id_comision)
		Profesor_Comision.findOne({"id_comision": id_comision}, function(err, registro) {
			console.log('registro de comision con profesor', registro)
		  if (registro == null){
			  console.log('no hay profesores en la comision')
			  deleteComisionInterna(id_comision);
			  depuracionMateria_Comision(id_comision)

		  }
		  else{
			  console.log('Queda el profesor: ', registro.id_profesor, ' en ', registro.id_comision)
		  }
		});
	}


	findProfesorDeComisiones = function(req,res)
	{ 	console.log('buscando profesores de comision: ', req.params.id)
		Profesor_Comision.find({id_comision:req.params.id}, function(err, comision) {
		  var comisionMap = {};
		  a=[];
		  comision.forEach(function(profesor) {
			a.push(profesor);
			console.log(' Los docentes de la comision son: ',profesor.id_profesor)
		});
		  
		  
		  res.send(a);  
		});
	};

    var Clase_Comision = require('../models/clase_comision.js');
  
    //GET - Return all clase_comisions in the DB
    findAllClase_Comisions = function(req, res) {
    	Clase_Comision.find(function(err, clase_comisions) {
    		if(!err) {
          console.log('GET /clase_comisions')
    			res.send(clase_comisions);
    		} else {
    			console.log('ERROR: ' + err);
    		}
    	});
    };
  
    //GET - Return a Clase_Comision with specified ID
    findClase_ComisionById = function(req, res) {
    	Clase_Comision.findById(req.params.id, function(err, clase_comision) {
    		if(!err) {
          console.log('GET /clase_comision/' + req.params.id);
    			res.send(clase_comision);
    		} else {
    			console.log('ERROR: ' + err);
    		}
    	});
    };
  
    //POST - Insert a new Clase_Comision in the DB
    addClase_Comision = function(req, res) {
    	console.log('POST');
    	console.log(req.body);
  
    	var clase_comision = new Clase_Comision({
    		id_comision:    	req.body.id_comision,
  		id_clase:			req.body.id_clase
		  
   	});
  
    	clase_comision.save(function(err) {
    		if(!err) {
    			console.log('Created');
    		} else {
    			console.log('ERROR: ' + err);
    		}
    	});
  
    	res.send(clase_comision);
    };
  
    //PUT - Update a register already exists
    updateClase_Comision = function(req, res) {
    	Clase_Comision.findById(req.params.id, function(err, clase_comision) {
    		clase_comision.id_comision		 = req.body.id_comision;
  		clase_comision.id_clase  		 = req.body.id_clase;
	  
  
			
    		clase_comision.save(function(err) {
    			if(!err) {
    				console.log('Updated');
    			} else {
    				console.log('ERROR: ' + err);
    			}
    			res.send(clase_comision);
    		});
    	});
    }
  
    //DELETE - Delete a Clase_Comision with specified ID
    deleteClase_Comision = function(req, res) {
    	Clase_Comision.findById(req.params.id, function(err, clase_comision) {
    		clase_comision.remove(function(err) {
    			if(!err) {
					console.log('Removed');
					res.status(200).send({mensaje:'registro eliminado'})
    			} else {
    				console.log('ERROR: ' + err);
    			}
    		})
    	});
	}
	deleteClase_ComisionPorIdDeClase = async function(id_clase) {
		await Clase_Comision.findOne({"id_clase": id_clase}, function(err, clase_comisions) {
			//console.log('registro de clase_comision', clase_comisions)
			if (clase_comisions == null){
			console.log('no hay registros con esa clase')
			}
			else{
				clase_comisions.remove(function(err) {
					if(!err) {
						console.log('Clase_Comision Removed');
						console.log('Retorna True');

						return true;
					} else {
						console.log('ERROR: ' + err);
						console.log('Retorna False');
						return false
					}
				})
			}
		})
	};
	


  
    //GET - Return all alumno_clases in the DB
    findAllAlumno_Clases = function(req, res) {
    	Alumno_Clase.find(function(err, alumno_clases) {
    		if(!err) {
          console.log('GET /alumno_clases')
    			res.send(alumno_clases);
    		} else {
    			console.log('ERROR: ' + err);
    		}
    	});
    };
  
    //GET - Return a Alumno_Clase with specified ID
    findAlumno_ClaseById = function(req, res) {
    	Alumno_Clase.findById(req.params.id, function(err, alumno_clase) {
    		if(!err) {
          console.log('GET /alumno_clase/' + req.params.id);
    			res.send(alumno_clase);
    		} else {
    			console.log('ERROR: ' + err);
    		}
    	});
    };
  
    //POST - Insert a new Alumno_Clase in the DB
    addAlumno_Clase = function(req, res) {
    	console.log('POST');
    	console.log(req.body);
  
    	var alumno_clase = new Alumno_Clase({
    		id_clase:    	req.body.id_clase,
  		dni_alumno:			req.body.dni_alumno
		  
   	});
  
    	alumno_clase.save(function(err) {
    		if(!err) {
    			console.log('Created');
    		} else {
    			console.log('ERROR: ' + err);
    		}
    	});
  
    	res.send(alumno_clase);
    };
  
    //PUT - Update a register already exists
    updateAlumno_Clase = function(req, res) {
    	Alumno_Clase.findById(req.params.id, function(err, alumno_clase) {
    		alumno_clase.id_clase			   	 = req.body.id_clase;
  		alumno_clase.dni_alumno   		 = req.body.dni_alumno;
	  
  
			
    		alumno_clase.save(function(err) {
    			if(!err) {
    				console.log('Updated');
    			} else {
    				console.log('ERROR: ' + err);
    			}
    			res.send(alumno_clase);
    		});
    	});
    }
  
    //DELETE - Delete a Alumno_Clase with specified ID
    deleteAlumno_Clase = function(req, res) {
    	Alumno_Clase.findById(req.params.id, function(err, alumno_clase) {
    		alumno_clase.remove(function(err) {
    			if(!err) {
					console.log('Removed');
					res.status(200).send({mensaje:'registro eliminado'})
    			} else {
    				console.log('ERROR: ' + err);
    			}
    		})
    	});
	}
	
	function findAlumno_ClasesDeAlumnoByComision(id_comision,id_alumno,res)
	{	clasesAsistidas=[];
		let promesas=[];
		console.log(id_comision)
		Clase_Comision.find({id_comision : id_comision},async function(err,clase_comisions){
			
			for(let clase_comision of clase_comisions){
			console.log(clase_comision)
			//Falta acomodoar los registros alumno_clases para probar bien
			promesas.push(Alumno_Clase.findOne({id_alumno:id_alumno,id_clase:clase_comision.id_clase},async function(err,alumno_clase){
				if (alumno_clase!=null){
					clasesAsistidas.push(alumno_clase);
					console.log('hice el push')
				}

			}))
			}
			for (let promesa of promesas)
			{
				await promesa
				console.log('espero')
			}
			console.log('return',clasesAsistidas)
			res.status(200).send(clasesAsistidas)
		})
	}

	verAsisitencias = function(req, res) {
    	console.log('CONSULTAR ASISTENCIA');
    	console.log(req.body);
		findAlumno_ClasesDeAlumnoByComision(req.body.id_comision,req.body.id_alumno,res)
		// res.status(200).send(findAlumno_ClasesDeAlumnoByComision(req.body.id_comision,req.body.id_alumno));
   	}
  
	var Aula_Comision = require('../models/aula_comision.js');
  
	//GET - Return all aula_comisions in the DB
	findAllAula_Comisions = function(req, res) {
		Aula_Comision.find(function(err, aula_comisions) {
			if(!err) {
		console.log('GET /aula_comisions')
				res.send(aula_comisions);
			} else {
				console.log('ERROR: ' + err);
			}
		});
	};

	//GET - Return a Aula_Comision with specified ID
	findAula_ComisionById = function(req, res) {
		Aula_Comision.findById(req.params.id, function(err, aula_comision) {
			if(!err) {
		console.log('GET /aula_comision/' + req.params.id);
				res.send(aula_comision);
			} else {
				console.log('ERROR: ' + err);
			}
		});
	};

	findAulaDeComision = function(req,res)
	{ 	console.log('buscando aula de comision: ', req.params.id)
		Aula_Comision.find({id_comision:req.params.id}, function(err, comision) {
		  var comisionMap = {};
		  a=[];
		  comision.forEach(function(aula) {
			a.push(aula);
			console.log(' El aula de la comision es: ',aula.id_aula)
		});
		  
		  
		  res.send(a);  
		});
	};

	//POST - Insert a new Aula_Comision in the DB
	addAula_Comision = function(req, res) {
		console.log('POST');
		console.log(req.body);

		var aula_comision = new Aula_Comision({
			id_aula:    	req.body.id_aula,
			id_comision:	req.body.id_comision
		
	});

		aula_comision.save(function(err) {
			if(!err) {
				console.log('Created');
			} else {
				console.log('ERROR: ' + err);
			}
		});

		res.send(aula_comision);
	};

	//PUT - Update a register already exists
	updateAula_Comision = function(req, res) {
		Aula_Comision.findById(req.params.id, function(err, aula_comision) {
			aula_comision.id_aula = req.body.id_aula;
		aula_comision.id_comision = req.body.id_comision;
	

			
			aula_comision.save(function(err) {
				if(!err) {
					console.log('Updated');
				} else {
					console.log('ERROR: ' + err);
				}
				res.send(aula_comision);
			});
		});
	}

	//DELETE - Delete a Aula_Comision with specified ID
	deleteAula_Comision = function(req, res) {
		Aula_Comision.findById(req.params.id, function(err, aula_comision) {
			aula_comision.remove(function(err) {
				if(!err) {
					console.log('Removed');
					res.status(200).send({mensaje:'registro eliminado'})
				} else {
					console.log('ERROR: ' + err);
				}
			})
		});
	}

		var Aula = require('../models/aula.js');
	
	//GET - Return all aulas in the DB
	findAllAulas = function(req, res) {
		Aula.find(function(err, aulas) {
			if(!err) {
		console.log('GET /aulas')
				res.send(aulas);
			} else {
				console.log('ERROR: ' + err);
			}
		});
	};

	//GET - Return a Aula with specified ID
	findAulaById = function(req, res) {
		Aula.findById(req.params.id, function(err, aula) {
			if(!err) {
		console.log('GET /aula/' + req.params.id);
				res.send(aula);
			} else {
				console.log('ERROR: ' + err);
			}
		});
	};

	//POST - Insert a new Aula in the DB
	addAula = function(req, res) {
		console.log('POST');
		console.log(req.body);

		var aula = new Aula({
			id:req.body.id,
			nombre:	req.body.nombre
		
	});

		aula.save(function(err) {
			if(!err) {
				console.log('Created');
			} else {
				console.log('ERROR: ' + err);
			}
		});

		res.send(aula);
	};

	//PUT - Update a register already exists
	updateAula = function(req, res) {
		Aula.findById(req.params.id, function(err, aula) {
			aula.id = req.body.id;
		aula.nombre = req.body.nombre;
	

			
			aula.save(function(err) {
				if(!err) {
					console.log('Updated');
				} else {
					console.log('ERROR: ' + err);
				}
				res.send(aula);
			});
		});
	}

	//DELETE - Delete a Aula with specified ID
	deleteAula = function(req, res) {
		Aula.findById(req.params.id, function(err, aula) {
			aula.remove(function(err) {
				if(!err) {
					console.log('Removed');
					res.status(200).send({mensaje:'registro eliminado'})
				} else {
					console.log('ERROR: ' + err);
				}
			})
		});
	}

	//Link routes and functions
	app.get('/aulas', findAllAulas);
	app.get('/aula/:id', findAulaById);
	app.post('/aula', addAula);
	app.put('/aula/:id', updateAula);
	app.delete('/aula/:id', deleteAula);

	//Link routes and functions
	app.get('/aula_comisions', findAllAula_Comisions);
	app.get('/aula_comision/:id', findAula_ComisionById);
	app.get('/aula_de_comision/:id', findAulaDeComision);
	app.post('/aula_comision', addAula_Comision);
	app.put('/aula_comision/:id', updateAula_Comision);
	app.delete('/aula_comision/:id', deleteAula_Comision);

	
    //Link routes and functions
    app.get('/alumno_clases', findAllAlumno_Clases);
    app.get('/alumno_clase/:id', findAlumno_ClaseById);
	app.post('/alumno_clase', addAlumno_Clase);
	app.post('/consultar_asistencia', verAsisitencias);
    app.put('/alumno_clase/:id', updateAlumno_Clase);
	app.delete('/alumno_clase/:id', deleteAlumno_Clase);
	verAsisitencias
  
    //Link routes and functions
    app.get('/clase_comisions', findAllClase_Comisions);
	app.get('/clase_comision/:id', findClase_ComisionById);
	app.get('/clases_de_comision/:id',findClasesDeComision);//id comision
    app.post('/clase_comision', addClase_Comision);
    app.put('/clase_comision/:id', updateClase_Comision);
	app.delete('/clase_comision/:id', deleteClase_Comision);
	
  
    //Link routes and functions
	app.get('/profesor_comisions', findAllProfesor_Comisions);
	app.get('/comisiones_de_profesor/:id',findComisionesDeProfesor);//id del profesor
	app.get('/profesor_de_comision/:id',findProfesorDeComisiones);//id comision
	app.get('/profesor_comision/:id', findProfesor_ComisionById);
    app.post('/profesor_comision', addProfesor_Comision);
    app.put('/profesor_comision/:id', updateProfesor_Comision);
    app.delete('/profesor_comision/:id', deleteProfesor_Comision);
  
    //Link routes and functions
	app.get('/materia_comisions', findAllMateria_Comisions);
	app.get('/listaDeComisiones/:id',findComisionesDeMateria);//id de la materia
	app.get('/materia_de_comision/:id',findMateriaDeComision);//id de la comision
	app.get('/materia_comision/:id', findMateria_ComisionById);
    app.post('/materia_comision', addMateria_Comision);
    app.put('/materia_comision/:id', updateMateria_Comision);
    app.delete('/materia_comision/:id', deleteMateria_Comision);
  
	
    //Link routes and functions
	app.get('/alumno_comisions', findAllAlumno_Comisions);
	app.get('/comisiones_de_alumno/:id',findComisionesDeAlumno);//id del alumno
    app.get('/alumno_comision/:id', findAlumno_ComisionById);
    app.post('/alumno_comision', addAlumno_Comision);
    app.put('/alumno_comision/:id', updateAlumno_Comision);
	app.delete('/alumno_comision/:id', deleteAlumno_Comision);
	
  
    //Link routes and functions
    app.get('/profesores', findAllProfesores);
    app.get('/profesor/:id', findProfesorById);
	app.post('/profesor', addProfesor);
	app.post('/singInProfesor', singInProfesor);
    app.put('/profesor/:id', updateProfesor);
    app.delete('/profesor/:id', deleteProfesor);
  
    //Link routes and functions
    app.get('/clases', findAllClases);
    app.get('/clase/:id', findClaseById);
	// app.post('/clase', addClase);
	app.post('/crear_clases', crearClases);
    app.put('/clase/:id', updateClase);
	app.delete('/clase/:id', deleteClase);
	app.post('/marcar_asistencia',marcarAsistencia)


  
    //Link routes and functions
    app.get('/comisiones', findAllComisiones);
    app.get('/comision/:id', findComisionById);
    app.post('/comision', addComision);
    app.put('/comision/:id', updateComision);
    app.delete('/comision/:id', deleteComision);
  
    //Link routes and functions
    app.get('/materias', findAllMaterias);
    app.get('/materia/:id', findMateriaById);
    app.post('/materia', addMateria);
    app.put('/materia/:id', updateMateria);
    app.delete('/materia/:id', deleteMateria);
  
	//Link routes and functions
	app.get('/alumnos', findAllAlumnos);
	app.get('/alumno/:id', findAlumnoById);
	app.post('/alumno', addAlumno);
	app.post('/singIn', singInAlumno);
	app.put('/alumno/:id', updateAlumno);
	app.delete('/alumno/:id', deleteAlumno);
  
  }