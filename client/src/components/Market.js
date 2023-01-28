import React, { useState, useEffect } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import Feedback from "./Feedback";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Backdrop from "@mui/material/Backdrop";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../utils/API";
import { styled } from "@mui/material/styles";

const item_shem = {
  name: "",
  description: "",
  price: 0,
  image: "",
};

const Input = styled("input")({
  display: "none",
});

export default function Market() {
  let navigate = useNavigate();
  const [myId, set_myId] = useState({});
  const [money, set_money] = useState(0);
  const [new_item, set_new_item] = useState(item_shem);
  const [items, set_items] = useState([]);
  const [show_change, set_show_change] = useState(false);
  const [item_change, set_item_change] = useState(item_shem);
  const [shop, set_shop] = useState({});
  const [open, setOpen] = useState(false);
  const [not_money, set_not_money] = useState(false);

  useEffect(() => {
    axios
      .get(`${API.url()}/users/find/${API.getUserId()}`)
      .then((res) => {
        set_myId(res.data);
      })
      .catch((e) => console.log(e));
    API.getItemAll().then((res) => {
      set_items(res);
    });
  }, []);

  const handleSendMoney = () => {
    let current_money = parseInt(myId.money);
    current_money += parseInt(money);
    if (current_money < 0) current_money = 0;
    API.setMoney(current_money);
    set_myId({
      ...myId,
      money: current_money,
    });

    set_money(0);
  };

  const handlePurchase = (item) => {
    set_shop(item);
    console.log(item);
    setOpen(true);
  };

  const handleTake = () => {
    let current_money = myId.money;

    if (current_money >= shop.price) {
      current_money -= shop.price;
      const newItems = items.map((i) => {
        if (i._id === shop._id) {
          return {
            ...i,
            sell: !i.sell,
            id_owner: myId._id,
          };
        }
        return i;
      });
      set_items(newItems);
      set_myId({
        ...myId,
        money: current_money,
      });
      API.setMoney(current_money);
      API.buyItem(shop);
    } else {
      set_not_money(true);
      window.setTimeout(() => set_not_money(false), 5000);
    }
    setOpen(false);
    set_money(0);
    set_shop({});
  };

  const List_items_others = () => {
    return (
      <Box sx={{ width: 1 / 2, textAlign: "center" }}>
        <h2>A VENDRE</h2>
        <List key={"liItem"} sx={{ textAlign: "center" }}>
          {items
            .filter((item) => item.id_owner !== myId._id)
            .map((item, n) => {
              let description = item.description;
              let name = item.name + " | " + item.price + " €";
              return (
                <div key={name + "55"}>
                  <ListItemButton
                    key={name}
                    onClick={() => handlePurchase(item)}
                  >
                    <Avatar src={item.image} />
                    <ListItemText
                      sx={{ textAlign: "center" }}
                      primary={name}
                      secondary={description}
                    />
                  </ListItemButton>
                  <Divider />
                </div>
              );
            })}
        </List>
      </Box>
    );
  };

  const HandleChange = (item) => {
    console.log(item);
    set_item_change(item);
    set_show_change(true);
  };

  const SendChange = () => {
    API.changeItem(item_change._id, item_change);
    let itemsChange = items.map((item) => {
      if (item._id === item_change._id) item = item_change;
      return item;
    });
    set_items(itemsChange);
    set_item_change(item_shem);
    set_show_change(false);
  };

  const HandleSell = (item) => {
    const newItems = items.map((i) => {
      if (i._id === item._id) {
        return {
          ...i,
          sell: !i.sell,
        };
      }
      return i;
    });
    set_items(newItems);
    API.setSellItem(item._id, !item.sell);
  };

  const HandleDelete = (item) => {
    API.deleteItem(item._id);
    let newItem = items.filter((i) => i._id !== item._id);
    set_items(newItem);
  };

  const Item_Change = () => {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={show_change}
      >
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <h2> Changement de l'objet {item_change.name}</h2>
          <div>
            <TextField
              multiline
              variant="filled"
              defaultValue={item_change.name}
              id="outlined-required"
              label="nom"
              onChange={(e) =>
                set_item_change({
                  ...item_change,
                  name: e.target.value,
                })
              }
            ></TextField>
            <TextField
              multiline
              variant="filled"
              label="description"
              onChange={(e) =>
                set_item_change({
                  ...item_change,
                  description: e.target.value,
                })
              }
              defaultValue={item_change.description}
            ></TextField>
            <TextField
              multiline
              variant="filled"
              sx={{ width: "12ch" }}
              label="prix"
              id="standard-number"
              type="number"
              onChange={(e) =>
                set_item_change({
                  ...item_change,
                  price: e.target.value,
                })
              }
              defaultValue={item_change.price}
            ></TextField>
          </div>
          <Box>
            <Button onClick={() => SendChange()}>ENVOI</Button>
            <Button color="secondary" onClick={() => set_show_change(false)}>
              Annuler
            </Button>
          </Box>
        </Box>
      </Backdrop>
    );
  };

  const List_items_self = () => {
    return (
      <Box sx={{ width: 1, paddingLeft: 1 / 2, textAlign: "center" }}>
        <h2>MES OBJETS</h2>
        <List key={9999}>
          {items
            .filter((item) => item.id_owner === myId._id)
            .map((item, n) => {
              let price = item.price + " €";
              return (
                <div key={item.name + "55"}>
                  <ListItem key={item.name}>
                    <ListItemText
                      sx={{ textAlign: "center" }}
                      key={item.name + " ok"}
                      primary={item.name}
                      secondary={price}
                    />
                    <Avatar src={item.image} />
                  </ListItem>
                  <ListItem key={n}>
                    <Button
                      key={item.name + "55"}
                      onClick={() => HandleChange(item)}
                    >
                      Modifier
                    </Button>
                    <Button
                      key={item.name + "85"}
                      color="secondary"
                      onClick={() => HandleDelete(item)}
                    >
                      Supprimer
                    </Button>
                    <Button
                      key={item.name + "7"}
                      color="info"
                      onClick={() => HandleSell(item)}
                    >
                      {item.sell ? "Retirer de la vente" : "Mettre en vente"}
                    </Button>
                  </ListItem>
                  <Divider />
                </div>
              );
            })}
        </List>
      </Box>
    );
  };

  const Information = () => {
    return (
      <Box sx={{ textAlign: "center" }}>
        <h1>Bienvenue {myId.pseudo}</h1>
        <h2>Argent disponible : {myId.money} €</h2>
      </Box>
    );
  };

  const HandleAddItem = () => {
    console.log(new_item);
    API.createItem(new_item)
      .then((_) => {
        set_items((oldItem) => [...oldItem, new_item]);
        set_new_item(item_shem);
      })
      .catch((_) => console.log("erreur creation d'item"));
  };
  const Logout = () => {
    return (
      <Box>
        <Button
          color="secondary"
          onClick={() => {
            API.logout();
            navigate("/login");
          }}
        >
          DECONNEXION
        </Button>
      </Box>
    );
  };

  const AddMoney = () => {
    return (
      <Box sx={{ textAlign: "center" }}>
        <Box>
          <h2>Ajout d'argent</h2>
          <TextField
            type="number"
            onChange={(e) => set_money(e.target.value)}
            value={money}
            label="Ajout d'argent"
          ></TextField>
        </Box>
        <Box>
          <Button onClick={() => handleSendMoney()}>ENVOI</Button>
        </Box>
      </Box>
    );
  };

  const AddItem = () => {
    return (
      <Box sx={{ textAlign: "center" }}>
        <h2> Ajout d'un nouvel item</h2>
        <div>
          <TextField
            type="text"
            onChange={(e) =>
              set_new_item({
                ...new_item,
                name: e.target.value,
              })
            }
            value={new_item.name}
            label="nom"
            multiline
          ></TextField>
          <TextField
            type="text"
            onChange={(e) =>
              set_new_item({
                ...new_item,
                description: e.target.value,
              })
            }
            value={new_item.description}
            label="description"
            multiline
          ></TextField>
          <TextField
            sx={{ width: "15ch" }}
            id="standard-number"
            type="number"
            onChange={(e) =>
              set_new_item({
                ...new_item,
                price: e.target.value,
              })
            }
            value={new_item.price}
            InputLabelProps={{
              shrink: true,
            }}
            label="prix"
          ></TextField>
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={(e) =>
                set_new_item({
                  ...new_item,
                  image: e.target.files[0].name,
                })
              }
            />
            <Button variant="contained" component="span">
              Ajout photo
            </Button>
          </label>
        </div>
        <Box>
          <Button onClick={() => HandleAddItem()}>ENVOI</Button>
        </Box>
      </Box>
    );
  };
  return (
    <div>
      {Information()}
      <Grid container>
        <>
          <Backdrop sx={{ color: "#fff" }} open={open}>
            <Box>
              <h1>
                Acheter un/une {shop.name} pour {shop.price} € ?
              </h1>
            </Box>
            <Box>
              <Button size="large" onClick={() => handleTake()}>
                OUI
              </Button>
              <Button
                size="large"
                color="secondary"
                onClick={() => setOpen(false)}
              >
                NON
              </Button>
            </Box>
          </Backdrop>
          {List_items_others()}
          {Feedback({
            ok: false,
            text: "Argent insuffisant !",
            open: not_money,
          })}
        </>
        <div>
          {Item_Change()}
          {List_items_self()}
        </div>
      </Grid>
      {AddItem()}
      {AddMoney()} {Logout()}
    </div>
  );
}
