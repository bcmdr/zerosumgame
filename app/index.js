const config = require('../config.json');
firebase.initializeApp(config);

class User {
	constructor(firebase_db, usernameStr) {
		this.db = firebase_db
		this.username = usernameStr
		this.url = 'users/' + this.username
	}
	saveTo(locationStr, id, dataObj) {
		this.db.ref(this.url + '/' + locationStr + '/' + id).set(dataObj)
	}
	getFrom(locationStr, id) {
		return this.db.ref(this.url + '/' + locationStr + '/' + id).once('value')
	}

}

let bcmdr = new User(firebase.database(), "bcmdr")

// Save test starts
bcmdr.saveTo("starts", 1, {
	now: Date.now()
})
bcmdr.saveTo("starts", 2, {
	now: Date.now()
})
bcmdr.saveTo("starts", 3, {
	now: Date.now()
})

bcmdr.getFrom("starts", 1).then((snapshot)=>{
	let now = snapshot.val()
	console.log(Date.parse(now));
})
