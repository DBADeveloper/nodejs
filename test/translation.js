//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Translation = require('../app/models/translation');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

//Our parent block
describe('Translations', () => {
	beforeEach((done) => { //Before each test we empty the database
		Translation.remove({}, (err) => { 
		   done();		   
		});		
	});
 /*
  * Test the /GET route
  */
  describe('/GET translation', () => {
	  it('it should GET all the translations', (done) => {
			chai.request(server)
		    .get('/translation')
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('array');
			  	res.body.length.should.be.eql(0);
		      done();
		    });
	  });
  });
 /*
  * Test the /POST route
  */
  describe('/POST translation', () => {
	  it('it should not POST a translation without langDirect field', (done) => {
	  	let translation = {
	  		//langDirect: "ua-en",
	  		wordFrom: "слово",
			wordTo: "word"
	  	}
			chai.request(server)
		    .post('/translation')
		    .send(translation)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('errors');
			  	res.body.errors.should.have.property('langDirect');
			  	res.body.errors.langDirect.should.have.property('kind').eql('required');
		      done();
		    });
	  });
	  it('it should POST a translation ', (done) => {
	  	let translation = {
	  		langDirect: "ua-en",
	  		wordFrom: "слово",
			wordTo: "word"
	  	}
			chai.request(server)
		    .post('/translation')
		    .send(translation)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('message').eql('Translation successfully added!');
			  	res.body.translation.should.have.property('langDirect');
			  	res.body.translation.should.have.property('wordFrom');
			  	res.body.translation.should.have.property('wordTo');
		      done();
		    });
	  });
  });
 /*
  * Test the /GET/:id route
  */
  describe('/GET/:id translation', () => {
	  it('it should GET a translation by the given id', (done) => {
	  	let translation = new Translation({ langDirect: "ua-en", wordFrom: "слово", wordTo: "word" });
	  	translation.save((err, translation) => {
	  		chai.request(server)
		    .get('/translation/' + translation.id)
		    .send(translation)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('langDirect');
			  	res.body.should.have.property('wordFrom');
			  	res.body.should.have.property('wordTo');
			  	res.body.should.have.property('_id').eql(translation.id);
		      done();
		    });
	  	});
			
	  });
  });
 /*
  * Test the /PUT/:id route
  */
  describe('/PUT/:id translation', () => {
	  it('it should UPDATE a translation given the id', (done) => {
	  	let translation = new Translation({langDirect: "ua-en", wordFrom: "слово", wordTo: "word" })
	  	translation.save((err, translation) => {
				chai.request(server)
			    .put('/translation/' + translation.id)
			    .send({langDirect: "ua-en", wordFrom: "слово", wordTo: "word" })
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('Translation updated!');
			      done();
			    });
		  });
	  });
  });
 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id translation', () => {
	  it('it should DELETE a translation given the id', (done) => {
	  	let translation = new Translation({langDirect: "ua-en", wordFrom: "слово", wordTo: "word" })
	  	translation.save((err, translation) => {
				chai.request(server)
			    .delete('/translation/' + translation.id)
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('Translation successfully deleted!');
				  	res.body.result.should.have.property('ok').eql(1);
				  	res.body.result.should.have.property('n').eql(1);
			      done();
			    });
		  });
	  });
  });
});

