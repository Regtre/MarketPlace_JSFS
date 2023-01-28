git : 
	git add .
	git commit -m "update"
	git push

mongo :
	cd server ; mkdir dbData ; mongod --dbpath dbData

server : 
	cd server ; nodemon

client :
	cd client ; npm start

initItems : 
	mongoimport --db itemsBase --collection items --file ./server/misc/item.json

.PHONY : git mongo server client 