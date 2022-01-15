import * as React from "react";
import { Type } from "typescript";
import api from "../item/api";
import Button from "../ui/controls/Button";
import Modal, { ModalFooter } from "../ui/controls/Modal";
import TextField from "../ui/inputs/TextField";

import { Item } from "../item/types";

import styles from "./App.module.scss";

interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

enum Status {
  Init = 'ini',
  Success = 'success',
}

const App: React.FC = () => {
  const [items, setItems] = React.useState<Item[]>([]);
  const [status, setStatus] = React.useState<Status>(Status.Init);
  const [isModalVisible, toggleModal] = React.useState<boolean>(false);


  function remove(id: Item['id']) {
    api.remove(id).then(
      () => setItems(items => items.filter(item => item.id !== id)))

  }


  function add(event: React.FormEvent<Form>) {
    event.preventDefault();

    const text = event.currentTarget.text.value.trim();

    if (!text) return;

    api.create(text).then(item => {
      setItems(items => items.concat(item));
      toggleModal(false);
    })

  }

  React.useEffect(
    () => {
      api.list().then((items) => {
        setItems(items)
        setStatus(Status.Success)
      })
    }, []
  )


  if (status === Status.Init) {
    return <span>Loading ...</span>
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>
          Supermarket List
        </h1>
        <h3>{items.length}item(s)</h3>
      </header>
      <br />
      {items.map(item =>
        <div className={styles.cont} key={item.id}>
          <p className={styles.text}> {item.text} </p>
          <button className={styles.btn} onClick={() => remove(item.id)}>delete</button>
        </div>

      )}
      <Button className={styles.add} onClick={() => toggleModal(true)}>Add Item</Button>
      {isModalVisible && (
        <Modal onClose={() => toggleModal(false)}>
          <form onSubmit={add}>
            <h2>Add Item</h2>
            <TextField name="text"></TextField>
            <ModalFooter>
              <Button type="button">Cancel</Button>
              <Button type="submit" colorScheme="primary">Add</Button>
            </ModalFooter>
          </form>
        </Modal>
      )}
    </main>
  );
};

export default App;

