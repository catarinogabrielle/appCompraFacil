import React, { useState, useEffect, useRef } from 'react';
import { FlatList, Keyboard, Alert, LogBox, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from '../../services/firebaseConnection';

import {
    Container, Header, InfoHeader, NumberItemList, ContentNoItem, TextNoItem, BoxItemList, ContenInfoList, ContentCheck, BoxEditName, NameItemList, BoxClose,
    ContentNewItem, InputNewItem, AddNewItem, ContainerLoading,
} from './styles';

import Colors from '../../../constants/Colors';
const ColorTheme = Colors['Theme'];

const List = () => {
    const [nameItem, setNameItem] = useState('');
    const [key, setKey] = useState('');
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(true);
    const [check, setCheck] = useState('');
    
    const [itens, setItens] = useState([]);

    const inputRef = useRef(null);

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

                setLoading(false);
            })
        }

        dados();
    }, []);

    useEffect(() => {
        const filter = itens.map(item => item.status).filter(a => a === true).length
        setCheck(filter);
    }, [handleStatus])

    async function handleCreate() {
        if (nameItem == '') {
            return;
        }

        if (key !== '') {
            firebase.database().ref('itens').child(key).update({
                nomeItem: nameItem
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
        if (data.status == true) {
            firebase.database().ref('itens').child(data.key).update({
                status: false
            })
                .then(() => {
                    console.log('status atualizado')
                })
        } else {
            firebase.database().ref('itens').child(data.key).update({
                status: true
            })
                .then(() => {
                    console.log('status atualizado')
                })
        }
    }

    function handleEdit(data) {
        setKey(data.key)
        setNameItem(data.nomeItem)
        inputRef.current.focus();
    }

    function Listagem({ data, deleteItem, editItem, statusItem }) {
        return (
            <BoxItemList>
                <ContenInfoList>
                    {data.status == true ? (
                        <ContentCheck onPress={() => statusItem(data)}>
                            <MaterialCommunityIcons name="check-box-outline" color={ColorTheme.Green} size={18} />
                        </ContentCheck>
                    ) : (
                        <ContentCheck onPress={() => statusItem(data)}>
                            <MaterialCommunityIcons name="checkbox-blank" color={ColorTheme.Gray} size={18} />
                        </ContentCheck>
                    )}
                    <BoxEditName onPress={() => editItem(data)} >
                        <NameItemList>{data.nomeItem}</NameItemList>
                    </BoxEditName>
                </ContenInfoList>

                <BoxClose onPress={() => deleteItem(data.key)}>
                    <MaterialCommunityIcons name="close" color={ColorTheme.White} size={9} />
                </BoxClose>
            </BoxItemList >
        )
    }

    return (
        <Container>
            <Header>
                <InfoHeader>Lista de compras</InfoHeader>
                {itens.length !== 0 ? (<NumberItemList>{check} / {itens.length}</NumberItemList>) : (null)}
            </Header>
            {loading ? (
                <ContainerLoading>
                    <ActivityIndicator size={50} color={ColorTheme.Blue} />
                </ContainerLoading>
            )
                : (
                    <>
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
                        )
                        }
                    </>
                )
            }

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