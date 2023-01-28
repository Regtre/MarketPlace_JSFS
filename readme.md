## Information
Poissonnier Remy 

Paul Duquesnoy
## Commande

Voici la liste des commandes qui devront etre lancé dans 3 terminales differents.

Les commandes devront etre lancé dans cette ordre : `make mongo` -> `make server` -> `make client`

```bash
# lancement du serveru mongodb
make mongo

# lancement server on localhost:8000
make server

# lancement client on localhost:3000
make client
```
## Note

Une fois le client lancé, on arrivera sur la page `localhost:3000/login` qui va permettre l'authentification, s'il n'y a pas de compte, il faudra le créer.

Une fois créé, il faudra :
- soit se connecter, en y remettant les identifiants
- soit la page va vous ramener vers la page principale

Il faut savoir que si la page ne vous renvoie pas a la page principale, il faudra re-essayer ou alors taper directement dans la barre url -> `localhost:3000/`

Pour l'ajout d'objets, il faudra que celle-ci soit dans le dossier `client/public` sinon il ne le trouvera pas, vous pouvez essayer avec les images `logo192.png` / `logo512.png` presents de base dans ce dossier.

En esperant que le projet vous paira.
