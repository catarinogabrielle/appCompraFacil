import React, { useState, useEffect, useRef } from 'react';
import { FlatList, Keyboard, Alert, LogBox } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from '../../services/firebaseConnection';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import {
    Container, Header, InfoHeader, NumberItemList, ContentNoItem, TextNoItem, BoxItemList, ContenInfoList, NameItemList, BoxClose,
    ContentNewItem, InputNewItem, AddNewItem,
} from './styles';

import Colors from '../../../constants/Colors';
const ColorTheme = Colors['Theme'];

const List = () => {
    const [nameItem, setNameItem] = useState('');
    const [key, setKey] = useState('');
    const [status, setStatus] = useState(false);
    const [checkboxState, setCheckboxState] = useState(false);

    const inputRef = useRef(null);
    const [itens, setItens] = useState([]);

    LogBox.ignoreLogs(['Setting a timer']);

    useEffect(() => {
        async function dados() {
            await firebase.database().ref('itens').on('value', (snapshot) => {
                setItens([]);

                snapshot.forEach((chilItem) => {
                    let data = {
                        key: chilItem.key,
                        nomeItem: chilItem.val().nomeItem,
                        status: chilItem.val().status,
                    };

                    setItens(oldArray => [...oldArray, data].reverse());
                })
            })
        }

        dados();
    }, []);

    async function handleCreate() {
        if (nameItem == '') {
            return;
        }

        if (key !== '') {
            firebase.database().ref('itens').child(key).update({
                nameItem: nameItem
            })
                .then(() => {
                    console.log('tarefa atualizada')
                })

            Keyboard.dismiss();
            setNameItem('');
            setKey('');
            return;
        }

        let itens = await firebase.database().ref('itens');
        let chave = itens.push().key;

        itens.child(chave).set({
            nomeItem: nameItem,
            status: status
        });

        Keyboard.dismiss();
        setNameItem('');
    }

    function handleDelete(key) {
        Alert.alert(
            "Confirmação!!",
            "Deseja deletar este item?",
            [
                {
                    text: "Sim",
                    onPress: () => {

                        firebase.database().ref('itens').child(key).remove()
                            .then(() => {
                                const findItens = itens.filter(item => item.key != key)
                                setItens(findItens)
                            })
                    }
                },
                {
                    text: "Não",
                    onPress: () => { return; }
                }
            ]
        );
    }

    function handleStatus(data) {
        console.log(data)
    }

    function handleEdit(data) {
        setKey(data.key)
        setNameItem(data.nomeItem)
        inputRef.current.focus();
    }

    function Listagem({ data, deleteItem, editItem }) {
        return (
            <BoxItemList>
                <ContenInfoList onPress={() => editItem(data)}>
                    <BouncyCheckbox
                        size={20}
                        fillColor={ColorTheme.Green}
                        unfillColor={ColorTheme.White}
                        iconStyle={{ borderColor: ColorTheme.Gray }}
                        onPress={() => setCheckboxState(!checkboxState)}
                        isChecked={checkboxState}
                    />
                    <NameItemList>{data.nomeItem}</NameItemList>
                </ContenInfoList>

                <BoxClose onPress={() => deleteItem(data.key)}>
                    <MaterialCommunityIcons name="close" color={ColorTheme.White} size={9} />
                </BoxClose>
            </BoxItemList>
        )
    }

    return (
        <Container>
            <Header>
                <InfoHeader>Lista de compras</InfoHeader>
                {itens.length !== 0 ? (<NumberItemList>{itens.length}</NumberItemList>) : (null)}
            </Header>

            {itens.length !== 0 ? (
                <>
                    <FlatList
                        keyExtractor={item => item.key}
                        data={itens}
                        renderItem={({ item }) => (
                            <Listagem data={item} statusItem={handleStatus} deleteItem={handleDelete} editItem={handleEdit} />
                        )}
                    />
                </>
            ) : (
                <ContentNoItem>
                    <TextNoItem>Nenhum item na lista</TextNoItem>
                </ContentNoItem>
            )}

            <ContentNewItem>
                <InputNewItem
                    onChangeText={(text) => setNameItem(text)}
                    placeholder="Novo item da lista"
                    value={nameItem}
                    ref={inputRef}
                />

                <AddNewItem onPress={handleCreate}>
                    <MaterialCommunityIcons name="plus" color={ColorTheme.Blue} size={20} />
                </AddNewItem>
            </ContentNewItem>
        </Container>
    );
}

export default List;