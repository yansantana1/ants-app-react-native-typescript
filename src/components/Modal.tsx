import React from 'react';
import { Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {Ant} from "../entities/ant";

export default class ModalComponent extends React.Component<{
    modalShow: boolean,
    ant: Ant,
    onHide: any
}> {
    render() {
        let {
            modalShow,
            ant,
            onHide
        } = this.props;
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalShow}
                onRequestClose={onHide}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{ant.name}</Text>
                        <Text style={styles.modalText1}>LENGTH: {ant.length}</Text>
                        <Text style={styles.modalText1}>WEIGHT: {ant.weight}</Text>
                        <Text style={styles.modalText1}>COLOR: {ant.color}</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={onHide}>
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalText1: {
        marginBottom: 15,
        textAlign: 'center',
    },
});